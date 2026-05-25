import { useRoute, Link } from "wouter";
import { getPostBySlug, getAdjacentPosts } from "@/lib/content";
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
      <main className="flex-1 w-full px-[20px] md:px-[40px] py-[48px] md:py-[80px]">
        <div className="max-w-[680px] mx-auto">

          {/* Back link */}
          <Link
            href="/"
            className="inline-block font-mono text-[11px] font-bold tracking-[0.1em] uppercase text-[var(--ink-mute)] mb-[48px] focus-visible:outline-[3px] focus-visible:outline-[var(--hot-pink)] focus-visible:outline-offset-2"
          >
            &larr; All pieces
          </Link>

          {/* Eyebrow */}
          <div className="font-mono text-[12px] font-medium tracking-[0.06em] uppercase text-[var(--ink-mute)] mb-[20px]">
            {post.dayNumber && `Day ${post.dayNumber} · `}
            <time dateTime={post.date}>{formattedDate}</time>
            {post.topic && ` · ${post.topic}`}
            {` · ${post.readingTimeMinutes} min read`}
          </div>

          {/* Title & description */}
          <h1 className="t-h1 mb-[16px]">{post.title}</h1>
          <p className="t-lede mb-[56px]">{post.description}</p>

          {/* Body */}
          <article
            className="article-body prose prose-lg max-w-none
              prose-headings:font-display prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-[var(--ink)]
              prose-p:font-serif prose-p:text-[var(--ink)] prose-p:text-[20px] prose-p:leading-[1.7]
              prose-a:text-[var(--hot-pink)] prose-a:no-underline hover:prose-a:underline hover:prose-a:decoration-2 hover:prose-a:underline-offset-[3px]
              prose-blockquote:font-editorial prose-blockquote:italic prose-blockquote:border-l-4 prose-blockquote:border-[var(--hot-pink)] prose-blockquote:pl-[16px] prose-blockquote:text-[24px] prose-blockquote:text-[var(--ink-soft)]
              prose-code:font-mono prose-code:bg-[var(--paper-2)] prose-code:border prose-code:border-[var(--rule-soft)] prose-code:rounded-[2px] prose-code:px-[4px] prose-code:py-[2px] prose-code:text-[0.9em] prose-code:before:content-none prose-code:after:content-none
              prose-img:border-[3px] prose-img:border-[var(--ink)] prose-img:shadow-[5px_5px_0_var(--ink)] prose-img:my-[32px]
              prose-ul:font-serif prose-ul:text-[20px] prose-ol:font-serif prose-ol:text-[20px]"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          {/* Prev/Next nav */}
          <nav className="mt-[80px] grid grid-cols-1 md:grid-cols-2 gap-[12px]">
            {prev ? (
              <Link
                href={`/${prev.slug}`}
                className="flex flex-col gap-[4px] border-[3px] border-[var(--ink)] p-[16px_20px] shadow-[5px_5px_0_var(--ink)] text-[var(--ink)] hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[8px_8px_0_var(--ink)] transition-all duration-200 focus-visible:outline-[3px] focus-visible:outline-[var(--hot-pink)] focus-visible:outline-offset-2"
              >
                <span className="font-mono text-[10px] font-bold tracking-[0.08em] uppercase text-[var(--ink-mute)]">
                  &larr; Day {prev.dayNumber}
                </span>
                <span className="font-display font-extrabold text-[20px] leading-[1.05] text-[var(--ink)]">
                  {prev.title}
                </span>
              </Link>
            ) : <div />}

            {next ? (
              <Link
                href={`/${next.slug}`}
                className="flex flex-col gap-[4px] border-[3px] border-[var(--ink)] p-[16px_20px] shadow-[5px_5px_0_var(--ink)] text-[var(--ink)] text-right hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[8px_8px_0_var(--ink)] transition-all duration-200 focus-visible:outline-[3px] focus-visible:outline-[var(--hot-pink)] focus-visible:outline-offset-2"
              >
                <span className="font-mono text-[10px] font-bold tracking-[0.08em] uppercase text-[var(--ink-mute)]">
                  Day {next.dayNumber} &rarr;
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
