import { useState, useMemo } from "react";
import { Link } from "wouter";
import { getPublishedPosts, type Post } from "@/lib/content";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { Footer } from "@/components/Layout";

function TopicsModal({ posts, onClose }: { posts: Post[]; onClose: () => void }) {
  const byTopic = useMemo(() => {
    const map: Record<string, Post[]> = {};
    posts.forEach(p => {
      if (!p.topic || p.pinned) return;
      if (!map[p.topic]) map[p.topic] = [];
      map[p.topic].push(p);
    });
    return map;
  }, [posts]);

  const topics = Object.keys(byTopic).sort();

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-[20px]"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[var(--ink)] opacity-60" />
      <div
        className="relative bg-[var(--paper)] border-[3px] border-[var(--ink)] shadow-[8px_8px_0_var(--ink)] w-full max-w-[560px] p-[40px]"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-[16px] right-[20px] font-mono text-[13px] font-bold tracking-[0.08em] uppercase text-[var(--ink-mute)] cursor-pointer focus-visible:outline-[3px] focus-visible:outline-[var(--hot-pink)] focus-visible:outline-offset-2"
        >
          Close
        </button>

        <h2 className="font-display font-black text-[32px] leading-none tracking-[-1px] text-[var(--ink)] mb-[32px]">
          Topics
        </h2>

        <div className="flex flex-col gap-[28px]">
          {topics.map(topic => (
            <div key={topic}>
              <div className="font-mono text-[11px] font-bold tracking-[0.1em] uppercase text-[var(--ink-mute)] mb-[10px]">
                {topic}
              </div>
              <ul className="flex flex-col gap-[6px] list-none m-0 p-0">
                {byTopic[topic].map(p => (
                  <li key={p.slug}>
                    <Link
                      href={`/${p.slug}`}
                      onClick={onClose}
                      className="font-serif text-[18px] text-[var(--ink)] cursor-pointer focus-visible:outline-[3px] focus-visible:outline-[var(--hot-pink)] focus-visible:outline-offset-2"
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  useDocumentMeta({
    title: "Summer Writing '26 — Thirty pieces in thirty days",
    description: "Thirty pieces in thirty days. Some essays, some fiction, some half-formed. New writing every morning through June.",
    type: "website"
  });

  const posts = useMemo(() => getPublishedPosts(), []);
  const [topicsOpen, setTopicsOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[var(--paper)] text-[var(--ink)]">
      <main className="flex-1">

        {/* Hero */}
        <section
          className="border-b-[3px] border-[var(--ink)] py-[64px] md:py-[96px] px-[20px] md:px-[40px]"
          style={{ background: `radial-gradient(circle, rgba(27,31,58,0.18) 1px, transparent 1.4px) 0 0/24px 24px, var(--paper)` }}
        >
          <div className="max-w-[680px] mx-auto">
            <h1 className="poster -ml-1">
              SUMMER<br />WRITING <em className="text-[var(--hot-pink)] not-italic">'26</em>
            </h1>
            <p className="t-lede max-w-[560px] mt-[32px]">
              Thirty pieces in thirty days. Some essays, some fiction, some half-formed. New writing every morning through June.
            </p>
            <button
              onClick={() => setTopicsOpen(true)}
              className="mt-[28px] font-mono text-[12px] font-bold tracking-[0.1em] uppercase text-[var(--ink)] underline underline-offset-[4px] decoration-[2px] decoration-[var(--hot-pink)] cursor-pointer focus-visible:outline-[3px] focus-visible:outline-[var(--hot-pink)] focus-visible:outline-offset-2"
            >
              View topics
            </button>
          </div>
        </section>

        {/* Post feed */}
        <section className="max-w-[680px] mx-auto px-[20px] md:px-[40px] py-[48px]">
          <div className="flex flex-col border-b-[1.5px] border-[var(--ink)]">
            {posts.map((post) => {
              const [, m, d] = post.date.split('-');
              return (
                <Link
                  key={post.slug}
                  href={`/${post.slug}`}
                  className="flex gap-[24px] items-start py-[28px] border-t-[1.5px] border-[var(--ink)] group cursor-pointer focus-visible:outline-[3px] focus-visible:outline-[var(--hot-pink)] focus-visible:outline-offset-[-2px]"
                >
                  {/* Day / label */}
                  <div className="shrink-0 w-[52px] font-display font-black text-[36px] leading-[0.9] tracking-[-1.5px] text-[var(--ink-mute)]">
                    {post.pinned ? (
                      <span className="inline-block font-mono text-[11px] font-bold tracking-[0.08em] border-[2px] border-[var(--ink)] bg-[var(--hot-pink)] text-[var(--paper)] px-[6px] py-[3px] leading-none mt-[6px]">
                        INTRO
                      </span>
                    ) : (
                      <>
                        {String(post.dayNumber).padStart(2, '0')}
                        <time dateTime={post.date} className="block font-mono text-[10px] font-medium tracking-[0.08em] text-[var(--ink-mute)] uppercase mt-[4px]">
                          {m}.{d}
                        </time>
                      </>
                    )}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-extrabold text-[22px] leading-[1.05] tracking-[-0.3px] text-[var(--ink)] m-0 group-hover:underline group-hover:underline-offset-[3px] group-hover:decoration-[2px] group-hover:decoration-[var(--hot-pink)]">
                      {post.title}
                    </h3>
                    <p className="font-serif italic text-[15px] leading-[1.5] text-[var(--ink-soft)] mt-[4px] m-0">
                      {post.description}
                    </p>
                    <div className="font-mono text-[10px] font-medium tracking-[0.08em] uppercase text-[var(--ink-mute)] mt-[8px]">
                      {post.readingTimeMinutes} min &middot; {post.topic}
                    </div>
                  </div>
                </Link>
              );
            })}

            {posts.length === 0 && (
              <div className="py-[64px] border-t-[1.5px] border-[var(--ink)] text-center font-serif italic text-[var(--ink-soft)] text-[18px]">
                Not yet.
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      {topicsOpen && <TopicsModal posts={posts} onClose={() => setTopicsOpen(false)} />}
    </div>
  );
}
