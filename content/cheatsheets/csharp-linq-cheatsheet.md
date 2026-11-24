---
title: C# LINQ Cheatsheet
topic: C#
tags: [csharp, cheatsheet, linq, methods, queries, reference]
date: 2026-11-24
---

# C# LINQ Cheatsheet

Quick reference for LINQ methods, deferred vs immediate execution, and common errors. Requires `using System.Linq;` for all examples.

## Filtering

| Method | Purpose | Example | Returns |
|--------|---------|---------|---------|
| **Where** | Filter by condition | `list.Where(x => x > 5)` | `IEnumerable<T>` |
| **OfType<T>** | Filter by type | `mixed.OfType<string>()` | `IEnumerable<T>` |
| **Distinct** | Remove duplicates | `list.Distinct()` | `IEnumerable<T>` |
| **Take** | First N items | `list.Take(5)` | `IEnumerable<T>` |
| **Skip** | Skip first N items | `list.Skip(10)` | `IEnumerable<T>` |
| **TakeWhile** | Take while condition true | `list.TakeWhile(x => x < 10)` | `IEnumerable<T>` |
| **SkipWhile** | Skip while condition true | `list.SkipWhile(x => x < 10)` | `IEnumerable<T>` |

## Transformation

| Method | Purpose | Example | Returns |
|--------|---------|---------|---------|
| **Select** | Transform each item | `list.Select(x => x * 2)` | `IEnumerable<T>` |
| **SelectMany** | Flatten nested collections | `players.SelectMany(p => p.Items)` | `IEnumerable<T>` |
| **Cast<T>** | Convert to type | `list.Cast<int>()` | `IEnumerable<T>` |

## Sorting

| Method | Purpose | Example | Returns |
|--------|---------|---------|---------|
| **OrderBy** | Sort ascending | `list.OrderBy(x => x)` | `IOrderedEnumerable<T>` |
| **OrderByDescending** | Sort descending | `list.OrderByDescending(x => x)` | `IOrderedEnumerable<T>` |
| **ThenBy** | Secondary sort ascending | `list.OrderBy(x => x.A).ThenBy(x => x.B)` | `IOrderedEnumerable<T>` |
| **ThenByDescending** | Secondary sort descending | `list.OrderBy(x => x.A).ThenByDescending(x => x.B)` | `IOrderedEnumerable<T>` |
| **Reverse** | Reverse order | `list.Reverse()` | `IEnumerable<T>` |

## Grouping & Joining

| Method | Purpose | Example | Returns |
|--------|---------|---------|---------|
| **GroupBy** | Group by key | `list.GroupBy(x => x.Team)` | `IEnumerable<IGrouping<K, T>>` |
| **ToLookup** | Grouped dictionary | `list.ToLookup(x => x.Team)` | `ILookup<K, T>` |
| **Join** | Combine by key | `seq1.Join(seq2, k1, k2, result)` | `IEnumerable<T>` |
| **GroupJoin** | Join with grouping | `seq1.GroupJoin(seq2, k1, k2, result)` | `IEnumerable<T>` |
| **Zip** | Pair by position | `names.Zip(scores)` | `IEnumerable<T>` |
| **Concat** | Combine sequences | `seq1.Concat(seq2)` | `IEnumerable<T>` |
| **Union** | Combine, remove duplicates | `seq1.Union(seq2)` | `IEnumerable<T>` |
| **Intersect** | Common items | `seq1.Intersect(seq2)` | `IEnumerable<T>` |
| **Except** | Items in first, not second | `seq1.Except(seq2)` | `IEnumerable<T>` |

## Aggregation

| Method | Purpose | Example | Returns | Throws if empty? |
|--------|---------|---------|---------|------------------|
| **Count** | Count items | `list.Count()` or `list.Count(x => ...)` | `int` | No (returns 0) |
| **Sum** | Sum values | `list.Sum(x => x.Score)` | `T` | No (returns 0) |
| **Average** | Average value | `list.Average(x => x.Score)` | `double` | Yes |
| **Min** | Minimum value | `list.Min(x => x.Score)` | `T` | Yes |
| **Max** | Maximum value | `list.Max(x => x.Score)` | `T` | Yes |
| **MinBy** | Item with min value | `list.MinBy(x => x.Score)` | `T` | Yes |
| **MaxBy** | Item with max value | `list.MaxBy(x => x.Score)` | `T` | Yes |
| **Aggregate** | Custom aggregation | `list.Aggregate(0, (a, b) => a + b)` | `T` | Depends |

## Quantifiers & Checks

| Method | Purpose | Example | Returns |
|--------|---------|---------|---------|
| **Any** | Is there at least one? | `list.Any()` or `list.Any(x => ...)` | `bool` |
| **All** | Do all match? | `list.All(x => x > 0)` | `bool` |
| **Contains** | Is value in sequence? | `list.Contains(5)` | `bool` |

## Retrieving Items

| Method | If empty | If 1 match | If >1 match | When to use |
|--------|----------|-----------|-----------|-------------|
| **First** | Throws | Returns | Returns first | Expect ≥1; fail if empty |
| **FirstOrDefault** | Returns null/default | Returns | Returns first | May be empty |
| **Single** | Throws | Returns | Throws | Expect exactly 1 |
| **SingleOrDefault** | Returns null/default | Returns | Throws | Expect 0 or 1 |
| **Last** | Throws | Returns | Returns last | Want the last |
| **LastOrDefault** | Returns null/default | Returns | Returns last | Last item or default |
| **ElementAt** | Throws | Returns | Returns at index | Access by index |
| **ElementAtOrDefault** | Returns default | Returns | Returns at index | Safe index access |

