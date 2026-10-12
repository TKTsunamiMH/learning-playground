---
title: HTML Document Structure
topic: HTML
tags: [html, structure, document]
date: 2026-10-12
---

# HTML Document Structure

Every HTML page starts with a document skeleton that tells the browser how to read it. The `doctype`, `<html>`, `<head>`, and `<body>` elements create a predictable structure, and metadata helps with encoding and mobile layout. Using the right structure makes pages easier to maintain and more accessible.

## Key parts

- `<!DOCTYPE html>`: tells the browser to use HTML5.
- `<html lang="en">`: root element for the page.
- `<head>`: metadata and links to styles or scripts.
- `<body>`: visible page content.
- `<meta charset="UTF-8">`: sets the character encoding.
- `<meta name="viewport" ...>`: helps mobile screens render correctly.
- `<title>`: shows the browser tab text.
- `<link>` and `<script>`: load CSS and JavaScript.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Notes</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <h1>Hello</h1>
    <script src="app.js"></script>
  </body>
</html>
```

## Common mistakes

- Putting visible content in the `<head>` instead of the `<body>`.
- Forgetting the `<meta charset="UTF-8">` tag, which can cause weird characters.
- Loading scripts before the DOM is ready when the script depends on page elements.

## Quick recap

- Keep the page skeleton consistent.
- Put metadata in `<head>`.
- Put visible content in `<body>`.
- Use `<title>`, `<meta>`, `<link>`, and `<script>` intentionally.
