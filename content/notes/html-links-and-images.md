---
title: HTML Links and Images
topic: HTML
tags: [html, links, media]
date: 2026-10-12
---

# HTML Links and Images

Links and images are the main way a page connects to other content and visual media. They help users move between pages, downloads, and resources while also making content more informative and engaging. Clear paths and helpful alt text keep pages usable for everyone.

## Links and images

- `<a>` creates a link; use relative or absolute paths.
- `target="_blank"` opens a new tab, while `rel="noopener noreferrer"` improves safety.
- `<img>` loads an image; use `alt` text for accessibility and `width`/`height` for sizing.
- `<figure>` and `<figcaption>` group an image with a caption.

```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  Visit Example
</a>

<a href="./about.html">About this site</a>

<img
  src="images/team.jpg"
  alt="A group of students working together"
  width="640"
  height="400"
/>

<figure>
  <img src="images/diagram.png" alt="Flowchart for the project" width="400" height="250" />
  <figcaption>Project workflow overview</figcaption>
</figure>
```

## Common mistakes

- Using a broken relative path that does not match the file structure.
- Leaving the `alt` attribute empty on meaningful images instead of writing a useful description.
- Opening links in a new tab without considering the user’s context or adding `rel`.

## Quick recap

- Use relative paths for local pages and absolute paths for external sites.
- Add clear `alt` text for images that convey meaning.
- Use `target` and `rel` intentionally when opening new tabs.
- Wrap images with captions using `<figure>` and `<figcaption>`.
