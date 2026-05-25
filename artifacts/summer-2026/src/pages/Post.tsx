import { useRoute, Link } from "wouter";
import { getPostBySlug, getAdjacentPosts } from "@/lib/content";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { Header, Footer } from "@/components/Layout";
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
      <Header />
      
      <main className="flex-1 w-full mx-auto px-[20px] md:px-[32px] py-[32px] md:py-[64px] relative">
        <div className="max-w-[1200px] mx-auto relative">
          {/* Sticky day-counter chip */}
          <div className="sticky top-[84px] z-40 hidden xl:block absolute left-0 -ml-[20px] w-[0]">
             {post.dayNumber && (
              <div className="font-mono text-[11px] font-bold tracking-[0.08em] uppercase border-[2.5px] border-[var(--ink)] shadow-[3px_3px_0_var(--ink)] bg-[var(--sun)] px-[14px] py-[8px] rounded-full inline-flex whitespace-nowrap animate-in fade-in duration-1000">
                DAY {String(post.dayNumber).padStart(2, '0')} &middot; <time dateTime={post.date}>{formattedDate}</time> &middot; {post.readingTimeMinutes} MIN
              </div>
             )}
          </div>

          <div className="max-w-[680px] mx-auto">
            {/* Eyebrow */}
            <div className="font-mono text-[13px] font-medium tracking-[0.06em] uppercase text-[var(--ink-mute)] mb-[16px]">
              {post.dayNumber && `DAY ${post.dayNumber} · `}<time dateTime={post.date}>{formattedDate}</time> · {post.topic} · {post.readingTimeMinutes} MIN READ
            </div>
            
            {/* Title & Desc */}
            <h1 className="t-h1 mb-[12px]">{post.title}</h1>
            <p className="t-lede mb-[48px]">{post.description}</p>
            
            {/* Body */}
            <article 
              className="article-body prose prose-lg max-w-none prose-headings:font-display prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-[var(--ink)] prose-p:font-serif prose-p:text-[var(--ink)] prose-p:text-[20px] prose-p:leading-[1.7] prose-a:text-[var(--hot-pink)] prose-a:underline prose-a:decoration-2 prose-a:underline-offset-[3px] hover:prose-a:bg-[var(--hot-pink)] hover:prose-a:text-[var(--paper)] hover:prose-a:no-underline prose-blockquote:font-editorial prose-blockquote:italic prose-blockquote:border-l-4 prose-blockquote:border-[var(--hot-pink)] prose-blockquote:pl-[16px] prose-blockquote:text-[24px] prose-blockquote:text-[var(--ink-soft)] prose-code:font-mono prose-code:bg-[var(--paper-2)] prose-code:border prose-code:border-[var(--rule-soft)] prose-code:rounded-[2px] prose-code:px-[4px] prose-code:py-[2px] prose-code:text-[0.9em] prose-code:before:content-none prose-code:after:content-none prose-img:border-[3px] prose-img:border-[var(--ink)] prose-img:shadow-[5px_5px_0_var(--ink)] prose-img:my-[32px] prose-ul:font-serif prose-ul:text-[20px] prose-ol:font-serif prose-ol:text-[20px]"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
            
            {/* Prev/Next Nav */}
            <nav className="mt-[64px] grid grid-cols-1 md:grid-cols-2 gap-[16px]">
              {prev ? (
                <Link href={`/${prev.slug}`} className="nav flex flex-col gap-[6px] border-[3px] border-[var(--ink)] bg-[var(--paper)] p-[14px_16px] shadow-[5px_5px_0_var(--ink)] text-[var(--ink)] no-underline hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[8px_8px_0_var(--ink)] transition-all focus-visible:outline-[3px] focus-visible:outline-[var(--hot-pink)] focus-visible:outline-offset-2 duration-200">
                  <span className="font-mono text-[11px] font-bold tracking-[0.08em] uppercase text-[var(--ink-mute)]">
                    &larr; DAY {prev.dayNumber}
                  </span>
                  <span className="font-display font-extrabold text-[22px] leading-[1.05] text-[var(--ink)]">
                    {prev.title}
                  </span>
                </Link>
              ) : <div />}
              
              {next ? (
                <Link href={`/${next.slug}`} className="nav flex flex-col gap-[6px] border-[3px] border-[var(--ink)] bg-[var(--paper)] p-[14px_16px] shadow-[5px_5px_0_var(--ink)] text-[var(--ink)] no-underline text-right hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[8px_8px_0_var(--ink)] transition-all focus-visible:outline-[3px] focus-visible:outline-[var(--hot-pink)] focus-visible:outline-offset-2 duration-200">
                  <span className="font-mono text-[11px] font-bold tracking-[0.08em] uppercase text-[var(--ink-mute)]">
                    DAY {next.dayNumber} &rarr;
                  </span>
                  <span className="font-display font-extrabold text-[22px] leading-[1.05] text-[var(--ink)]">
                    {next.title}
                  </span>
                </Link>
              ) : <div />}
            </nav>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
