---
title: HTML Semantic Elements
topic: HTML
tags: [html, semantics, accessibility]
date: 2026-10-12
---

# HTML Semantic Elements

Semantic elements describe the purpose of content instead of only how it looks. They help screen readers, search engines, and developers understand the structure of a page more clearly. Using the right elements usually creates a cleaner and more accessible experience.

## Common semantic tags

- `<header>`: introductory content or page header.
- `<nav>`: main navigation links.
- `<main>`: primary page content.
- `<section>`: grouped content with a shared theme.
- `<article>`: self-contained content such as a blog post.
- `<aside>`: related or secondary content.
- `<footer>`: closing content such as contact or legal information.

```html
<header>
  <nav>
    <a href="#home">Home</a>
    <a href="#about">About</a>
  </nav>
</header>

<main>
  <article>
    <h1>Learning HTML</h1>
    <section>
      <h2>Why it matters</h2>
      <p>It gives structure to the content on the page.</p>
    </section>
  </article>

  <aside>
    <p>Tip: Keep your HTML readable and well organized.</p>
  </aside>
</main>

<footer>
  <p>© 2026 Example Site</p>
</footer>
```

## Common mistakes

- Using generic `<div>` elements everywhere when a semantic element would be clearer.
- Putting multiple unrelated sections inside a single `<main>` without structure.
- Using headings purely for styling instead of for document hierarchy.

## Quick recap

- Use semantic elements to describe content meaning, not just layout.
- `<main>` should contain the main page content.
- `<nav>`, `<header>`, and `<footer>` clarify page regions.
- Better semantics improve accessibility and SEO.
