import fm from "front-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";

function computeReadingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 225));
}

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  topic: string;
  pinned: boolean;
  content: string;
  html: string;
  readingTimeMinutes: number;
  dayNumber?: number;
}

const rawFiles = import.meta.glob('../../../../content/summer-2026/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

export function getPublishedPosts(): Post[] {
  const posts: Post[] = [];

  for (const path in rawFiles) {
    const rawContent = rawFiles[path];
    const parsed = fm<{
      title?: string;
      description?: string;
      date?: string | Date;
      topic?: string;
      pinned?: boolean;
    }>(rawContent);
    const data = parsed.attributes;
    const content = parsed.body;
    const filename = path.split('/').pop() || '';
    const slugMatch = filename.match(/^\d{4}-\d{2}-\d{2}-(.*)\.md$/);
    const slug = slugMatch ? slugMatch[1] : filename.replace('.md', '');

    const html = remark()
      .use(remarkGfm)
      .use(remarkHtml)
      .processSync(content)
      .toString();

    const rtMinutes = computeReadingMinutes(content);
    let dateStr = "";
    if (data.date instanceof Date) {
      dateStr = data.date.toISOString().split('T')[0];
    } else {
      dateStr = String(data.date);
    }

    posts.push({
      slug,
      title: data.title || '',
      description: data.description || '',
      date: dateStr,
      topic: data.topic || '',
      pinned: data.pinned === true,
      content,
      html,
      readingTimeMinutes: rtMinutes
    });
  }

  // Filter by date <= today
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const todayStr = `${year}-${month}-${day}`;

  const publishedPosts = posts.filter(p => p.date <= todayStr);
  
  // Sort oldest first to compute day numbers
  const unpinnedPosts = publishedPosts.filter(p => !p.pinned).sort((a, b) => a.date.localeCompare(b.date));
  unpinnedPosts.forEach((p, index) => {
    p.dayNumber = index + 1;
  });

  // Re-sort published posts newest first, with pinned at top
  publishedPosts.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return b.date.localeCompare(a.date);
  });

  return publishedPosts;
}

export function getPostBySlug(slug: string) {
  return getPublishedPosts().find(p => p.slug === slug);
}

export function getAdjacentPosts(slug: string) {
  const posts = getPublishedPosts().filter(p => !p.pinned); // chronological across non-pinned
  const index = posts.findIndex(p => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  // posts is newest first
  return {
    next: index > 0 ? posts[index - 1] : null,
    prev: index < posts.length - 1 ? posts[index + 1] : null,
  };
}
