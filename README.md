# Summer Writing '26

A piece for every day of the summer — a static blog that renders Markdown
posts. New writing becomes visible automatically once its date arrives.

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
image: "vice-city-1"               # optional — a file in content/images/
image_caption: Optional caption    # optional
reading_time: 45                   # optional — overrides the auto estimate
---

Body in Markdown...
```

- A post is published once its `date` is on or before today.
- `pinned: true` keeps a post at the top and excludes it from day numbering.
- `reading_time` (optional, minutes) overrides the auto "X min read" estimate,
  which is otherwise computed from the body word count. Set it when most of the
  piece lives in an embedded PDF the word count can't see; omit it otherwise.
- Files starting with `_` (e.g. `_template.md`) are ignored.
- If `content/writing/` has no real posts yet, the site falls back
  to the samples in `content/examples/`.
- `image` is a filename in [`content/images/`](content/images), with or
  without its extension (`"vice-city-1"` or `"vice-city-1.png"`). Drop the file
  in that folder and reference it here — there is no registration step;
  [`summer-2026/src/lib/images.ts`](summer-2026/src/lib/images.ts) globs the
  folder at build time. A name with no matching file renders no image.

### Inline images

Reference any image from `content/images/` directly in the body, by filename:

```markdown
![A caption](vice-city-1.png)
```

It resolves through the same registry as the hero image, so a bare filename
works (with or without extension) and renders with the bordered, offset-shadow
look. The hero image still goes in front matter — don't repeat it in the body.

### Embedding PDFs (essays, slides, talks)

Drop a `.pdf` into [`content/documents/`](content/documents) and embed it at any
point in a piece with a marker on its own line:

```markdown
Some prose introducing the essay...

:::pdf revolutionary-memory-essay

More prose, then the talk:

:::pdf revolutionary-memory-slides
```

The PDF renders as an inline paged viewer — one page at a time, with a page
counter and an "Open original PDF" link. Readers move between pages by clicking
the left/right side of the page, using the Prev / Next buttons, or the arrow
keys. The name is the filename with or without `.pdf`; a name with no matching
file shows a "Document not found" notice. Auto-discovered at build time by
[`summer-2026/src/lib/documents.ts`](summer-2026/src/lib/documents.ts), the same
way images are.

## Deploy (Netlify)

Configuration lives in [`netlify.toml`](netlify.toml). It builds the site with
`BASE_PATH=/summer-2026/`, stages the output under a `summer-2026/` subfolder,
and serves the site at `/summer-2026/` (the root path 302-redirects there).

Because posts go live based on their date, a scheduled GitHub Action
([`.github/workflows/daily-rebuild.yml`](.github/workflows/daily-rebuild.yml))
pings a Netlify build hook each morning so newly date-eligible posts appear
without a manual deploy. Set the `NETLIFY_DEPLOY_HOOK` repository secret to
enable it (see the workflow file for setup steps).
