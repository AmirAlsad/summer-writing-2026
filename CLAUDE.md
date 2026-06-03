# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static personal blog ("Summer Writing '26") that renders Markdown posts. There is **no server and no database** — posts are plain Markdown read at build time. New writing becomes visible automatically once its `date` is on or before today.

## Commands

Run from the repo root (a pnpm workspace). pnpm is mandatory — a `preinstall` hook rejects npm/yarn.

```bash
pnpm install
pnpm dev          # dev server at http://localhost:5173/ (served at root path)
pnpm build        # builds the app -> summer-2026/dist/public
pnpm typecheck    # tsc --noEmit (recursive over the workspace)
```

`pnpm dev` is a shortcut for `pnpm --filter @workspace/summer-2026 run dev`. To preview a production build locally, or reproduce the Netlify build exactly (served under `/summer-2026/`):

```bash
BASE_PATH=/summer-2026/ pnpm --filter @workspace/summer-2026 run build
pnpm --filter @workspace/summer-2026 run serve   # vite preview
```

There is **no test framework** in this repo.

## Layout

- pnpm workspace with a single member package, `summer-2026`.
- `summer-2026` (`@workspace/summer-2026`) is the entire app — a Vite + React 19 SPA (wouter router, Tailwind v4, shadcn/ui in `src/components/ui/`). This is where ~all real work happens.
- `content/` holds the Markdown posts in `writing/` and `examples/` (see below).
- Post images live in `content/images/` (alongside `writing/` and `examples/`) and are auto-discovered by `src/lib/images.ts` via `import.meta.glob` — no manual registration.
- Embeddable PDFs live in `content/documents/` and are auto-discovered by `src/lib/documents.ts` the same way — drop a `.pdf` in and reference it from a post body (see PDF embeds below).

## Content pipeline (the core of the app)

Understanding `summer-2026/src/lib/content.ts` explains most of the app:

