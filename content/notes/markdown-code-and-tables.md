---
title: Markdown Code and Tables
topic: Markdown & Mermaid
tags: [markdown, code, tables]
date: 2026-10-26
---

# Markdown Code and Tables

Code and structured data are central to technical documentation. Markdown provides inline code for brief snippets, fenced code blocks for longer examples, and tables for organizing information side-by-side.

## Inline code

Wrap code with backticks to display inline. Use backticks without spaces for better readability.

```markdown
Use `const x = 42;` in JavaScript.
Use `npm install` to add packages.
```

## Fenced code blocks

Use three backticks (` ``` `) or three tildes (`~~~`) with an optional language name. The language enables syntax highlighting.

```markdown
\`\`\`javascript
function greet(name) {
  return `Hello, ${name}!`;
}
\`\`\`

\`\`\`python
def greet(name):
    return f"Hello, {name}!"
\`\`\`

\`\`\`
Plain text code block without highlighting.
\`\`\`
```

## Tables

Use pipes `|` and hyphens `-` to create tables. Colons in the separator control alignment.

```markdown
| Left | Center | Right |
|:-----|:------:|------:|
| A    |   B    |    C  |
| 1    |   2    |    3  |
```

Rendered:

| Left | Center | Right |
|:-----|:------:|------:|
| A    |   B    |    C  |
| 1    |   2    |    3  |

### Table alignment

- `:---` for left align (default)
- `:---:` for center align
- `---:` for right align

## Escaping special characters

Use a backslash `\` to escape Markdown special characters like `*`, `#`, `[`, etc.

```markdown
\*not italic\*
\[not a link\]
\# not a heading
```

## Common mistakes

- Forgetting backticks around inline code; `const x` renders as regular text without them.
- Table alignment uses colons in the separator row, not the data rows.
- Escaping only works with certain characters; unknown escapes are rendered literally.

## Quick recap

- Inline code: `` `code` ``
- Code blocks: ` ``` language` ... ` ``` `
- Tables: use `|` and `-`, add colons for alignment
- Escape special characters with `\`
- Language name after opening backticks enables syntax highlighting
