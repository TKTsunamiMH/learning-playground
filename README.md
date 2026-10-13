# dev-playground

A personal learning website for notes, cheat sheets, and quick references built with Vite + React + TypeScript.

## Features

- Notes stored as Markdown files in `content/notes` with frontmatter
- Topic-based notes navigation with automatic topic discovery
- Cheat sheets stored in `content/cheatsheets`
- Instant client-side search with topic and tag filtering
- Copy button for code blocks
- Favorites saved in localStorage
- Dark/light mode with browser persistence
- Responsive layout for desktop and mobile
- GitHub Pages deployment workflow included

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Deploying to GitHub Pages

1. Push the repository to GitHub.
2. In the repository settings, enable GitHub Pages using the GitHub Actions deployment method.
3. The workflow in `.github/workflows/deploy.yml` will build and deploy the site automatically when changes are pushed to `main`.

## Adding new content

Create a markdown file inside one of the content folders:

- `content/notes/*.md`
- `content/cheatsheets/*.md`

Each file uses frontmatter like:

```md
---
title: My Note
topic: Frontend
tags: [react, javascript]
date: 2026-10-10
---
```

Notes are grouped by `topic` automatically. Any new topic name appears on the `/notes` overview without code changes.

### Notes structure

- `/notes` shows topic cards with note counts.
- `/notes/:topic` shows all notes for that topic.
- `/notes/:topic/:slug` shows the note detail view.

### Optional topic metadata

You can customize topic cards with optional metadata in `content/topics.json`:

```json
[
  {
    "name": "HTML",
    "description": "Core HTML structure and semantics.",
    "icon": "🌐",
    "sortOrder": 10
  }
]
```

- `name` must match the note frontmatter `topic` exactly.
- `description`, `icon`, and `sortOrder` are optional.
- Topics not listed still work with default display values.
