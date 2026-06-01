# Markdown Formatting Guide

A quick reference for writing posts in this blog. This file's name starts with
`_`, so the content pipeline ignores it — it lives here for reference but never
shows up on the site. Copy `_template.md` to start a real post.

Posts are rendered with **CommonMark + GitHub Flavored Markdown**, so everything
below works.

---

## Front matter

Every real post starts with a front-matter block between `---` fences:

```
---
title: "Your Title"
description: "One-line summary shown in the feed and previews."
date: 2026-06-01
pinned: false
image: "vice-city-1"
image_caption: "Optional caption shown under the hero image."
---
```

- **title** — the post title.
- **description** — short summary for the feed.
- **date** — `YYYY-MM-DD`. The post only goes live once this date is on or
  before today, so you can write ahead and let pieces publish themselves.
- **pinned** — `true` keeps the post at the top of the feed, labeled "Intro"
  instead of getting a day number. Leave `false` for normal posts.
- **image** — a filename from `content/images/`, with or without extension
  (`"vice-city-1"` or `"vice-city-1.png"` both work). Leave `""` for no image.
- **image_caption** — caption under the hero image.

The filename sets the URL: `2026-06-01-start-here.md` → `/start-here`.

---

## Inline formatting

| You write | You get |
|---|---|
| `*italic*` or `_italic_` | *italic* |
| `**bold**` or `__bold__` | **bold** |
| `***bold italic***` | ***bold italic*** |
| `~~strikethrough~~` | ~~strikethrough~~ |
| `` `inline code` `` | `inline code` |
| `[link text](https://example.com)` | a link |

Bare URLs like https://example.com turn into links automatically.

---

## Headings

```
# Heading 1
## Heading 2
### Heading 3
```

Headings render in the display font, extra-bold. Your post `title` is already
shown at the top, so start in-body headings at `##` if you use them.

---

## Paragraphs and line breaks

Separate paragraphs with a blank line. A single line break inside a paragraph is
ignored — leave a blank line to start a new one.

---

## Blockquotes (pull-quotes)

```
> This renders as an italic, hot-pink-bordered pull-quote.
```

> This renders as an italic, hot-pink-bordered pull-quote.

This is the way to get the editorial pull-quote look — useful for emphasizing a
line.

---

## Lists

Bulleted:

```
- First
- Second
  - Nested item
```

Numbered:

```
1. First
2. Second
3. Third
```

Task lists:

```
- [ ] Not done
- [x] Done
```

---

## Links and images

Link:

```
[link text](https://example.com)
```

Image (inline, in the body of a post):

```
![alt text](image-filename.png)
```

For the **hero image** at the top of a post, use the `image` field in front
matter instead — don't put it in the body. Drop image files into
`content/images/` and reference them by filename. Images render with a black
border and an offset drop shadow.

---

## Code

Inline: `` `like this` `` renders as a bordered pill.

Fenced block (optionally name the language for context):

````
```js
const x = 1;
```
````

---

## Tables

```
| Column A | Column B |
|----------|----------|
| cell     | cell     |
| cell     | cell     |
```

---

## Horizontal rule

Three dashes on their own line make a divider:

```
---
```

---

## Raw HTML

Raw HTML passes through untouched if you ever need something Markdown can't do —
but plain Markdown covers almost everything, so reach for it only when needed.

---

## Quick reminders

- Name a file starting with `_` (like this one) to keep it out of the site.
- Future `date` = scheduled post; it appears on its own on that day.
- Start a new post by copying `_template.md`.
