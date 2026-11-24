---
title: C# LINQ – Aggregation and Quantifiers
topic: C#
tags: [csharp, linq, aggregate, count, sum, average, any, all, first, single]
date: 2026-11-24
---

# C# LINQ – Aggregation and Quantifiers

Aggregation reduces a sequence to a single value (sum, average, count, min, max). Quantifiers check if items match a condition (any, all, contains). These operations are essential for analysis and validation. See [Accessing Items](/content/notes/csharp-accessing-items.md) for details on `First`, `FirstOrDefault`, `Single`, etc.—this note builds on that.

## Count and Sum

### Count

Count items (all, or matching a condition):

```csharp
using System.Linq;

List<Player> players = new List<Player>
{
    new Player { Name = "Alice", Score = 100 },
    new Player { Name = "Bob", Score = 50 },
    new Player { Name = "Charlie", Score = 75 }
};

var total = players.Count();                    // 3
var highScorers = players.Count(p => p.Score > 60);  // 2
```

**Important**: Use `Count()` only when you need the number. Use `Any()` for yes/no checks (see below).

### Sum

Sum all values, or selected properties:

```csharp
var totalScore = players.Sum(p => p.Score);    // 225
var totalNames = players.Sum(p => p.Name.Length);  // Length of all names
```

Sum on an empty sequence returns `0`:

```csharp
List<Player> empty = new List<Player>();
Console.WriteLine(empty.Sum(p => p.Score));    // 0
```

## Average, Min, Max

### Average

```csharp
var avgScore = players.Average(p => p.Score);  // 75
Console.WriteLine(avgScore);
```

### Min and Max

Return the **smallest/largest value**:

```csharp
var highest = players.Max(p => p.Score);       // 100
var lowest = players.Min(p => p.Score);        // 50
```

### MinBy and MaxBy

Return the **item with the smallest/largest value** (not the value itself):

```csharp
// Max(x => x.Score) returns the highest SCORE (100)
var highest = players.Max(p => p.Score);       // 100

// MaxBy(x => x.Score) returns the PLAYER with the highest score (Alice)
var topPlayer = players.MaxBy(p => p.Score);   // Player: Alice
Console.WriteLine(topPlayer.Name);              // Alice

var lowestScorer = players.MinBy(p => p.Score);  // Bob
Console.WriteLine(lowestScorer.Name);             // Bob
```

**Key difference**:
- `Max()` / `Min()`: Return the **value** (number).
- `MaxBy()` / `MinBy()`: Return the **item** (object).

## Aggregate

Apply a custom aggregation function:

```csharp
// Sum scores manually
var total = players.Aggregate(0, (sum, p) => sum + p.Score);
// 225

// Concatenate names
var allNames = players.Aggregate("", (names, p) => names + p.Name + ", ");
// "AliceBobCharlie, "

// Accumulate with result projection
var result = players.Aggregate(0, 
    (sum, p) => sum + p.Score, 
    total => total / players.Count());  // Average
// 75
```

`Aggregate` is powerful but often less readable than specific methods. Use `Sum()`, `Average()`, etc. when possible.

## Any and All: quantifiers

### Any

Check if **at least one** item matches:

```csharp
var hasHighScorer = players.Any(p => p.Score > 90);     // true
var hasVeryHigh = players.Any(p => p.Score > 150);      // false

// No condition: check if sequence is non-empty
var hasAny = players.Any();                              // true
```

**Why `Any()` over `Count() > 0`**: `Any()` stops at the first match (efficient). `Count()` counts all items (wasteful).

```csharp
// ❌ Wasteful: counts all 1000 items
if (players.Count() > 0) { ... }

// ✓ Efficient: stops at first item
if (players.Any()) { ... }
```

### All

Check if **all** items match:

```csharp
var allHighScore = players.All(p => p.Score > 40);     // true
var allPerfect = players.All(p => p.Score == 100);     // false
```

## Contains

Check if a value exists in the sequence:

```csharp
var hasAlice = players.Any(p => p.Name == "Alice");     // true

// For simple values:
var numbers = new[] { 1, 2, 3, 4, 5 };
Console.WriteLine(numbers.Contains(3));                 // true
```

## First, FirstOrDefault, Single, SingleOrDefault, Last, LastOrDefault, ElementAt

Retrieve single items with different behaviors. See [Accessing Items](/content/notes/csharp-accessing-items.md) for full details. Quick reference:

| Method | Returns if no match | Returns if >1 match | When to use |
|--------|----------------------|----------------------|-------------|
| **First** | Throws | Returns first | Expect exactly one or more |
| **FirstOrDefault** | null (or default) | Returns first | May be empty; use default if none |
| **Single** | Throws | Throws | Expect exactly one, or error |
| **SingleOrDefault** | null (or default) | Throws | Expect zero or one, error if >1 |
| **Last** | Throws | Returns last | Want the last of many |
| **LastOrDefault** | null (or default) | Returns last | Last item, or default if empty |
| **ElementAt** | Throws | N/A | Access by index |

