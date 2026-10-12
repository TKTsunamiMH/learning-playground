---
title: HTML Tables
topic: HTML
tags: [html, tables, data]
date: 2026-10-12
---

# HTML Tables

Tables are used to display data in rows and columns, such as schedules, pricing, or comparisons. They are especially useful when the information has a clear structure and needs to be read across columns and rows. When used carefully, tables make data easier to scan.

## Table structure

- `<table>`: the whole table.
- `<thead>`: the header row group.
- `<tbody>`: the main body of data.
- `<tr>`: a table row.
- `<th>`: a header cell.
- `<td>`: a regular data cell.

```html
<table>
  <thead>
    <tr>
      <th>Course</th>
      <th>Level</th>
      <th>Duration</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>HTML</td>
      <td>Beginner</td>
      <td>2 hours</td>
    </tr>
    <tr>
      <td>CSS</td>
      <td>Beginner</td>
      <td>3 hours</td>
    </tr>
  </tbody>
</table>
```

## When not to use tables

Avoid tables for page layout. They are harder to adapt to mobile screens and can create a poor reading experience for assistive technology. Use CSS layout tools like flexbox or grid for page structure instead.

## Common mistakes

- Using tables for page layout instead of data display.
- Skipping `<thead>` or using inconsistent row structure.
- Adding too many nested cells without clear headings.

## Quick recap

- Use tables for data, not page layout.
- Use `<thead>` for headers and `<tbody>` for content rows.
- Use `<th>` for column names and `<td>` for values.
- Keep tables simple and easy to read.
