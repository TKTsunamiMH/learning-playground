---
title: Markdown Basics
topic: Markdown & Mermaid
tags: [markdown, syntax, formatting]
date: 2026-10-26
---

# Markdown Basics

Markdown is a lightweight markup language that converts plain text into formatted HTML. It uses simple, human-readable symbols to indicate formatting without cluttering the document. Whether you're writing README files, blog posts, or notes, Markdown keeps content readable in both raw and rendered forms.

## Headings

Use `#` to create headings. One `#` for the largest heading (h1), two `##` for h2, and so on up to six `######` for h6.

```markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
```

## Paragraphs and line breaks

Paragraphs are separated by blank lines. A single line break does not create a new paragraph. For a hard line break, end a line with two spaces or use `<br>`.

```markdown
This is a paragraph.
This line is part of the same paragraph.

This is a new paragraph.

This has a  
hard line break.
```

## Text styling

Use `*asterisks*` or `_underscores_` for emphasis, `**double**` for strong, and `~~tildes~~` for strikethrough.

```markdown
This is *italic* or _italic_.
This is **bold** or __bold__.
This is ***bold italic***.
This is ~~strikethrough~~.
```

## Blockquotes

Use `>` to create a blockquote. You can nest them with multiple `>` symbols.

```markdown
> This is a blockquote.

> This is a blockquote.
> 
> > This is a nested blockquote.
```

## Horizontal rules

Use three or more hyphens `---`, asterisks `***`, or underscores `___` on a line to create a horizontal rule.

```markdown
---

***

___
```

## Common mistakes

- Using a single space between paragraphs—Markdown requires a blank line.
- Forgetting that line breaks don't work in Markdown without two trailing spaces or `<br>`.
- Mixing heading symbols inconsistently; stick to one style per document.

## Quick recap

- Headings: `#` through `######`
- Bold: `**text**`, italic: `*text*`, strikethrough: `~~text~~`
- Blockquotes: prefix with `>`
- Line breaks: two spaces at end of line or `<br>`
- Horizontal rules: `---`, `***`, or `___`
