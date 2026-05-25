import { useRoute, Link } from "wouter";
import { getPostBySlug, getAdjacentPosts } from "@/lib/content";
import { resolveImage } from "@/lib/images";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { Footer } from "@/components/Layout";
import NotFound from "@/pages/not-found";

export default function Post() {
  const [, params] = useRoute("/:slug");
  const slug = params?.slug || "";

  const post = getPostBySlug(slug);
  const { prev, next } = getAdjacentPosts(slug);

  if (!post) {
    return <NotFound />;
  }

  useDocumentMeta({
    title: `${post.title} — Summer Writing '26`,
    description: post.description,
    type: "article"
  });

  const [y, m, d] = post.date.split('-');
  const formattedDate = `${m}.${d}.${y.slice(2)}`;

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[var(--paper)] text-[var(--ink)]">
      <main className="flex-1 w-full px-[20px] md:px-[40px] py-[56px] md:py-[96px]">
        <div className="max-w-[680px] mx-auto">

          {/* Back link */}
          <Link
            href="/"
            className="link-block inline-block font-mono text-[11px] font-bold tracking-[0.1em] uppercase text-[var(--ink-mute)] mb-[64px] focus-visible:outline-[3px] focus-visible:outline-[var(--hot-pink)] focus-visible:outline-offset-2"
          >
            &larr; All pieces
          </Link>

          {/* Header block */}
          <div className="flex flex-col gap-[28px] mb-[72px]">
            <div className="font-mono text-[12px] font-medium tracking-[0.06em] uppercase text-[var(--ink-mute)]">
              {post.dayNumber ? `Day ${post.dayNumber} · ` : (post.pinned ? 'Intro · ' : '')}
              <time dateTime={post.date}>{formattedDate}</time>
              {` · ${post.readingTimeMinutes} min read`}
            </div>

            <h1 className="t-h1">{post.title}</h1>

            <p className="t-lede">{post.description}</p>
            <p className="font-mono text-[12px] font-medium tracking-[0.06em] uppercase text-[var(--ink-mute)]">By: Amir Alsad</p>
          </div>

          {/* Cover image */}
          {resolveImage(post.image) && (
            <figure className="mb-[56px]">
              <div className="border-[3px] border-[var(--ink)] shadow-[5px_5px_0_var(--ink)] overflow-hidden">
                <img
                  src={resolveImage(post.image)}
                  alt={post.imageCaption || ""}
                  className="w-full h-[360px] object-cover object-center block"
                />
              </div>
              {post.imageCaption && (
                <figcaption className="mt-[10px] font-mono text-[11px] tracking-[0.06em] text-[var(--ink-mute)] uppercase">
                  {post.imageCaption}
                </figcaption>
              )}
            </figure>
          )}

          {/* Body */}
          <article
            className="article-body prose prose-lg max-w-none
              prose-headings:font-display prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-[var(--ink)] prose-headings:mt-[2em] prose-headings:mb-[0.5em]
              prose-p:font-serif prose-p:text-[var(--ink)] prose-p:text-[20px] prose-p:leading-[1.75] prose-p:mt-[1.5em] prose-p:mb-0
              prose-a:text-[var(--hot-pink)] prose-a:no-underline hover:prose-a:underline hover:prose-a:decoration-2 hover:prose-a:underline-offset-[3px]
              prose-blockquote:font-editorial prose-blockquote:italic prose-blockquote:border-l-4 prose-blockquote:border-[var(--hot-pink)] prose-blockquote:pl-[20px] prose-blockquote:my-[2em] prose-blockquote:text-[22px] prose-blockquote:leading-[1.5] prose-blockquote:text-[var(--ink-soft)]
              prose-code:font-mono prose-code:bg-[var(--paper-2)] prose-code:border prose-code:border-[var(--rule-soft)] prose-code:rounded-[2px] prose-code:px-[4px] prose-code:py-[2px] prose-code:text-[0.9em] prose-code:before:content-none prose-code:after:content-none
              prose-img:border-[3px] prose-img:border-[var(--ink)] prose-img:shadow-[5px_5px_0_var(--ink)] prose-img:my-[48px]
              prose-ul:font-serif prose-ul:text-[20px] prose-ul:leading-[1.75] prose-ul:my-[1.5em]
              prose-ol:font-serif prose-ol:text-[20px] prose-ol:leading-[1.75] prose-ol:my-[1.5em]
              prose-li:mt-[0.5em]
              [&>*:first-child]:mt-0"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          {/* Prev/Next nav */}
          <nav className="mt-[96px] grid grid-cols-1 md:grid-cols-2 gap-[12px]">
            {prev ? (
              <Link
                href={`/${prev.slug}`}
                className="link-block flex flex-col gap-[4px] border-[3px] border-[var(--ink)] p-[16px_20px] shadow-[5px_5px_0_var(--ink)] hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[8px_8px_0_var(--ink)] transition-all duration-200 focus-visible:outline-[3px] focus-visible:outline-[var(--hot-pink)] focus-visible:outline-offset-2"
              >
                <span className="font-mono text-[10px] font-bold tracking-[0.08em] uppercase text-[var(--ink-mute)]">
                  &larr; {prev.pinned ? 'Intro' : `Day ${prev.dayNumber}`}
                </span>
                <span className="font-display font-extrabold text-[20px] leading-[1.05] text-[var(--ink)]">
                  {prev.title}
                </span>
              </Link>
            ) : <div />}

            {next ? (
              <Link
                href={`/${next.slug}`}
                className="link-block flex flex-col gap-[4px] border-[3px] border-[var(--ink)] p-[16px_20px] shadow-[5px_5px_0_var(--ink)] text-right hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[8px_8px_0_var(--ink)] transition-all duration-200 focus-visible:outline-[3px] focus-visible:outline-[var(--hot-pink)] focus-visible:outline-offset-2"
              >
                <span className="font-mono text-[10px] font-bold tracking-[0.08em] uppercase text-[var(--ink-mute)]">
                  {next.pinned ? 'Intro' : `Day ${next.dayNumber}`} &rarr;
                </span>
                <span className="font-display font-extrabold text-[20px] leading-[1.05] text-[var(--ink)]">
                  {next.title}
                </span>
              </Link>
            ) : <div />}
          </nav>

        </div>
      </main>

      <Footer />
    </div>
  );
}
