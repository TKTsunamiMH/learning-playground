---
title: HTML Attributes and Accessibility
topic: HTML
tags: [html, accessibility, attributes]
date: 2026-10-12
---

# HTML Attributes and Accessibility

Attributes provide extra information about elements and help control behavior, styling, and accessibility. They let you identify pieces of markup, connect scripts, and make the page easier to use with assistive technology. Good attribute choices improve clarity without making the code noisy.

## Useful attributes

- `id`: unique element identifier.
- `class`: shared styling or grouping.
- `data-*`: custom data for scripts or tooling.
- `aria-label`: accessible name when visible text is missing.
- `alt`: text for images that convey meaning.
- `tabindex`: controls focus order for keyboard users.

```html
<button id="save-button" class="primary-button" aria-label="Save changes" tabindex="0">
  Save
</button>

<img src="icons/check.svg" alt="Completed task" />

<div id="stats" class="card" data-status="ready"></div>
```

## Basic accessibility rules

- Use meaningful labels and visible text whenever possible.
- Give interactive elements a clear focus state and keyboard support.
- Avoid using `tabindex` to create a custom focus order unless it is necessary.
- Keep `alt` text useful and specific for informative images.

## Common mistakes

- Reusing the same `id` value on multiple elements.
- Adding `aria-label` when visible text already describes the control well.
- Leaving `alt` blank on images that provide important information.

## Quick recap

- Use `id` for unique references and `class` for shared styling.
- Use `data-*` for custom metadata.
- Use `aria-label` when a visible label is missing or insufficient.
- Provide meaningful `alt` text and a sensible `tabindex` for keyboard users.
