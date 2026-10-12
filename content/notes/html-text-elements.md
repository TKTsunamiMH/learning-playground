---
title: HTML Text Elements
topic: HTML
tags: [html, text, headings]
date: 2026-10-12
---

# HTML Text Elements

HTML text elements give meaning and structure to written content. They help readers scan pages, and they also help assistive technology understand the content hierarchy. Good text structure makes a page easier to read and more accessible.

## Core text elements

- Headings: `<h1>` to `<h6>` for page structure.
- Paragraphs: `<p>` for blocks of text.
- Bold and emphasis: `<strong>` and `<em>`.
- Line breaks: `<br>` for a single break.
- Lists: `<ul>`, `<ol>`, and `<li>`.
- Quotes: `<blockquote>` for long quotations.
- Code: `<code>` for inline code and `<pre>` for multi-line blocks.

```html
<h1>Study Guide</h1>
<h2>Key ideas</h2>
<p>HTML helps organize content with <strong>meaning</strong> and <em>structure</em>.</p>
<p>Use a line break<br />when needed.</p>

<ul>
  <li>Read the notes</li>
  <li>Practice with examples</li>
</ul>

<ol>
  <li>Start small</li>
  <li>Test often</li>
</ol>

<blockquote>
  “The best way to learn HTML is to write small examples and check them in a browser.”
</blockquote>

<pre><code>const message = "hello";
console.log(message);</code></pre>
```

## Common mistakes

- Using headings only for visual size instead of actual document structure.
- Putting all text in one giant paragraph instead of separating ideas.
- Using `<br>` for spacing between blocks; use margins and layout styling instead.

## Quick recap

- Use headings to show document structure.
- Use paragraphs for blocks of related text.
- Use `<strong>` and `<em>` for emphasis, not just visual styling.
- Use lists for grouped items and `<blockquote>` for quoted text.
- Use `<pre><code>` for code samples.
