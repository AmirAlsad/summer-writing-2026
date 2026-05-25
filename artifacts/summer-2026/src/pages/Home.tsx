import { useState, useMemo } from "react";
import { Link } from "wouter";
import { getPublishedPosts } from "@/lib/content";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { Header, Footer } from "@/components/Layout";

export default function Home() {
  useDocumentMeta({
    title: "Summer Writing '26 — Thirty pieces in thirty days",
    description: "Thirty pieces in thirty days. Some essays, some fiction, some half-formed. New writing every morning through June.",
    type: "website"
  });

  const posts = useMemo(() => getPublishedPosts(), []);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  // Derive topics
  const topics = useMemo(() => {
    const topicSet = new Set<string>();
    posts.forEach(p => {
      if (p.topic) {
        topicSet.add(p.topic);
      }
    });
    return Array.from(topicSet).sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (!activeTopic) return posts;
    return posts.filter(p => p.topic === activeTopic || p.pinned);
  }, [posts, activeTopic]);

  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const hasLiveToday = posts.some(p => p.date === todayStr);

  const colors = ["pink", "turq", "coral", "sun", "mint"];
  
  return (
    <div className="min-h-[100dvh] flex flex-col bg-[var(--paper)] text-[var(--ink)]">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section 
          className="border-b-[3px] border-[var(--ink)] py-[64px] md:py-[96px] px-[20px] md:px-[32px]"
          style={{
            background: `radial-gradient(circle, rgba(27,31,58,0.18) 1px, transparent 1.4px) 0 0/24px 24px, var(--paper)`
          }}
        >
          <div className="max-w-[1200px] mx-auto">
            <h1 className="poster -ml-1">
              SUMMER<br/>WRITING<em className="text-[var(--hot-pink)] not-italic">.</em>
            </h1>
            <p className="t-lede max-w-[680px] mt-[32px]">
              Thirty pieces in thirty days. Some essays, some fiction, some half-formed. New writing every morning through June.
            </p>
          </div>
        </section>

        {/* Topics Chip Row */}
        <section className="border-b-[3px] border-[var(--ink)] py-[24px] px-[20px] md:px-[32px] bg-[var(--paper-2)]">
          <div className="max-w-[1200px] mx-auto flex flex-wrap gap-[10px] md:gap-[12px] items-center">
            {hasLiveToday && (
              <button 
                onClick={() => setActiveTopic(null)}
                className={`
                  inline-flex items-center gap-[8px] font-mono font-bold text-[12px] tracking-[0.08em] uppercase
                  px-[14px] py-[8px] border-[2.5px] border-[var(--ink)] rounded-full
                  shadow-[3px_3px_0_var(--ink)] transition-transform hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[5px_5px_0_var(--ink)]
                  bg-[var(--mint)] text-[var(--ink)]
                  focus-visible:outline-[3px] focus-visible:outline-[var(--hot-pink)] focus-visible:outline-offset-2
                  cursor-pointer
                `}
              >
                <span className="w-[8px] h-[8px] bg-[#10A674] shadow-[0_0_0_3px_var(--mint)] rounded-full animate-pulse"></span>
                LIVE TODAY
              </button>
            )}
            
            {topics.map((topic, i) => {
              const isActive = activeTopic === topic;
              const colorClass = isActive ? 'bg-[var(--ink)] text-[var(--paper)]' : 
                               (i % colors.length === 0 ? 'bg-[var(--hot-pink)] text-[var(--paper)]' : 
                                i % colors.length === 1 ? 'bg-[var(--turquoise)] text-[var(--ink)]' :
                                i % colors.length === 2 ? 'bg-[var(--coral)] text-[var(--ink)]' :
                                i % colors.length === 3 ? 'bg-[var(--sun)] text-[var(--ink)]' : 'bg-[var(--mint)] text-[var(--ink)]');
              
              const dotColor = isActive ? 'bg-[var(--paper)]' : (i % colors.length === 0 ? 'bg-[var(--paper)]' : 'bg-[var(--ink)]');

              return (
                <button
                  key={topic}
                  onClick={() => setActiveTopic(isActive ? null : topic)}
                  className={`
                    inline-flex items-center gap-[8px] font-mono font-bold text-[12px] tracking-[0.08em] uppercase
                    px-[14px] py-[8px] border-[2.5px] border-[var(--ink)] rounded-full
                    shadow-[3px_3px_0_var(--ink)] transition-transform hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[5px_5px_0_var(--ink)]
                    focus-visible:outline-[3px] focus-visible:outline-[var(--hot-pink)] focus-visible:outline-offset-2
                    cursor-pointer
                    ${colorClass}
                  `}
                >
                  <span className={`w-[8px] h-[8px] ${dotColor} rounded-full`}></span>
                  {topic}
                </button>
              );
            })}
          </div>
        </section>

        {/* Post Feed */}
        <section className="max-w-[1200px] mx-auto px-[20px] md:px-[32px] py-[48px]">
          <div className="flex flex-col border-b-[1.5px] border-[var(--ink)]">
            {filteredPosts.map((post) => {
              const [m, d] = post.date.split('-').slice(1);
              return (
                <Link
                  key={post.slug}
                  href={`/${post.slug}`}
                  className={`
                    grid grid-cols-[80px_1fr] md:grid-cols-[96px_1fr_auto] gap-[16px] md:gap-[24px] items-start
                    py-[24px] border-top-[1.5px] border-t-[1.5px] border-[var(--ink)]
                    cursor-pointer transition-all duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)]
                    hover:pl-[6px] hover:bg-transparent group
                    focus-visible:outline-[3px] focus-visible:outline-[var(--hot-pink)] focus-visible:outline-offset-2 focus-visible:-outline-offset-2
                    no-underline
                  `}
                >
                  <div className="day font-display font-black text-[42px] md:text-[54px] leading-[0.9] tracking-[-2px] text-[var(--ink)] transition-all duration-200 group-hover:text-[var(--hot-pink)] group-hover:-translate-y-[2px] group-hover:-translate-x-[2px] ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                    {post.pinned ? (
                      <span className="inline-block font-mono text-[13px] font-bold tracking-[0.08em] border-[2.5px] border-[var(--ink)] bg-[var(--hot-pink)] text-[var(--paper)] px-2 py-1 shadow-[2px_2px_0_var(--ink)] leading-none mt-2">INTRO</span>
                    ) : (
                      <>
                        {String(post.dayNumber).padStart(2, '0')}
                        <small className="block font-mono text-[11px] font-medium tracking-[0.08em] text-[var(--ink-mute)] uppercase mt-[4px]">
                          {m}.{d}
                        </small>
                      </>
                    )}
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-[24px] md:text-[30px] leading-[1] tracking-[-0.5px] text-[var(--ink)] mb-[6px] transition-colors duration-200 group-hover:text-[var(--hot-pink)] m-0">
                      {post.title}
                    </h3>
                    <p className="font-serif italic text-[16px] leading-[1.5] text-[var(--ink-soft)] m-0 max-w-[520px]">
                      {post.description}
                    </p>
                  </div>
                  <div className="font-mono text-[11px] font-medium tracking-[0.08em] uppercase text-[var(--ink-mute)] whitespace-nowrap pt-[8px] flex items-center gap-[10px] col-span-2 md:col-span-1">
                    {post.readingTimeMinutes} MIN &middot; {post.topic}
                    <span className="arrow inline-block w-0 overflow-hidden font-display font-black text-[22px] text-[var(--hot-pink)] transition-all duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:w-[24px] group-hover:ml-[4px] ml-0 leading-none">
                      &rarr;
                    </span>
                  </div>
                </Link>
              );
            })}
            
            {filteredPosts.length === 0 && (
              <div className="py-[64px] border-t-[1.5px] border-[var(--ink)] text-center font-serif italic text-[var(--ink-soft)] text-[18px]">
                Not yet.
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
