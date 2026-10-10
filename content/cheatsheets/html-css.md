---
title: HTML / CSS Essentials
topic: Frontend
tags: [html, css, layout]
date: 2026-10-02
---

# HTML / CSS Essentials

## Semantic HTML

Use tags that communicate meaning:

- `header`
- `main`
- `nav`
- `section`
- `article`
- `footer`

## CSS layout basics

- `display: flex;` for one-dimensional layouts
- `display: grid;` for two-dimensional layouts
- `gap` to control spacing
- `media queries` for responsive behavior

```css
.card {
  display: grid;
  gap: 12px;
  padding: 16px;
}

@media (max-width: 700px) {
  .card {
    grid-template-columns: 1fr;
  }
}
```