```csharp
// Expect at least one; throw if empty
var first = players.First();                     // Alice

// Expect exactly one; throw if zero or >1
var singlePlayer = players.Single(p => p.Name == "Alice");  // Alice

// May not exist; use default if not found
var bob = players.FirstOrDefault(p => p.Name == "Bob");  // Bob or null
```

## Empty sequences and InvalidOperationException

On **empty sequences**, aggregation methods throw `InvalidOperationException`:

```csharp
List<Player> empty = new List<Player>();

Console.WriteLine(empty.Sum(p => p.Score));     // 0 (safe)
Console.WriteLine(empty.Average(p => p.Score));  // ❌ InvalidOperationException
Console.WriteLine(empty.Max(p => p.Score));      // ❌ InvalidOperationException
Console.WriteLine(empty.Min(p => p.Score));      // ❌ InvalidOperationException
```

### Avoid with DefaultIfEmpty

Insert a default if the sequence is empty:

```csharp
var avg = empty.DefaultIfEmpty(new Player { Score = 0 })
    .Average(p => p.Score);  // 0 (safe)
```

### Avoid with Any check

```csharp
if (players.Any())
{
    var avg = players.Average(p => p.Score);  // Safe
}
else
{
    var avg = 0;  // Default
}
```

## Practical examples

### Top scorer

```csharp
var topScorer = players.OrderByDescending(p => p.Score).First();
// or
var topScorer = players.MaxBy(p => p.Score);
```

### Average score per team

```csharp
var avgPerTeam = players
    .GroupBy(p => p.Team)
    .Select(g => new { Team = g.Key, Avg = g.Average(p => p.Score) })
    .ToList();

foreach (var item in avgPerTeam)
{
    Console.WriteLine($"{item.Team}: {item.Avg:F1}");
}
```

### Check if all players meet minimum score

```csharp
bool allPassed = players.All(p => p.Score >= 50);
```

### Find the longest name

```csharp
var longest = players
    .OrderByDescending(p => p.Name.Length)
    .First()
    .Name;
// or
var longestName = players.MaxBy(p => p.Name.Length).Name;
```

## Count vs Any vs Count property

| Need | Method | Performance | Notes |
|------|--------|-------------|-------|
| **Is empty?** | `Any()` | Fast (stops at first) | Preferred |
| **Is NOT empty?** | `!Any()` or `Count() > 0` | `Any()` is faster | Use `Any()` |
| **Exact count** | `Count()` | Counts all items | Required for exact number |
| **Has items (know count)** | `.Count` property | Instant (no enumeration) | On `List<T>` or `ICollection<T>` |

```csharp
// ✓ Fast: stops at first item
if (players.Any()) { ... }

// ❌ Wasteful: counts all 1000 items
if (players.Count() > 0) { ... }

// ✓ Fast on List<T>: .Count is a property
if (playerList.Count > 0) { ... }
```

## Common mistakes

- **Using `Count() > 0` instead of `Any()`** – `Count()` enumerates the entire sequence; `Any()` stops at the first item.

```csharp
// ❌ Slow: counts all items
if (players.Count() > 0) { ... }

// ✓ Fast: stops at first
if (players.Any()) { ... }
```

- **Calling `Average()`, `Max()`, or `Min()` on empty sequences** – Throws `InvalidOperationException`. Use `DefaultIfEmpty()` or check with `Any()` first.

```csharp
// ❌ Throws if empty
var avg = players.Average(p => p.Score);

// ✓ Safe with check
if (players.Any())
    var avg = players.Average(p => p.Score);

// ✓ Safe with default
var avg = players.DefaultIfEmpty(new Player { Score = 0 })
    .Average(p => p.Score);
```

- **Confusing `Max()` and `MaxBy()`** – `Max()` returns the value; `MaxBy()` returns the item.

```csharp
// Returns 100 (the highest score)
var score = players.Max(p => p.Score);

// Returns Alice (the player with highest score)
var player = players.MaxBy(p => p.Score);
```

## Quick recap

- **Count**: Count all items or matching a condition; `Sum` for totals.
- **Average**: Average value; throws on empty sequences (use `DefaultIfEmpty()` or `Any()` check).
- **Min/Max**: Return the **value** (smallest/largest number).
- **MinBy/MaxBy**: Return the **item** with the smallest/largest value.
- **Aggregate**: Custom aggregation; use specific methods when possible.
- **Any**: "Is there at least one?" (efficient; stops at first).
- **All**: "Do all items match?" 
- **Contains**: "Is this value in the sequence?"
- **First/Single/Last**: Retrieve single items; use `FirstOrDefault()` for safe empty checks.
- **Common error**: `Count() > 0` is wasteful; use `Any()` instead.
- **Empty sequences**: `Sum` returns 0; `Average`, `Max`, `Min` throw unless handled with `DefaultIfEmpty()` or `Any()`.
- **Performance**: `Any()` >> `Count()` for existence checks; `.Count` property (not method) is instant on `List<T>`.
