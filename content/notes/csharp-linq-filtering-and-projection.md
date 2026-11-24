---
title: C# LINQ – Filtering and Projection
topic: C#
tags: [csharp, linq, where, select, selectmany, distinct, skip, take]
date: 2026-11-24
---

# C# LINQ – Filtering and Projection

Filtering narrows down data (keeping some items, discarding others). Projection transforms data (selecting specific properties or creating new objects). Together, they form the foundation of LINQ queries. See [LINQ Basics](/content/notes/csharp-linq-basics.md) for an introduction to LINQ.

## Where: filtering

`Where` keeps only items that match a condition:

```csharp
using System.Linq;

List<Player> players = new List<Player>
{
    new Player { Name = "Alice", Score = 100 },
    new Player { Name = "Bob", Score = 50 },
    new Player { Name = "Charlie", Score = 75 }
};

var highScorers = players.Where(p => p.Score > 60).ToList();
// Alice (100), Charlie (75)

Console.WriteLine(highScorers.Count);  // 2
```

### Combining conditions with && and ||

```csharp
// Multiple conditions with AND
var active = players
    .Where(p => p.Score > 50 && p.Name.StartsWith("A"))
    .ToList();
// Alice (100)

// Multiple conditions with OR
var topOrNamed = players
    .Where(p => p.Score > 90 || p.Name == "Bob")
    .ToList();
// Alice (100), Bob (50)
```

### Where with index

Access the index (0, 1, 2, ...) of each item:

```csharp
var withIndex = players
    .Where((p, index) => index < 2)  // First two
    .ToList();
// Alice, Bob

// Keep only odd-indexed items
var oddIndexed = players
    .Where((p, index) => index % 2 == 1)
    .ToList();
// Bob
```

## Select: projection

`Select` transforms each item, creating a new sequence:

### Select a single property

```csharp
var names = players.Select(p => p.Name).ToList();
// ["Alice", "Bob", "Charlie"]

var scores = players.Select(p => p.Score).ToList();
// [100, 50, 75]
```

### Select with index

```csharp
var withIndices = players
    .Select((p, index) => $"{index}: {p.Name}")
    .ToList();
// ["0: Alice", "1: Bob", "2: Charlie"]
```

### Create tuples (see [Tuples Basics](/content/notes/csharp-tuples-basics.md))

```csharp
var nameScorePairs = players
    .Select(p => (Name: p.Name, Score: p.Score))
    .ToList();

foreach (var (name, score) in nameScorePairs)
{
    Console.WriteLine($"{name}: {score}");
}
// Alice: 100
// Bob: 50
// Charlie: 75
```

### Create anonymous types

```csharp
var anon = players
    .Select(p => new { p.Name, p.Score })
    .ToList();

foreach (var item in anon)
{
    Console.WriteLine($"{item.Name}: {item.Score}");
}
// Alice: 100
// Bob: 50
// Charlie: 75
```

### Create new objects

```csharp
public class PlayerSummary
{
    public string Name { get; set; }
    public string Info { get; set; }
}

var summaries = players
    .Select(p => new PlayerSummary
    {
        Name = p.Name,
        Info = $"Score: {p.Score}"
    })
    .ToList();

Console.WriteLine(summaries[0].Info);  // Score: 100
```

## SelectMany: flatten nested collections

`SelectMany` flattens a sequence of sequences into a single sequence:

```csharp
public class Player
{
    public string Name { get; set; }
    public List<string> Items { get; set; }
}

List<Player> players = new List<Player>
{
    new Player { Name = "Alice", Items = new List<string> { "sword", "shield" } },
    new Player { Name = "Bob", Items = new List<string> { "bow" } }
};

// SelectMany: all items, flattened
var allItems = players.SelectMany(p => p.Items).ToList();
// ["sword", "shield", "bow"]

Console.WriteLine(allItems.Count);  // 3
```

### SelectMany with index

```csharp
var itemsWithPlayer = players
    .SelectMany(p => p.Items, (player, item) => $"{player.Name}: {item}")
    .ToList();
// ["Alice: sword", "Alice: shield", "Bob: bow"]
```

## Distinct, Take, Skip, and paging

### Distinct

Remove duplicates:

```csharp
int[] numbers = [1, 2, 2, 3, 3, 3, 4];
var unique = numbers.Distinct().ToList();
// [1, 2, 3, 4]

var uniqueNames = players.Select(p => p.Name).Distinct().ToList();
```

### Take

Take the first N items:

```csharp
var first2 = players.Take(2).ToList();
// Alice, Bob

var first2Names = players.Select(p => p.Name).Take(2).ToList();
// ["Alice", "Bob"]
```

### Skip