- Posts are loaded at build time via `import.meta.glob('../../../content/{writing,examples}/*.md', { query: '?raw', eager: true })`. Those `../../../` paths reach out of the package into the repo-root `content/` dir — keep the depth and folder names in sync if files move.
- **Source selection:** if `content/writing/` contains at least one real post, only that folder is used; otherwise it falls back to `content/examples/`. A "real" post is a `.md` file whose name does not start with `_` (so `_template.md` is always ignored).
- Front matter is parsed with `front-matter`. The body is split into an ordered `blocks` array (`PostBlock[]`): lines matching `:::pdf <name>` become `{ type: "pdf" }` embeds; everything between them is rendered to HTML with `remark` + `remark-gfm` + `remark-html` using `sanitize: false`. `Post.tsx` walks `blocks`, injecting prose via `dangerouslySetInnerHTML` and rendering `<PdfDoc>` for pdf blocks, so prose and embeds interleave in author order. Post HTML is trusted — this is a single-author blog. (`post.html` is still exposed as the concatenated prose, but `blocks` is what's rendered.)
- **Inline images:** a custom `remarkResolveImages` mdast step rewrites body image URLs through the same `resolveImage()` registry the hero image uses, so a bare `![](foo.jpg)` resolves to the build-hashed asset URL. Without it, body image filenames point at a path Vite never serves.
- **PDF embeds:** `<PdfDoc>` (`src/components/PdfDoc.tsx`) renders a PDF as an inline paged viewer using `react-pdf` (PDF.js) — one page at a time, no transition animation; flip via the left/right click zones over the page, the Prev/Next buttons, or arrow keys when the page is focused. `pdfjs-dist` is pinned to the exact version `react-pdf` depends on (worker/API version must match), and the worker is loaded via `new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url)` so Vite emits it base-aware. `Post.tsx` `React.lazy`-loads `PdfDoc` behind a `Suspense` fallback, so the ~1 MB react-pdf/PDF.js code only downloads on posts that actually embed a PDF (the feed and text-only posts stay light).
- **Date-based publishing:** only posts with `date <= today` (local date) appear. A future-dated post simply won't show until that day.
- **Day numbering:** unpinned published posts get `dayNumber` in chronological order. `pinned: true` posts skip numbering (shown as "Intro"), stay at the top of the feed, and are excluded from day counting. Prev/next adjacency (`getAdjacentPosts`) runs over *all* published posts chronologically, including pinned.
- Slug comes from the filename: `YYYY-MM-DD-the-slug.md` -> `the-slug`. Routes are flat: `/` (Home) and `/:slug` (Post).
- **Reading time:** computed from the body word count (~225 wpm). An optional `reading_time` front-matter field (minutes) overrides it via `resolveReadingMinutes` — necessary for PDF-heavy posts, since the embed's text isn't in the Markdown body. Missing/blank/non-positive values fall back to the computed estimate.

### Writing a post

Add `content/writing/YYYY-MM-DD-the-slug.md` with front matter (`title`, `description`, `date`, `pinned`, optional `image`, `image_caption`, `reading_time`).

**Images:** drop the file in `content/images/`, then reference it in front matter by filename — with or without extension (e.g. `image: "vice-city-3.png"` or `image: "vice-city-3"`). No registration step: `src/lib/images.ts` globs the folder at build time and keys each image by both forms. A name with no matching file renders no image. The same filenames work inline in the body via `![alt](vice-city-3.png)`.

**PDF embeds:** drop a `.pdf` in `content/documents/` and embed it at any point in the body with `:::pdf <filename>` on its own line (extension optional). It renders as an inline paged viewer (click the page's left/right side, the Prev/Next buttons, or arrow keys). A name with no matching file shows a "Document not found" notice. See `content/writing/_formatting-guide.md` for the author-facing reference.

## BASE_PATH (important and easy to break)

The same build serves at the root locally but under `/summer-2026/` in production. `BASE_PATH` (env var, default `/`) drives three things that must agree:

- Vite `base` in `vite.config.ts` (controls emitted asset URLs).
- The wouter `<Router base>` in `src/App.tsx` (derived from `import.meta.env.BASE_URL`).
- Netlify's publish staging (see below).

Local dev/build need no env vars. Netlify sets `BASE_PATH=/summer-2026/`. `PORT` is also overridable via env. If links or assets 404 only in production, suspect a `BASE_PATH` mismatch. The PDF.js worker is one such asset — it's loaded via `new URL(..., import.meta.url)` so Vite makes it base-aware automatically, but if PDFs render in dev (root) yet fail only in production, the worker URL is the first place to look. `vite.config.ts` also forces PDFs to never inline (`assetsInlineLimit`), so they always emit as real fetchable files for PDF.js to stream.

## Deploy (Netlify)

Config is in `netlify.toml`. The build runs the Vite build with `BASE_PATH=/summer-2026/`, then copies `dist/public` into `netlify-publish/summer-2026/` so the served URL `/summer-2026/index.html` matches Vite's `/summer-2026/assets/...` paths. SPA routes under `/summer-2026/*` fall back to the shell; bare `/` 302-redirects to `/summer-2026/`.

Because publishing is date-gated, `.github/workflows/daily-rebuild.yml` pings a Netlify build hook every morning (06:00 UTC) so newly date-eligible posts go live without a manual deploy. It requires the `NETLIFY_DEPLOY_HOOK` repo secret.

## Dependencies / security

- `pnpm-workspace.yaml` sets `minimumReleaseAge: 1440` (npm packages must be ≥1 day old before install) as a supply-chain defense. **Do not disable it.** Use the `minimumReleaseAgeExclude` allowlist only for trusted urgent cases.
- Shared dependency versions are pinned in the workspace `catalog:`; packages reference them as `"catalog:"`. React is pinned to an exact version there.
- This repo carries Replit heritage (several `@replit/vite-plugin-*` dev plugins). They are dev-only and gated on `REPL_ID`; they don't run in production builds.
