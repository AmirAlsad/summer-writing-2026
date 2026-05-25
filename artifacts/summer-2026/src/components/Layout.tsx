import { Link } from "wouter";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--paper)] border-b-[3px] border-[var(--ink)]">
      <div className="max-w-[1200px] mx-auto px-[20px] md:px-[32px] py-4">
        <Link href="/summer-2026" className="inline-flex flex-col no-underline hover:bg-transparent hover:text-[var(--ink)] focus-visible:outline-[3px] focus-visible:outline-[var(--hot-pink)] focus-visible:outline-offset-2">
          <div className="font-display font-black text-[32px] md:text-[42px] leading-[0.88] tracking-[-1px] text-[var(--ink)]">
            SUMMER
          </div>
          <div className="font-display font-black text-[32px] md:text-[42px] leading-[0.88] tracking-[-1px] text-[var(--ink)]">
            WRITING <em className="text-[var(--hot-pink)] not-italic">'26</em>
          </div>
        </Link>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer 
      className="mt-20 py-8 px-[20px] md:px-[32px] text-center border-t-[3px] border-[var(--ink)]"
      style={{
        background: `
          linear-gradient(to bottom, transparent, rgba(255,62,128,0.4)),
          linear-gradient(to top, var(--turquoise), transparent 60%),
          var(--peach)
        `
      }}
    >
      <div className="font-mono text-[11px] font-bold tracking-[0.08em] uppercase text-[var(--ink)]">
        WRITING.AMIRALSAD.BLOG / SUMMER 2026
      </div>
    </footer>
  );
}
