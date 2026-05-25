# Summer Writing '26

Thirty pieces in thirty days — a static blog that renders Markdown posts. New
writing becomes visible automatically once its date arrives.

The site is a Vite + React single-page app living in
[`summer-2026`](summer-2026). Posts are plain Markdown files
read at build time, so there is no server or database to run.

## Requirements

- Node.js 20.19+ (22 recommended)
- pnpm 10 (`corepack enable` will pick up the version pinned in `package.json`)

## Run locally

```bash
pnpm install
pnpm dev          # http://localhost:5173/
```

`pnpm dev` is a shortcut for `pnpm --filter @workspace/summer-2026 run dev`.
Locally the site is served at the root (`/`); `PORT` and `BASE_PATH` can be
overridden via env vars if needed.

## Build

```bash
pnpm build        # builds the site to summer-2026/dist/public
```

To reproduce the production build exactly (served under `/summer-2026/`):

```bash
BASE_PATH=/summer-2026/ pnpm --filter @workspace/summer-2026 run build
pnpm --filter @workspace/summer-2026 run serve   # preview the built site
```

## Writing posts

Add a Markdown file to `content/writing/` named
`YYYY-MM-DD-the-slug.md` with front matter:

```markdown
---
title: On giving up on a novel
description: A short summary used in previews and meta tags.
date: 2026-05-24
pinned: false
image: "vice-city-1"               # optional — a registry key, not a path
image_caption: Optional caption    # optional
---

Body in Markdown...
```

- A post is published once its `date` is on or before today.
- `pinned: true` keeps a post at the top and excludes it from day numbering.
- Files starting with `_` (e.g. `_template.md`) are ignored.
- If `content/writing/` has no real posts yet, the site falls back
  to the samples in `content/examples/`.
- `image` is **not** a file path — it is a key into the image registry in
  [`summer-2026/src/lib/images.ts`](summer-2026/src/lib/images.ts).
  To use a new image, drop the file in
  `summer-2026/src/assets/`, import it in `images.ts`, and add it to
  `IMAGE_REGISTRY` under a short key, then reference that key here. An
  unregistered key renders no image.

## Deploy (Netlify)

Configuration lives in [`netlify.toml`](netlify.toml). It builds the site with
`BASE_PATH=/summer-2026/`, stages the output under a `summer-2026/` subfolder,
and serves the site at `/summer-2026/` (the root path 302-redirects there).

Because posts go live based on their date, a scheduled GitHub Action
([`.github/workflows/daily-rebuild.yml`](.github/workflows/daily-rebuild.yml))
pings a Netlify build hook each morning so newly date-eligible posts appear
without a manual deploy. Set the `NETLIFY_DEPLOY_HOOK` repository secret to
enable it (see the workflow file for setup steps).