Skip the first N items:

```csharp
var afterFirst = players.Skip(1).ToList();
// Bob, Charlie

var afterFirst2 = players.Skip(2).ToList();
// Charlie
```

### Paging with Skip and Take

Implement pagination (e.g., 10 items per page):

```csharp
int pageSize = 10;
int pageNumber = 2;  // Page 2 (0-indexed: page 1)

var page = players
    .Skip((pageNumber - 1) * pageSize)
    .Take(pageSize)
    .ToList();

// Page 1: items 0–9
// Page 2: items 10–19 (Skip 10, Take 10)
```

### TakeWhile and SkipWhile

Take/skip while a condition is true:

```csharp
int[] numbers = [1, 2, 3, 4, 5, 3, 2, 1];

var whileSmall = numbers.TakeWhile(x => x < 4).ToList();
// [1, 2, 3] (stops at 4)

var afterSmall = numbers.SkipWhile(x => x < 4).ToList();
// [4, 5, 3, 2, 1] (skips 1, 2, 3)
```

## OfType<T>: filter by type

Filter items by their type (useful with heterogeneous collections):

```csharp
object[] mixed = [1, "Alice", 2.5, "Bob", 3];

var strings = mixed.OfType<string>().ToList();
// ["Alice", "Bob"]

var ints = mixed.OfType<int>().ToList();
// [1, 3]
```

See [Polymorphism](/content/notes/csharp-polymorphism-explained.md) for type relationships.

## Cast<T>: convert types

Convert all items to a specific type (throws if conversion fails):

```csharp
// If items are convertible
var numbers = new object[] { 1, 2, 3 };
var ints = numbers.Cast<int>().ToList();
// [1, 2, 3]

// If not convertible, throws InvalidCastException
var mixed = new object[] { 1, "Alice", 3 };
var casted = mixed.Cast<int>().ToList();  // ❌ Throws InvalidCastException
```

## Chaining: order matters for performance

Where before Select is more efficient—filter first, then transform:

```csharp
// ✓ Efficient: filter 1000 items, then select 100 items
var efficient = players
    .Where(p => p.Score > 80)      // Reduce to ~100 items
    .Select(p => p.Name)           // Transform 100 items
    .ToList();

// ❌ Less efficient: select all, then filter (unnecessary work)
var inefficient = players
    .Select(p => p.Name)           // Transform all 1000 items
    .Where(name => name.Length > 3)  // Filter to ~100 items
    .ToList();

// Performance tip: Put Where before Select when possible
```

Similarly, Where before OrderBy:

```csharp
// ✓ Efficient: filter, then sort
var sorted = players
    .Where(p => p.Score > 50)
    .OrderBy(p => p.Name)
    .ToList();

// ❌ Less efficient: sort all, then filter
var less = players
    .OrderBy(p => p.Name)
    .Where(p => p.Score > 50)
    .ToList();
```

## Common mistakes

- **Forgetting to call a terminal method like `ToList()` or `ToArray()`** – Without it, the query is deferred (not executed). See [LINQ Deferred Execution](/content/notes/csharp-linq-deferred-execution.md).

```csharp
// ❌ Query is not executed; names is IEnumerable, not List
var names = players.Select(p => p.Name);

// ✓ Query executes now
var namesList = players.Select(p => p.Name).ToList();
```

- **Assuming Select creates a new list by default** – `Select` returns `IEnumerable<T>`, which is lazy. Use `.ToList()` to materialize.

- **Using `OfType<T>()` when items are definitely the type** – Use `Cast<T>()` if you're sure (and want an error if conversion fails), or `OfType<T>()` to safely filter by type.

```csharp
// ✓ Safe filtering with OfType
var strings = mixed.OfType<string>().ToList();

// ⚠️ Throws if any item is not an int
var ints = mixed.Cast<int>().ToList();
```

## Quick recap

- **Where**: Filter items by condition; supports `&&`, `||`, and index.
- **Select**: Transform each item; create tuples, anonymous types, or new objects.
- **SelectMany**: Flatten nested collections.
- **Distinct**: Remove duplicates.
- **Take/Skip**: Get first N or skip first N items; use together for paging.
- **TakeWhile/SkipWhile**: Take/skip while condition is true.
- **OfType<T>**: Filter by type (safe; keeps only matching types).
- **Cast<T>**: Convert all items to a type (throws if conversion fails).
- **Order matters**: Where before Select and OrderBy for efficiency.
- **Deferred execution**: Most methods return `IEnumerable<T>`, not `List<T>`. Use `.ToList()` to materialize.
- **Terminal methods**: `ToList()`, `ToArray()`, `ToDictionary()` execute the query immediately.
