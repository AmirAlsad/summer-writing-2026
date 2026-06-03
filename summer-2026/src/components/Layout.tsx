import { Link } from "wouter";

export function Header() {
  return (
    <header className="bg-[var(--paper)] border-b-[3px] border-[var(--ink)]">
      <div className="max-w-[1200px] mx-auto px-[20px] md:px-[32px] py-4">
        <Link href="/" className="inline-flex flex-col no-underline hover:bg-transparent hover:text-[var(--ink)] focus-visible:outline-[3px] focus-visible:outline-[var(--hot-pink)] focus-visible:outline-offset-2">
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
  // Assembled from parts at runtime so the full address never appears as a
  // literal in the served HTML or the JS bundle — most address harvesters
  // scrape raw markup (this SPA renders to an empty shell) or regex the bundle
  // for `x@y` patterns, and neither finds anything here.
  // Built from char codes at runtime so the bundle never contains a literal
  // `x@y` email pattern for harvesters to regex out. We use .map() with a
  // callback on purpose: esbuild constant-folds template literals, joins, and
  // even decodeURIComponent straight back into the address, but it won't run a
  // user callback at build time. Codes below decode to "the@amiralsad.blog".
  const email = [
    116, 104, 101, 64, 97, 109, 105, 114, 97, 108, 115, 97, 100, 46, 98, 108,
    111, 103,
  ]
    .map((c) => String.fromCharCode(c))
    .join("");
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
      <a
        href={`mailto:${email}`}
        aria-label="Email"
        className="mt-[10px] inline-block font-mono text-[11px] font-bold tracking-[0.06em] text-[var(--ink)]! underline decoration-[var(--hot-pink)] decoration-2 underline-offset-[3px] transition-colors hover:text-[var(--hot-pink)]! hover:bg-transparent focus-visible:outline-[3px] focus-visible:outline-[var(--hot-pink)] focus-visible:outline-offset-2"
      >
        {email}
      </a>
    </footer>
  );
}
