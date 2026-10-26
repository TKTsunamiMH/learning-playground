---
title: Markdown Lists and Links
topic: Markdown & Mermaid
tags: [markdown, lists, links, images]
date: 2026-10-26
---

# Markdown Lists and Links

Lists organize information in a scannable format, while links and images connect your content to resources. Markdown supports ordered, unordered, and nested lists, plus task lists for tracking progress. Links can be inline, reference-style, or point to images.

## Unordered lists

Use `-`, `*`, or `+` to create bullet points. All three symbols work the same way.

```markdown
- Item one
- Item two
- Item three

* Asterisk item
+ Plus item
```

## Ordered lists

Use numbers followed by a period. The exact numbers do not matter; Markdown automatically numbers them in order.

```markdown
1. First item
2. Second item
3. Third item

1. First
1. Second
1. Third
```

## Nested lists

Indent nested items with spaces (usually 2 or 4) to create sub-lists. You can mix ordered and unordered.

```markdown
1. First item
   - Nested bullet
   - Another nested
2. Second item
   1. Nested ordered
   2. Another ordered
```

## Task lists

Use `- [ ]` for unchecked tasks and `- [x]` for completed ones (GitHub-flavored Markdown).

```markdown
- [x] Completed task
- [ ] Incomplete task
- [ ] Another task
```

## Inline links

Use `[link text](url)` or add a title with `[link text](url "title")`.

```markdown
[OpenAI](https://openai.com)
[GitHub](https://github.com "Visit GitHub")
```

## Reference-style links

Define links separately and reference them by name or number. Useful for documents with many links.

```markdown
[Click here][ref1] for more info.
[Another link][ref2].

[ref1]: https://example.com
[ref2]: https://example.org "Example title"
```

## Images

Syntax is similar to links with an exclamation mark: `![alt text](image-url)`.

```markdown
![Alt text for image](https://example.com/image.png)
![Logo](./images/logo.svg "Logo title")
```

## Common mistakes

- Forgetting spaces in lists; `- Item` works, but `-Item` does not.
- Using inconsistent list markers; pick one style per list.
- Missing `[alt text]` for images makes them inaccessible; always describe the image.

## Quick recap

- Unordered: `-`, `*`, or `+`
- Ordered: `1.`, `2.`, etc.
- Nested: indent with 2–4 spaces
- Task lists: `- [ ]` and `- [x]`
- Links: `[text](url)` or reference-style
- Images: `![alt](url)`
