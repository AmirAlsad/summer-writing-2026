import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { resolveDocument } from "@/lib/documents";

// Wire PDF.js's worker. `new URL(..., import.meta.url)` lets Vite emit it as a
// hashed asset that resolves correctly under any BASE_PATH (root locally,
// /summer-2026/ in production). The pdfjs-dist version is pinned to react-pdf's
// to avoid "API version does not match Worker version" errors.
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const MAX_PAGE_WIDTH = 560;

interface PdfDocProps {
  name: string;
  className?: string;
}

// A minimal paged PDF viewer: one page at a time, no transition animation.
// Flip by clicking the left/right half of the page, the Prev/Next buttons, or
// the arrow keys while the page is focused.
export default function PdfDoc({ name, className }: PdfDocProps) {
  const url = resolveDocument(name);

  const wrapRef = useRef<HTMLDivElement>(null);

  const [pageWidth, setPageWidth] = useState(0);
  const [numPages, setNumPages] = useState(0);
  const [aspect, setAspect] = useState(0); // page width / height
  const [current, setCurrent] = useState(0); // 0-based
  const [failed, setFailed] = useState(false);

  // Measure available width and clamp to a readable maximum.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 0;
      if (w > 0) setPageWidth(Math.min(MAX_PAGE_WIDTH, Math.floor(w)));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!url) {
    return (
      <Notice className={className}>
        Document not found: <code>{name}</code>. Drop{" "}
        <code>{name.endsWith(".pdf") ? name : `${name}.pdf`}</code> into{" "}
        <code>content/documents/</code>.
      </Notice>
    );
  }

  const onDocumentLoad = async (pdf: {
    numPages: number;
    getPage: (n: number) => Promise<{
      getViewport: (o: { scale: number }) => { width: number; height: number };
    }>;
  }) => {
    setNumPages(pdf.numPages);
    setCurrent(0);
    try {
      const page = await pdf.getPage(1);
      const vp = page.getViewport({ scale: 1 });
      setAspect(vp.width / vp.height);
    } catch {
      setAspect(612 / 792); // US Letter fallback
    }
  };

  const go = (delta: number) =>
    setCurrent((c) => Math.max(0, Math.min(numPages - 1, c + delta)));

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (["ArrowRight", "ArrowDown", "PageDown"].includes(e.key)) {
      e.preventDefault();
      go(1);
    } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) {
      e.preventDefault();
      go(-1);
    }
  };

  const pageHeight = aspect ? Math.round(pageWidth / aspect) : 0;
  const ready = pageWidth > 0 && numPages > 0 && aspect > 0;

  return (
    <figure ref={wrapRef} className={className} data-testid="pdf-doc">
      <Document
        file={url}
        onLoadError={() => setFailed(true)}
        onSourceError={() => setFailed(true)}
        onLoadSuccess={onDocumentLoad}
        loading={<Notice>Loading document…</Notice>}
        error={<Notice>Couldn’t load this document.</Notice>}
      >
        {failed ? (
          <Notice>Couldn’t load this document.</Notice>
        ) : (
          ready && (
            <div className="flex flex-col items-center">
              <div
                tabIndex={0}
                onKeyDown={onKeyDown}
                aria-label={`PDF, page ${current + 1} of ${numPages}`}
                className="relative box-content overflow-hidden bg-white border-[3px] border-[var(--ink)] shadow-[5px_5px_0_var(--ink)] [&_canvas]:block focus-visible:outline-[3px] focus-visible:outline-[var(--hot-pink)] focus-visible:outline-offset-2"
                style={{ width: pageWidth, height: pageHeight }}
                data-testid="pdf-page"
              >
                <Page
                  key={current}
                  pageNumber={current + 1}
                  width={pageWidth}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  loading=""
                />

                {/* Mouse-only click zones — keyboard/SR users use the buttons
                    below. Left half goes back, right half goes forward. */}
                {current > 0 && (
                  <div
                    role="button"
                    aria-hidden="true"
                    onClick={() => go(-1)}
                    className="group absolute inset-y-0 left-0 w-1/2 cursor-pointer flex items-center justify-start"
                    data-testid="pdf-zone-prev"
                  >
                    <span className="ml-[6px] text-[44px] leading-none text-[var(--ink)] opacity-0 group-hover:opacity-25 transition-opacity duration-150 select-none">
                      ‹
                    </span>
                  </div>
                )}
                {current < numPages - 1 && (
                  <div
                    role="button"
                    aria-hidden="true"
                    onClick={() => go(1)}
                    className="group absolute inset-y-0 right-0 w-1/2 cursor-pointer flex items-center justify-end"
                    data-testid="pdf-zone-next"
                  >
                    <span className="mr-[6px] text-[44px] leading-none text-[var(--ink)] opacity-0 group-hover:opacity-25 transition-opacity duration-150 select-none">
                      ›
                    </span>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div
                className="mt-[18px] flex items-center gap-[16px] font-mono text-[11px] font-bold tracking-[0.08em] uppercase text-[var(--ink-mute)]"
                data-testid="pdf-controls"
              >
                <button
                  type="button"
                  onClick={() => go(-1)}
                  disabled={current <= 0}
                  aria-label="Previous page"
                  className="border-[3px] border-[var(--ink)] px-[12px] py-[6px] shadow-[3px_3px_0_var(--ink)] text-[var(--ink)] enabled:hover:-translate-y-[1px] enabled:hover:-translate-x-[1px] enabled:hover:shadow-[5px_5px_0_var(--ink)] transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-[3px] focus-visible:outline-[var(--hot-pink)] focus-visible:outline-offset-2"
                >
                  &larr; Prev
                </button>
                <span data-testid="pdf-page-indicator">
                  Page {current + 1} / {numPages}
                </span>
                <button
                  type="button"
                  onClick={() => go(1)}
                  disabled={current >= numPages - 1}
                  aria-label="Next page"
                  className="border-[3px] border-[var(--ink)] px-[12px] py-[6px] shadow-[3px_3px_0_var(--ink)] text-[var(--ink)] enabled:hover:-translate-y-[1px] enabled:hover:-translate-x-[1px] enabled:hover:shadow-[5px_5px_0_var(--ink)] transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-[3px] focus-visible:outline-[var(--hot-pink)] focus-visible:outline-offset-2"
                >
                  Next &rarr;
                </button>
              </div>
            </div>
          )
        )}
      </Document>

      <figcaption className="mt-[12px] text-center font-mono text-[11px] tracking-[0.06em] text-[var(--ink-mute)] uppercase">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--hot-pink)] underline-offset-[3px] hover:underline"
        >
          Open original PDF ↗
        </a>
      </figcaption>
    </figure>
  );
}

function Notice({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center border-[3px] border-dashed border-[var(--rule-soft)] bg-[var(--paper-2)] px-[20px] py-[40px] text-center font-mono text-[12px] tracking-[0.04em] text-[var(--ink-mute)] ${className ?? ""}`}
    >
      <p>{children}</p>
    </div>
  );
}
