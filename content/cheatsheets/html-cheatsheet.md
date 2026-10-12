---
title: HTML Cheatsheet
topic: HTML
tags: [html, reference, cheat-sheet]
date: 2026-10-12
---

# HTML Cheatsheet

## Document structure

| Element / attribute | Purpose | Example |
| --- | --- | --- |
| `<!DOCTYPE html>` | Tells the browser to use HTML5. | `<!DOCTYPE html>` |
| `<html>` | Root element of the page. | `<html lang="en">` |
| `<head>` | Metadata and linked assets. | `<head>...</head>` |
| `<body>` | Visible page content. | `<body>...</body>` |
| `<meta charset>` | Sets character encoding. | `<meta charset="UTF-8" />` |
| `<meta name="viewport">` | Improves mobile rendering. | `<meta name="viewport" content="width=device-width, initial-scale=1.0" />` |
| `<title>` | Browser tab title. | `<title>My Page</title>` |
| `<link>` | Connects a stylesheet. | `<link rel="stylesheet" href="styles.css" />` |
| `<script>` | Loads JavaScript. | `<script src="app.js"></script>` |

## Text and content

| Element / attribute | Purpose | Example |
| --- | --- | --- |
| `<h1> ... <h6>` | Page and section headings. | `<h2>Notes</h2>` |
| `<p>` | Paragraph text. | `<p>Welcome.</p>` |
| `<strong>` | Important text. | `<strong>Important</strong>` |
| `<em>` | Emphasized text. | `<em>carefully</em>` |
| `<br>` | Single line break. | `Line 1<br />Line 2` |
| `<ul>` / `<ol>` / `<li>` | Unordered and ordered lists. | `<ul><li>One</li></ul>` |
| `<blockquote>` | Longer quotation. | `<blockquote>Quote</blockquote>` |
| `<code>` | Inline code. | `<code>npm install</code>` |
| `<pre>` | Preserves whitespace for code blocks. | `<pre><code>...</code></pre>` |

## Links and media

| Element / attribute | Purpose | Example |
| --- | --- | --- |
| `<a>` | Link to another page or resource. | `<a href="/about.html">About</a>` |
| `href` | Destination URL. | `href="https://example.com"` |
| `target="_blank"` | Opens a link in a new tab. | `target="_blank"` |
| `rel="noopener noreferrer"` | Improves safety for external links. | `rel="noopener noreferrer"` |
| `<img>` | Displays an image. | `<img src="photo.jpg" alt="A cat" />` |
| `alt` | Accessible text for image meaning. | `alt="A cat sleeping"` |
| `width` / `height` | Set image dimensions. | `width="300" height="200"` |
| `<figure>` / `<figcaption>` | Group image with a caption. | `<figure>...<figcaption>Caption</figcaption></figure>` |

## Forms

| Element / attribute | Purpose | Example |
| --- | --- | --- |
| `<form>` | Wraps form controls. | `<form>...</form>` |
| `<label>` | Labels form controls. | `<label for="email">Email</label>` |
| `<input>` | Collects text, numbers, dates, etc. | `<input type="email" />` |
| `type` | Input format or behavior. | `type="password"` |
| `placeholder` | Example text inside the field. | `placeholder="you@example.com"` |
| `required` | Makes a field mandatory. | `required` |
| `value` | Sets default value. | `value="Hello"` |
| `<textarea>` | Multi-line text box. | `<textarea rows="4"></textarea>` |
| `<select>` / `<option>` | Drop-down list. | `<select><option>HTML</option></select>` |
| `<button>` | Submit or trigger action. | `<button type="submit">Send</button>` |

## Tables

| Element | Purpose | Example |
| --- | --- | --- |
| `<table>` | Starts a table. | `<table>...</table>` |
| `<thead>` | Header row group. | `<thead><tr><th>Item</th></tr></thead>` |
| `<tbody>` | Main table data. | `<tbody>...</tbody>` |
| `<tr>` | Table row. | `<tr>...</tr>` |
| `<th>` | Header cell. | `<th>Product</th>` |
| `<td>` | Normal cell. | `<td>$10</td>` |

## Attributes and accessibility

| Attribute / pattern | Purpose | Example |
| --- | --- | --- |
| `id` | Unique element identifier. | `id="hero"` |
| `class` | Shared styling or grouping. | `class="card featured"` |
| `data-*` | Custom data attributes. | `data-status="active"` |
| `aria-label` | Accessible name for unlabeled controls. | `aria-label="Close menu"` |
| `tabindex` | Keyboard focus order. | `tabindex="0"` |
| `alt` | Meaningful description for images. | `alt="Person holding a laptop"` |

## Quick rules

- Use semantic elements instead of generic wrappers when they fit.
- Keep labels connected to inputs for accessibility.
- Use tables only for real tabular data.
- Write meaningful `alt` and `aria-label` text.
- Prefer clear structure, simple markup, and useful text over visual tricks.
