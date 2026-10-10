---
title: React Router Basics
topic: React
tags: [react, routing, spa]
date: 2026-10-03
---

# React Router Basics

React Router lets a single-page app keep browser history and page-like navigation without reloading the whole page.

## Why it matters

- URL changes reflect the current screen.
- Back and forward browser buttons keep working.
- Routes can be nested and organized by feature.

```tsx
import { Routes, Route } from 'react-router-dom';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/notes/:slug" element={<NoteDetailPage />} />
    </Routes>
  );
}
```

## Good habits

Use descriptive route names and keep route logic lightweight. Components should handle rendering, while data loading can live in a helper module.
