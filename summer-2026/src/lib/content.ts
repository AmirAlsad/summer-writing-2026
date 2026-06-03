import fm from "front-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";
import { resolveImage } from "./images";

function computeReadingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 225));
}

// The auto estimate only counts the Markdown body, so it badly underestimates
// PDF-heavy pieces (the essay/slides text lives in the embed, not the body). An
// optional `reading_time` front-matter field (minutes) overrides it; anything
// missing, empty, or non-positive falls back to the computed estimate.
function resolveReadingMinutes(
  override: number | string | undefined,
  body: string,
): number {
  const minutes = Number(override);
  if (Number.isFinite(minutes) && minutes > 0) return Math.round(minutes);
  return computeReadingMinutes(body);
}

// A rendered post body is an ordered list of blocks: prose (HTML) interleaved
// with inline embeds like PDFs. This lets a piece read "text -> essay PDF ->
// more text -> slides PDF" rather than dumping all embeds at the end.
export type PostBlock =
  | { type: "html"; html: string }
  | { type: "pdf"; name: string };

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  pinned: boolean;
  image?: string;
  imageCaption?: string;
  content: string;
  html: string;
  blocks: PostBlock[];
  readingTimeMinutes: number;
  dayNumber?: number;
}

// Rewrite inline image URLs (`![alt](foo.jpg)`) through the image registry so a
// bare filename resolves to the real, build-hashed asset URL — the same lookup
// the hero image uses. Without this, body images point at a path Vite never
// serves. External URLs (http..., data:) have no registry entry and pass through.
function remarkResolveImages() {
  return (tree: unknown) => {
    const walk = (node: { type?: string; url?: string; children?: unknown[] }) => {
      if (node.type === "image" && typeof node.url === "string") {
        const resolved = resolveImage(node.url);
        if (resolved) node.url = resolved;
      }
      if (Array.isArray(node.children)) {
        for (const child of node.children) walk(child as typeof node);
      }
    };
    walk(tree as { children?: unknown[] });
  };
}

function renderMarkdown(md: string): string {
  return remark()
    .use(remarkGfm)
    .use(remarkResolveImages)
    .use(remarkHtml, { sanitize: false })
    .processSync(md)
    .toString();
}

// A line like `:::pdf revolutionary-memory-essay` (on its own line) becomes a
// PDF embed at that exact point in the piece. Everything else is prose.
const PDF_MARKER = /^:::pdf\s+(.+?)\s*$/;

function parseBlocks(body: string): PostBlock[] {
  const blocks: PostBlock[] = [];
  let buffer: string[] = [];

  const flush = () => {
    const md = buffer.join("\n").trim();
    if (md) blocks.push({ type: "html", html: renderMarkdown(md) });
    buffer = [];
  };

  for (const line of body.split("\n")) {
    const match = line.match(PDF_MARKER);
    if (match) {
      flush();
      blocks.push({ type: "pdf", name: match[1].trim() });
    } else {
      buffer.push(line);
    }
  }
  flush();

  return blocks;
}

// Load both sources eagerly. Writing folder takes priority when it has real files.
const writingFiles = import.meta.glob('../../../content/writing/*.md', {
  query: '?raw', import: 'default', eager: true
}) as Record<string, string>;

const exampleFiles = import.meta.glob('../../../content/examples/*.md', {
  query: '?raw', import: 'default', eager: true
}) as Record<string, string>;

function isRealPost(path: string): boolean {
  const filename = path.split('/').pop() || '';
  return !filename.startsWith('_') && filename.endsWith('.md');
}

// Use writing/ if it has at least one real (non-template) file, else fall back to examples/
const activeFiles: Record<string, string> = (() => {
  const realWriting = Object.keys(writingFiles).filter(isRealPost);
  return realWriting.length > 0 ? writingFiles : exampleFiles;
})();

function parsePost(path: string, rawContent: string): Post | null {
  if (!isRealPost(path)) return null;

  const parsed = fm<{
    title?: string;
    description?: string;
    date?: string | Date;
    pinned?: boolean;
    image?: string;
    image_caption?: string;
    reading_time?: number | string;
  }>(rawContent);
  const data = parsed.attributes;
  const content = parsed.body;

  const filename = path.split('/').pop() || '';
  const slugMatch = filename.match(/^\d{4}-\d{2}-\d{2}-(.*)\.md$/);
  const slug = slugMatch ? slugMatch[1] : filename.replace('.md', '');

  const blocks = parseBlocks(content);
  const html = blocks
    .filter((b): b is Extract<PostBlock, { type: "html" }> => b.type === "html")
    .map((b) => b.html)
    .join("\n");

  let dateStr = '';
  if (data.date instanceof Date) {
    dateStr = data.date.toISOString().split('T')[0];
  } else {
    dateStr = String(data.date ?? '');
  }

  return {
    slug,
    title: data.title || '',
    description: data.description || '',
    date: dateStr,
    pinned: data.pinned === true,
    image: data.image,
    imageCaption: data.image_caption,
    content,
    html,
    blocks,
    readingTimeMinutes: resolveReadingMinutes(data.reading_time, content),
  };
}

export function getPublishedPosts(): Post[] {
  const posts: Post[] = [];

  for (const path in activeFiles) {
    const post = parsePost(path, activeFiles[path]);
    if (post) posts.push(post);
  }

  // Filter by date <= today
  const now = new Date();
  const todayStr = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
  ].join('-');

  const published = posts.filter(p => p.date <= todayStr);

  // Assign day numbers to unpinned posts in chronological order
  const unpinned = published.filter(p => !p.pinned).sort((a, b) => a.date.localeCompare(b.date));
  unpinned.forEach((p, i) => { p.dayNumber = i + 1; });

  // Default sort: pinned first, then newest first
  published.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return b.date.localeCompare(a.date);
  });

  return published;
}

export function getPostBySlug(slug: string) {
  return getPublishedPosts().find(p => p.slug === slug);
}

export function getAdjacentPosts(slug: string) {
  // Adjacency is over all posts (including pinned) in chronological order
  const posts = getPublishedPosts().slice().sort((a, b) => a.date.localeCompare(b.date));
  const index = posts.findIndex(p => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? posts[index - 1] : null,
    next: index < posts.length - 1 ? posts[index + 1] : null,
  };
}
