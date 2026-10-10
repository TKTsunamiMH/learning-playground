# dev-playground

A personal learning website for notes, cheat sheets, and quick references built with Vite + React + TypeScript.

## Features

- Notes stored as Markdown files in `content/notes` with frontmatter
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

The site reads new files automatically without code changes.