## Conversion

| Method | Returns | Executes? | Purpose |
|--------|---------|-----------|---------|
| **ToList** | `List<T>` | ✓ Immediately | Materialize as list |
| **ToArray** | `T[]` | ✓ Immediately | Materialize as array |
| **ToDictionary** | `Dictionary<K, V>` | ✓ Immediately | Build dictionary (throws on duplicate keys) |
| **ToHashSet** | `HashSet<T>` | ✓ Immediately | Deduplicate into set |
| **ToLookup** | `ILookup<K, T>` | ✓ Immediately | Build grouped dictionary |
| **AsEnumerable** | `IEnumerable<T>` | ✗ Lazy | Cast to IEnumerable |

## Deferred vs Immediate Execution

### Deferred (lazy) – Query runs when you enumerate

```
Where, Select, SelectMany, OrderBy, GroupBy, Join, 
Concat, Union, Distinct, Take, Skip, Reverse, Zip
```

**Returns**: `IEnumerable<T>` or `IOrderedEnumerable<T>`

**When**: Query runs when you call `ToList()`, `foreach`, `First()`, etc.

### Immediate – Query runs now

```
ToList, ToArray, ToDictionary, ToHashSet, ToLookup,
Count, Sum, Average, Min, Max, First, Last, Single,
Any, All, Contains, ElementAt, Aggregate
```

**Returns**: Concrete value or collection

**When**: Runs right away; result is materialized

**Example:**
```csharp
var odds = numbers.Where(x => x % 2 == 1);       // Deferred, nothing runs yet
var list = odds.ToList();                         // Immediate, runs now
```

## Paging (Skip + Take)

```csharp
int pageSize = 10;
int pageNumber = 2;  // Page 2 (1-indexed)

var page = items
    .Skip((pageNumber - 1) * pageSize)
    .Take(pageSize)
    .ToList();

// Page 1: items 0–9
// Page 2: items 10–19 (Skip 10, Take 10)
// Page 3: items 20–29 (Skip 20, Take 10)
```

## Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| **CS1061** | Forgot `using System.Linq` | Add `using System.Linq;` |
| **InvalidOperationException** | `First()`, `Single()`, `Average()`, `Max()`, `Min()` on empty sequence | Use `FirstOrDefault()`, check with `Any()` first, or use `DefaultIfEmpty()` |
| **ArgumentException** | Duplicate keys in `ToDictionary()` | Use `GroupBy()` first, or use a unique key |
| **InvalidOperationException** | Modified collection while iterating with deferred LINQ | Materialize with `.ToList()` before the loop |
| **Multiple enumeration warning** | Enumerating same lazy query >1 time | Materialize with `.ToList()` once |
| **NullReferenceException** | Using result of `FirstOrDefault()` without null check | Check `if (result != null)` or use `result?.Property` |

## Common LINQ patterns

### Filter and project
```csharp
var result = list
    .Where(x => x.Score > 50)
    .Select(x => x.Name)
    .ToList();
```

### Group and aggregate
```csharp
var groups = list
    .GroupBy(x => x.Category)
    .Select(g => new { Category = g.Key, Count = g.Count() })
    .ToList();
```

### Sort and paginate
```csharp
var page = list
    .OrderBy(x => x.Name)
    .Skip(pageSize * (pageNumber - 1))
    .Take(pageSize)
    .ToList();
```

### Top N items
```csharp
var top5 = list
    .OrderByDescending(x => x.Score)
    .Take(5)
    .ToList();
```

### Check existence
```csharp
bool exists = list.Any(x => x.Id == 123);
bool allValid = list.All(x => x.Score >= 0);
```

## Setup

```csharp
// Always required for LINQ
using System.Linq;

// Common types
List<int> numbers = [1, 2, 3, 4, 5];
int[] array = [1, 2, 3, 4, 5];
IEnumerable<string> strings = new[] { "a", "b", "c" };
```

## Lambda refresher

```csharp
x => x > 5                    // "x such that x > 5"
(a, b) => a + b               // "a and b, their sum"
p => p.Score > 50             // "p such that p.Score > 50"
p => new { p.Name, p.Score }  // Transform to new object
```

## Max vs MaxBy, Min vs MinBy

```csharp
var highest = players.Max(p => p.Score);     // 100 (the value)
var topPlayer = players.MaxBy(p => p.Score); // Alice (the item)

var lowest = players.Min(p => p.Score);       // 50 (the value)
var worstPlayer = players.MinBy(p => p.Score); // Bob (the item)
```

## Links to detailed notes

- [LINQ Basics](/content/notes/csharp-linq-basics.md)
- [LINQ – Filtering & Projection](/content/notes/csharp-linq-filtering-and-projection.md)
- [LINQ – Sorting, Grouping & Joining](/content/notes/csharp-linq-sorting-grouping-and-joining.md)
- [LINQ – Aggregation & Quantifiers](/content/notes/csharp-linq-aggregation-and-quantifiers.md)
- [LINQ – Deferred Execution](/content/notes/csharp-linq-deferred-execution.md)
- [LINQ – In Practice](/content/notes/csharp-linq-in-practice.md)
- [Sorting Arrays and Lists](/content/notes/csharp-sorting.md)
- [Accessing Items](/content/notes/csharp-accessing-items.md)
