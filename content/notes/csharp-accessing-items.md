---
title: Accessing Items in Arrays and Lists
topic: C#
tags: [csharp, indexing, searching, linq, first, single, null-safe]
date: 2026-11-09
---

# Accessing Items in Arrays and Lists

Accessing elements in arrays and lists is fundamental. Beyond basic indexing, C# provides many ways to find, search, and safely retrieve items—from index-based access to LINQ queries with condition-based lookups.

## Indexing: by position

Use square brackets with a zero-based index to access elements:

```csharp
int[] arr = [10, 20, 30, 40, 50];
List<string> names = ["Alice", "Bob", "Charlie"];

Console.WriteLine(arr[0]);      // 10 (first element)
Console.WriteLine(arr[4]);      // 50 (last element)
Console.WriteLine(names[1]);    // Bob
```

## Index from end (^)

Access from the end using the `^` operator (C# 8+):

```csharp
int[] arr = [10, 20, 30, 40, 50];

Console.WriteLine(arr[^1]);     // 50 (last element)
Console.WriteLine(arr[^2]);     // 40 (second from end)
Console.WriteLine(arr[^5]);     // 10 (first element)
```

## Ranges

Extract a contiguous slice using ranges (C# 8+):

```csharp
int[] arr = [10, 20, 30, 40, 50];

Console.WriteLine(arr[1..3]);   // [20, 30]
Console.WriteLine(arr[2..]);    // [30, 40, 50] (from index 2 to end)
Console.WriteLine(arr[..3]);    // [10, 20, 30] (from start to index 3)
Console.WriteLine(arr[^2..]);   // [40, 50] (last two elements)
```

## Safe indexing: checking bounds

Always validate the index before accessing to avoid `IndexOutOfRangeException` or `ArgumentOutOfRangeException`:

```csharp
int[] arr = [10, 20, 30];

int index = 5;
if (index >= 0 && index < arr.Length)
{
    Console.WriteLine(arr[index]);  // ✓
}
else
{
    Console.WriteLine("Index out of range");  // Index 5 is invalid
}

// For lists, use Count instead of Length
List<int> list = [10, 20, 30];
if (index >= 0 && index < list.Count)
{
    Console.WriteLine(list[index]);  // ✓
}
```

## Searching: contains and index

### Contains

Check if a value exists (returns `bool`):

```csharp
int[] arr = [10, 20, 30, 40, 50];
List<string> fruits = ["apple", "banana", "cherry"];

Console.WriteLine(arr.Contains(30));         // true
Console.WriteLine(fruits.Contains("grape")); // false

// Note: Array.Contains requires using System.Linq or static System.Linq.Enumerable
```

### IndexOf

Find the index of the first occurrence (returns index, or -1 if not found):

```csharp
int[] arr = [10, 20, 30, 20, 40];
List<string> names = ["Alice", "Bob", "Charlie", "Bob"];

Console.WriteLine(Array.IndexOf(arr, 20));      // 1 (first match)
Console.WriteLine(Array.IndexOf(arr, 99));      // -1 (not found)

Console.WriteLine(names.IndexOf("Bob"));        // 1
Console.WriteLine(names.IndexOf("David"));      // -1
```

## Searching: Find methods (for custom conditions)

### Find and FindIndex (List only)

Find items based on a condition (lambda predicate):

```csharp
List<int> scores = [85, 90, 78, 92, 88];

// Find first score > 85
int first = scores.Find(x => x > 85);       // 90
int index = scores.FindIndex(x => x > 85);  // 1

Console.WriteLine(first);                   // 90
Console.WriteLine(index);                   // 1

// If not found, Find returns default (0 for int)
int notFound = scores.Find(x => x > 200);   // 0
```

### FindAll (List only)

Find all items matching a condition:

```csharp
List<int> scores = [85, 90, 78, 92, 88];

List<int> high = scores.FindAll(x => x > 85);
// high is [90, 92, 88]

Console.WriteLine(high.Count);  // 3
```

### Exists (List only)

Check if any item matches a condition:

```csharp
List<int> scores = [85, 90, 78, 92, 88];

bool hasHigh = scores.Exists(x => x > 85);  // true
bool hasZero = scores.Exists(x => x == 0);  // false
```

## LINQ methods (requires `using System.Linq`)

LINQ provides powerful query methods that work on both arrays and lists. They return sequences, not single items (except `First`, `Single`, etc.):

### First and FirstOrDefault

Get the first item matching a condition:

```csharp
int[] arr = [10, 20, 30, 40, 50];

// First: throws InvalidOperationException if not found
int first = arr.First(x => x > 15);         // 20
// int bad = arr.First(x => x > 100);       // ❌ Exception: sequence contains no matching element

// FirstOrDefault: returns default/null if not found (returns 0 for int, null for reference types)
int? found = arr.FirstOrDefault(x => x > 15);      // 20
int notFound = arr.FirstOrDefault(x => x > 100);  // 0 (default int value)
```

### Single and SingleOrDefault

Get exactly one item matching a condition (throws if 0 or more than 1 found):

```csharp
int[] uniqueIds = [100, 200, 300];

// Single: throws if 0 or more than 1 match
int id = uniqueIds.Single(x => x == 200);      // 200
// int bad = uniqueIds.Single(x => x > 100);   // ❌ Exception: more than one match

// SingleOrDefault: returns default if not found, throws if more than 1
int found = uniqueIds.SingleOrDefault(x => x == 200);      // 200
int notFound = uniqueIds.SingleOrDefault(x => x == 999);   // 0 (default)
```

### Where

Filter items (returns all matches):

```csharp
int[] numbers = [10, 20, 30, 40, 50];

// Where returns an IEnumerable; convert to list if needed
var high = numbers.Where(x => x > 25).ToList();
// high is [30, 40, 50]

Console.WriteLine(high.Count);  // 3
```

### Any

Check if any item matches (returns `bool`):

```csharp
int[] scores = [85, 90, 78, 92, 88];

bool hasHigh = scores.Any(x => x > 85);  // true
bool hasZero = scores.Any(x => x == 0);  // false
```

## Searching with custom objects

Use lambdas to find items by property:

```csharp
public class Player
{
    public string Name { get; set; }
    public int Score { get; set; }
}

List<Player> players = new List<Player>
{
    new Player { Name = "Alice", Score = 100 },
    new Player { Name = "Bob", Score = 85 },
    new Player { Name = "Charlie", Score = 120 }
};

// Find first player with score > 90
Player topPlayer = players.FirstOrDefault(p => p.Score > 90);
Console.WriteLine(topPlayer?.Name);  // Alice

// Find all players with score > 80
List<Player> qualified = players.FindAll(p => p.Score > 80);
// qualified: Alice, Bob, Charlie

// Check if any player named "Bob"
bool hasBob = players.Any(p => p.Name == "Bob");  // true
```

## First vs FirstOrDefault: choosing wisely

| Scenario | Use | Why |
|----------|-----|-----|
| Must find something | `First()` | Throws if not found (fail-fast) |
| May not find | `FirstOrDefault()` | Returns default/null; check result |
| Exactly one expected | `Single()` | Throws if 0 or more than 1 |
| At most one expected | `SingleOrDefault()` | Returns default if 0, throws if >1 |

## Common mistakes

- **IndexOutOfRangeException** – Accessing an invalid index.
  ```csharp
  int[] arr = [1, 2, 3];
  Console.WriteLine(arr[5]);  // ❌ IndexOutOfRangeException
  ```
  **Fix:** Check bounds before accessing.

- **ArgumentOutOfRangeException** – Similar to above but from lists.
  ```csharp
  List<int> list = [1, 2, 3];
  Console.WriteLine(list[10]);  // ❌ ArgumentOutOfRangeException
  ```

- **InvalidOperationException from `First()` or `Single()` on empty sequence**
  ```csharp
  int[] arr = [1, 2, 3];
  int x = arr.First(x => x > 100);  // ❌ InvalidOperationException
  ```
  **Fix:** Use `FirstOrDefault()` or check if any match before calling `First()`.

- **NullReferenceException from `FirstOrDefault()` on reference types**
  ```csharp
  List<string> names = ["Alice", "Bob"];
  string notFound = names.FirstOrDefault(n => n == "Eve");  // null
  Console.WriteLine(notFound.ToUpper());  // ❌ NullReferenceException
  ```
  **Fix:** Check for null before using.
  ```csharp
  string notFound = names.FirstOrDefault(n => n == "Eve");
  if (notFound != null)
  {
      Console.WriteLine(notFound.ToUpper());  // ✓
  }
  ```

## Quick recap

- **Index by position**: `arr[0]`, `list[2]`.
- **Index from end**: `arr[^1]` (last element).
- **Ranges**: `arr[1..3]` (slice from index 1 to 3).
- **Contains**: Check if value exists (returns `bool`).
- **IndexOf**: Find index of value (returns index or -1).
- **Find, FindIndex, FindAll, Exists**: Search by condition (List only).
- **LINQ**: `First()`, `FirstOrDefault()`, `Single()`, `SingleOrDefault()`, `Where()`, `Any()` (any collection + `System.Linq`).
- **First throws** if not found; `FirstOrDefault` returns default/null (safer).
- **Single throws** if not exactly one match.
- Always validate indexes and check for null results from `FirstOrDefault()`.
