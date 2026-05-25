# Summer Writing Site — Implementation Plan

## Project Overview

A neo-brutalist website for a summer writing challenge. The site publishes one piece of writing per day throughout the summer, rendered from markdown files stored in a GitHub repository. The site should feel standalone now but is architected to slot into a broader writing presence later.

---

## URL Structure

- **Domain:** `amiralsad.blog` (owned by the client)
- **Subdomain:** `writing.amiralsad.blog`
- **Summer writing path:** `writing.amiralsad.blog/summer-2026`

The subdomain `writing.amiralsad.blog` does not need a landing page at this time. It may receive one later as a hub for multiple writing projects. For now, only the `/summer-2026` path needs to be built.

Individual pieces live at `writing.amiralsad.blog/summer-2026/[slug]`, where the slug is derived from the markdown filename.

---

## Design System

The visual design follows a neo-brutalist aesthetic. The full design system (colors, typography, spacing, component specs) is documented separately and available to the team via an exported Claude Design file.

---

## Content Management

All content lives in the project's GitHub repository as markdown files within a single folder (e.g., `content/summer-2026/`).

### Filename Convention

Each file is prefixed with its intended publication date:

```
2026-06-01-what-this-is-and-why.md
2026-06-02-the-design-choice.md
2026-06-03-another-piece.md
```

### Frontmatter Schema

Each markdown file begins with YAML frontmatter:

```yaml
---
title: "What This Is and Why"
description: "A longer explanation that elaborates on the title. Titles will tend to be dramatic and eye-catching; the description grounds them."
date: 2026-06-01
pinned: false
---
```

The `pinned` field is `true` only for the introductory piece (explaining the challenge, its purpose, etc.), which should always appear at the top of the landing page feed regardless of scroll position or date ordering.

### Date-Based Rendering

The site must only render pieces whose `date` is on or before the current date. Even if markdown files for future dates exist in the repository, they should not be accessible — neither on the landing page feed nor via direct URL. This is the core publishing mechanism: content is "released" by the passage of time, not by a manual action.

---

## Pages & Layouts

### Landing Page (`/summer-2026`)

The landing page consists of four elements in this order:

1. **Title** — the name of the summer writing project.
2. **Description** — a short paragraph explaining what this is.
3. **Topics component** — a distinct, interactive element (not styled like a blog post) that links to a dedicated page or opens a modal/overlay. It lists the topics the author plans to write about and which have already been written. Topics with published pieces should link to them.
4. **Piece feed** — a vertical scroll of published pieces, ordered by date (newest first). The introductory/first piece is pinned to the top of this feed regardless of its date. Each item in the feed should display at minimum the title, description, date, and reading time, and link to the full piece.

### Blog Post Page (`/summer-2026/[slug]`)

Each piece follows a consistent layout:

1. **Date**
2. **Title**
3. **Description** — the elaborating subtitle
4. **Reading time estimate**
5. **Body content** — rendered from markdown

All content runs down a centered column, leaving generous empty space on either side. Target a line length of roughly 55–70 characters for the body text to optimize readability.

At the bottom of each post:

6. **Previous / Next navigation** — links to the adjacent published pieces (by date). The first piece has no "previous" link; the most recent piece has no "next" link. Only link to pieces that are published (date ≤ today).

### Persistent Navigation

Every page should include a persistent, accessible way to return to the landing page. This can be the site title in a header bar or a fixed link — whatever suits the design system. The reader should never feel stranded.

---

## Computed Metadata

### Reading Time

Calculate reading time from the markdown body (excluding frontmatter). Use a standard average of ~200–250 words per minute. Round to the nearest minute, with a minimum of "1 min read."

This value should appear on both the landing page feed items and the individual post pages.

---

## Deployment & Hosting

- **Platform:** Netlify (free tier)
- **Repository:** GitHub
- **Build trigger:** Netlify deploy hook triggered by a scheduled GitHub Action

### Daily Rebuild

A GitHub Actions workflow runs on a cron schedule (once daily, early morning in the author's timezone). It calls the Netlify deploy hook URL, which triggers a fresh build. During the build, the date filter is applied: only markdown files with `date ≤ today` are rendered into pages.

This is the mechanism by which new pieces "go live" — no manual publish step is needed.

The deploy hook URL should be stored as a GitHub Actions secret, not committed to the repository.

### Manual Deploys

Pushes to the main branch should also trigger a Netlify build (standard Netlify-GitHub integration). This covers cases where the author pushes content updates, bug fixes, or design changes that should go live immediately.

---

## Accessibility & Standards

These are baseline requirements, not features to add later:

- **Semantic HTML** — use appropriate elements (`article`, `nav`, `main`, `header`, `time`, etc.) rather than generic `div` wrappers.
- **Sufficient color contrast** — verify against WCAG AA standards, particularly given the neo-brutalist aesthetic which may use bold colors.
- **Keyboard navigation** — all interactive elements (links, the topics component, prev/next navigation) must be reachable and operable via keyboard.
- **Meta tags** — each page should have appropriate `title`, `description`, and Open Graph tags so that shared links render well in messaging apps and social platforms. Use the post's title and description from frontmatter.

---

## Out of Scope

The following were explicitly considered and excluded:

- Tags or categories (the topics component serves this purpose)
- RSS feed
- Social sharing buttons or link copying
- Comments or reader interaction
- Analytics
- CMS or admin interface
- Landing page for the parent subdomain (`writing.amiralsad.blog`)
