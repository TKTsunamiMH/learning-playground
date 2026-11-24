---
term: Deferred execution
fullName: Lazy evaluation of LINQ queries
category: C# Language
tags: [csharp, linq, lazy, performance]
date: 2026-11-24
---

## In short
Deferred execution means LINQ queries don't run when you write them—they run when you enumerate the result.

## What it means for a C# developer
Most LINQ methods (`Where`, `Select`, `OrderBy`) return `IEnumerable<T>` and are lazy. The query builds up, but nothing executes until you iterate or call a terminal method (`ToList()`, `First()`, `Count()`, etc.).

This is powerful—you can chain transformations without intermediate allocations—but tricky if you're not aware.

```csharp
var odds = numbers.Where(x => x % 2 == 1);  // Nothing runs yet

var list = odds.ToList();  // NOW the query runs
```

## Example
```csharp
List<int> numbers = [1, 2, 3, 4, 5];
var evens = numbers.Where(x => x % 2 == 0);  // Deferred

numbers.Add(6);  // Add to source

var result = evens.ToList();  // Query runs now, sees all 5 items + 6 = [2, 4, 6]
```

If you enumerate the same query twice, it runs twice (wasteful). Use `.ToList()` to materialize once.

**Common mistake**: "Collection was modified" exception—materialize with `.ToList()` before modifying the source during iteration.

## Related terms
- [LINQ](/glossary/linq)
- [Lambda expression](/glossary/lambda-expression)
- [IEnumerable](/glossary/ienumerable)

