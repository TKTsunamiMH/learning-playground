---
title: Markdown Cheatsheet
topic: Markdown & Mermaid
tags: [markdown, cheatsheet, reference]
date: 2026-10-26
---

# Markdown Cheatsheet

Quick reference for all essential Markdown syntax.

## Text formatting

| Syntax | Result |
|--------|--------|
| `*italic*` or `_italic_` | *italic* |
| `**bold**` or `__bold__` | **bold** |
| `***bold italic***` | ***bold italic*** |
| `` `code` `` | `code` |
| `~~strikethrough~~` | ~~strikethrough~~ |

## Headings

| Syntax | Result |
|--------|--------|
| `# Heading 1` | Largest heading (h1) |
| `## Heading 2` | Subheading (h2) |
| `### Heading 3` | Subheading (h3) |
| `#### Heading 4` | Subheading (h4) |
| `##### Heading 5` | Subheading (h5) |
| `###### Heading 6` | Smallest heading (h6) |

## Lists

| Syntax | Result |
|--------|--------|
| `- item` | Unordered list |
| `* item` | Unordered list |
| `+ item` | Unordered list |
| `1. item` | Ordered list |
| `   - nested` | Nested list |
| `- [ ] task` | Unchecked task |
| `- [x] task` | Checked task |

## Links and images

| Syntax | Result |
|--------|--------|
| `[text](url)` | Inline link |
| `[text](url "title")` | Link with title |
| `![alt](url)` | Image |
| `[ref][1]` then `[1]: url` | Reference link |

## Code

| Syntax | Purpose |
|--------|---------|
| `` `code` `` | Inline code |
| ` ```language ... ``` ` | Code block with syntax highlighting |
| ` ```mermaid ... ``` ` | Mermaid diagram |

## Blockquotes and rules

| Syntax | Result |
|--------|--------|
| `> quote` | Blockquote |
| `> > nested` | Nested blockquote |
| `---` | Horizontal rule |
| `***` | Horizontal rule |
| `___` | Horizontal rule |

## Tables

```markdown
| Left | Center | Right |
|:-----|:------:|------:|
| A    |   B    |    C  |
```

Alignment: `:---` (left), `:---:` (center), `---:` (right)

## Escaping

| Syntax | Result |
|--------|--------|
| `\*` | Literal * |
| `\#` | Literal # |
| `\\` | Literal \ |
| Use backslash before any special character to escape it |

## Special (GitHub-flavored)

| Syntax | Purpose |
|--------|---------|
| `@username` | Mention user |
| `#123` | Link to issue |
| `:emoji:` | Add emoji |
| `` ``` ``` `` (empty block) | Empty code block |
