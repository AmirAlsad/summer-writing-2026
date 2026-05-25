import { useState, useMemo } from "react";
import { Link } from "wouter";
import { getPublishedPosts } from "@/lib/content";
import { resolveImage } from "@/lib/images";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { Footer } from "@/components/Layout";

export default function Home() {
  useDocumentMeta({
    title: "Summer Writing '26 — Thirty pieces in thirty days",
    description: "Thirty pieces in thirty days. Some essays, some fiction, some half-formed. New writing every morning through June.",
    type: "website"
  });

  const posts = useMemo(() => getPublishedPosts(), []);
  const [query, setQuery] = useState("");
  const [asc, setAsc] = useState(false);

  const visiblePosts = useMemo(() => {
    const q = query.trim().toLowerCase();

    // Separate pinned from the rest so it stays anchored at top
    const pinned = posts.filter(p => p.pinned);
    let unpinned = posts.filter(p => !p.pinned);

    if (q) {
      const matchesPinned = pinned.filter(p =>
        p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
      unpinned = unpinned.filter(p =>
        p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
      // When searching, sort unpinned by date then apply asc/desc
      unpinned = unpinned.sort((a, b) => a.date.localeCompare(b.date));
      if (!asc) unpinned = unpinned.reverse();
      return [...matchesPinned, ...unpinned];
    }

    // No search — respect asc/desc for unpinned, pinned stays on top
    const sorted = asc
      ? [...unpinned].sort((a, b) => a.date.localeCompare(b.date))
      : [...unpinned].sort((a, b) => b.date.localeCompare(a.date));
    return [...pinned, ...sorted];
  }, [posts, query, asc]);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[var(--paper)] text-[var(--ink)]">
      <main className="flex-1">

        {/* Hero */}
        <section
          className="border-b-[3px] border-[var(--ink)] py-[64px] md:py-[96px]"
          style={{ background: `radial-gradient(circle, rgba(27,31,58,0.18) 1px, transparent 1.4px) 0 0/24px 24px, var(--paper)` }}
        >
          <div className="max-w-[680px] mx-auto px-[20px] md:px-[40px]">
            <h1 className="poster">
              SUMMER<br />WRITING <em className="text-[var(--hot-pink)] not-italic">'26</em>
            </h1>
            <p className="t-lede mt-[32px]">
              By: Amir Alsad
            </p>
          </div>
        </section>

        {/* Feed */}
        <section className="py-[48px]">
          <div className="max-w-[680px] mx-auto px-[20px] md:px-[40px]">

            {/* Search + sort controls */}
            <div className="flex items-center gap-[12px] mb-[32px]">
              <input
                type="search"
                placeholder="Search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="flex-1 bg-transparent border-b-[2px] border-[var(--ink)] py-[8px] font-mono text-[13px] tracking-[0.04em] text-[var(--ink)] placeholder:text-[var(--ink-mute)] outline-none focus:border-[var(--hot-pink)] transition-colors duration-150"
              />
              <button
                onClick={() => setAsc(v => !v)}
                className="shrink-0 flex items-center gap-[6px] font-mono text-[11px] font-bold tracking-[0.08em] uppercase border-[2px] border-[var(--ink)] px-[12px] py-[7px] bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors duration-150 cursor-pointer focus-visible:outline-[3px] focus-visible:outline-[var(--hot-pink)] focus-visible:outline-offset-2 whitespace-nowrap"
              >
                <span>{asc ? "↑" : "↓"}</span>
                <span>{asc ? "Oldest" : "Newest"}</span>
              </button>
            </div>

            <div className="flex flex-col gap-[12px]">
              {visiblePosts.map((post) => {
                const [, m, d] = post.date.split('-');
                return (
                  <Link
                    key={post.slug}
                    href={`/${post.slug}`}
                    className="link-block flex flex-col border-[3px] border-[var(--ink)] shadow-[5px_5px_0_var(--ink)] bg-[var(--paper)] group cursor-pointer hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[8px_8px_0_var(--ink)] transition-all duration-150 focus-visible:outline-[3px] focus-visible:outline-[var(--hot-pink)] focus-visible:outline-offset-[-2px]"
                  >
                    {/* Cover image */}
                    {resolveImage(post.image) && (
                      <div className="w-full overflow-hidden border-b-[3px] border-[var(--ink)]">
                        <img
                          src={resolveImage(post.image)}
                          alt=""
                          className="w-full h-[180px] object-cover object-center block"
                        />
                      </div>
                    )}
                    <div className="flex gap-[24px] items-start p-[24px_28px]">
                    {/* Day / date column */}
                    <div className="shrink-0 w-[52px]">
                      {post.pinned ? (
                        <div className="flex flex-col gap-[6px]">
                          <span className="inline-block font-mono text-[10px] font-bold tracking-[0.08em] border-[2px] border-[var(--ink)] bg-[var(--hot-pink)] text-[var(--paper)] px-[5px] py-[2px] leading-none">
                            INTRO
                          </span>
                          <time dateTime={post.date} className="font-mono text-[10px] font-medium tracking-[0.08em] text-[var(--ink-mute)] uppercase">
                            {m}.{d}
                          </time>
                        </div>
                      ) : (
                        <div className="font-display font-black text-[36px] leading-[0.9] tracking-[-1.5px] text-[var(--ink-mute)]">
                          {String(post.dayNumber).padStart(2, '0')}
                          <time dateTime={post.date} className="block font-mono text-[10px] font-medium tracking-[0.08em] text-[var(--ink-mute)] uppercase mt-[4px]">
                            {m}.{d}
                          </time>
                        </div>
                      )}
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-extrabold text-[22px] leading-[1.05] tracking-[-0.3px] text-[var(--ink)] m-0">
                        {post.title}
                      </h3>
                      <p className="font-serif italic text-[15px] leading-[1.5] text-[var(--ink-soft)] mt-[4px] m-0">
                        {post.description}
                      </p>
                      <div className="font-mono text-[10px] font-medium tracking-[0.08em] uppercase text-[var(--ink-mute)] mt-[8px]">
                        {post.readingTimeMinutes} min read
                      </div>
                    </div>
                    </div>
                  </Link>
                );
              })}

              {visiblePosts.length === 0 && (
                <div className="py-[64px] text-center font-serif italic text-[var(--ink-soft)] text-[18px]">
                  {query ? "Nothing matches." : "Not yet."}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
