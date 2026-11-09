---
title: Sorting Arrays and Lists
topic: C#
tags: [csharp, sorting, arrays, lists, linq, orderby, comparator, stability]
date: 2026-11-09
---

# Sorting Arrays and Lists

Sorting is one of the most common operations. C# provides multiple ways to sort arrays and lists, with different trade-offs in performance, stability, and convenience.

## Sorting arrays

### Array.Sort (in-place, modifies original)

`Array.Sort` sorts the array **in place**:

```csharp
int[] numbers = [3, 1, 4, 1, 5, 9, 2, 6];
Array.Sort(numbers);
// numbers is now [1, 1, 2, 3, 4, 5, 6, 9]

Console.WriteLine(numbers[0]);  // 1
Console.WriteLine(numbers[7]);  // 9
```

### Array.Reverse (in-place, reverses order)

```csharp
int[] numbers = [1, 2, 3, 4, 5];
Array.Reverse(numbers);
// numbers is now [5, 4, 3, 2, 1]
```

### Descending order

Sort descending by reversing after sorting:

```csharp
int[] numbers = [3, 1, 4, 1, 5, 9, 2, 6];
Array.Sort(numbers);
Array.Reverse(numbers);
// numbers is now [9, 6, 5, 4, 3, 2, 1, 1]
```

## Sorting lists

### List.Sort (in-place, modifies original)

`List<T>.Sort` sorts the list **in place**:

```csharp
List<int> scores = [85, 90, 78, 92, 88];
scores.Sort();
// scores is now [78, 85, 88, 90, 92]

Console.WriteLine(scores[0]);  // 78
Console.WriteLine(scores[4]);  // 92
```

### List.Reverse (in-place, reverses order)

```csharp
List<int> scores = [78, 85, 88, 90, 92];
scores.Reverse();
// scores is now [92, 90, 88, 85, 78]
```

### Descending order

Reverse after sorting:

```csharp
List<int> scores = [85, 90, 78, 92, 88];
scores.Sort();
scores.Reverse();
// scores is now [92, 90, 88, 85, 78]
```

## LINQ sorting (non-destructive, returns new sequence)

**IMPORTANT DIFFERENCE**: LINQ `OrderBy` and `OrderByDescending` do **not** modify the original. They return a **new sorted sequence** (requires `using System.Linq`):

```csharp
int[] original = [3, 1, 4, 1, 5, 9];

// OrderBy: returns new sorted sequence, original unchanged
var sorted = original.OrderBy(x => x).ToList();
// sorted is [1, 1, 3, 4, 5, 9]
// original is still [3, 1, 4, 1, 5, 9]

Console.WriteLine(original[0]);  // 3 (unchanged)
Console.WriteLine(sorted[0]);    // 1 (new sorted sequence)
```

### Ascending and descending

```csharp
int[] numbers = [3, 1, 4, 1, 5, 9, 2, 6];

// Ascending
var ascending = numbers.OrderBy(x => x).ToList();
// [1, 1, 2, 3, 4, 5, 6, 9]

// Descending
var descending = numbers.OrderByDescending(x => x).ToList();
// [9, 6, 5, 4, 3, 2, 1, 1]

// Original is unchanged
Console.WriteLine(numbers[0]);  // 3
```

## Sorting by property

Sort custom objects by a property value using a lambda:

### Using LINQ (non-destructive)

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
    new Player { Name = "Charlie", Score = 100 }
};

// Sort by score, ascending
var byScore = players.OrderBy(p => p.Score).ToList();
// Bob (85), Alice (100), Charlie (100)

// Sort by score, descending
var byScoreDesc = players.OrderByDescending(p => p.Score).ToList();
// Alice (100), Charlie (100), Bob (85)
```

### Sort by score, then by name (ThenBy)

```csharp
List<Player> players = new List<Player>
{
    new Player { Name = "Alice", Score = 100 },
    new Player { Name = "Bob", Score = 85 },
    new Player { Name = "Charlie", Score = 100 }
};

// Sort by score descending, then by name ascending (tiebreaker)
var sorted = players.OrderByDescending(p => p.Score).ThenBy(p => p.Name).ToList();
// Result: Alice (100), Charlie (100), Bob (85)
```

### Using List.Sort with a comparator

`List<T>.Sort` accepts a `Comparison<T>` delegate (lambda) for custom sorting:

```csharp
List<Player> players = new List<Player>
{
    new Player { Name = "Alice", Score = 100 },
    new Player { Name = "Bob", Score = 85 },
    new Player { Name = "Charlie", Score = 100 }
};

// Sort by score descending, then by name ascending
players.Sort((a, b) =>
{
    int scoreCompare = b.Score.CompareTo(a.Score);  // descending (b, a)
    if (scoreCompare != 0)
        return scoreCompare;
    return a.Name.CompareTo(b.Name);  // ascending (a, b)
});

// players is now: Alice (100), Charlie (100), Bob (85)
```

## Sorting strings

### Alphabetical order (case-sensitive)

```csharp
string[] words = ["zebra", "Apple", "banana", "Cherry"];
Array.Sort(words);
// ["Apple", "Cherry", "banana", "zebra"]  (capitals come first)

Console.WriteLine(words[0]);  // Apple
```

### Case-insensitive

Use `StringComparer.OrdinalIgnoreCase`:

```csharp
string[] words = ["zebra", "Apple", "banana", "Cherry"];
Array.Sort(words, StringComparer.OrdinalIgnoreCase);
// ["Apple", "banana", "Cherry", "zebra"]

Console.WriteLine(words[0]);  // Apple
```

### Using LINQ

```csharp
string[] words = ["zebra", "Apple", "banana", "Cherry"];

// Case-sensitive
var sorted1 = words.OrderBy(w => w).ToList();
// ["Apple", "Cherry", "banana", "zebra"]

// Case-insensitive
var sorted2 = words.OrderBy(w => w, StringComparer.OrdinalIgnoreCase).ToList();
// ["Apple", "banana", "Cherry", "zebra"]
```

## Sorting numbers

```csharp
double[] temps = [98.6, 100.1, 97.3, 99.5, 98.9];
Array.Sort(temps);
// [97.3, 98.6, 98.9, 99.5, 100.1]

Console.WriteLine(temps[0]);  // 97.3
```

## IComparable<T> and IComparer<T>

For more complex sorting, define comparison rules on the type itself:

### IComparable<T>: natural sort order

Implement `IComparable<T>` on your class to define a default sort order:

```csharp
public class Player : IComparable<Player>
{
    public string Name { get; set; }
    public int Score { get; set; }

    // Natural order: by score descending, then by name
    public int CompareTo(Player other)
    {
        int scoreCompare = other.Score.CompareTo(this.Score);  // descending
        if (scoreCompare != 0)
            return scoreCompare;
        return this.Name.CompareTo(other.Name);  // ascending
    }
}

List<Player> players = new List<Player>
{
    new Player { Name = "Alice", Score = 100 },
    new Player { Name = "Bob", Score = 85 }
};

players.Sort();  // Uses CompareTo
// Result: Alice (100), Bob (85)
```

### IComparer<T>: alternative sort order

Implement `IComparer<T>` for alternative sorting strategies:

```csharp
public class PlayerByNameComparer : IComparer<Player>
{
    public int Compare(Player a, Player b)
    {
        return a.Name.CompareTo(b.Name);
    }
}

List<Player> players = new List<Player>
{
    new Player { Name = "Charlie", Score = 90 },
    new Player { Name = "Alice", Score = 100 },
    new Player { Name = "Bob", Score = 85 }
};

players.Sort(new PlayerByNameComparer());
// Result: Alice, Bob, Charlie (by name)
```

## Stability: does order matter when equal?

A sort is **stable** if items with equal sort keys retain their original relative order.

- **LINQ `OrderBy`**: Stable (retains original order for equal items).
- **`Array.Sort` / `List.Sort`**: Not guaranteed to be stable (may reorder equal items).

In practice, this rarely matters, but it's worth knowing:

```csharp
List<Player> players = new List<Player>
{
    new Player { Name = "Alice", Score = 100 },
    new Player { Name = "Bob", Score = 100 },   // Same score as Alice
    new Player { Name = "Charlie", Score = 90 }
};

// LINQ OrderBy (stable): Alice, Bob, Charlie (equal items keep original order)
var linq = players.OrderByDescending(p => p.Score).ToList();

// List.Sort (not guaranteed): may reorder Alice and Bob
players.Sort((a, b) => b.Score.CompareTo(a.Score));
```

## Binary search (quick lookup on sorted data)

After sorting, `Array.BinarySearch` finds items in O(log n) time:

```csharp
int[] numbers = [1, 3, 5, 7, 9, 11];
Array.Sort(numbers);

int index = Array.BinarySearch(numbers, 7);
Console.WriteLine(index);  // 3

int notFound = Array.BinarySearch(numbers, 6);
Console.WriteLine(notFound);  // negative (not found)
```

**Important**: Binary search only works on sorted data. Unsorted data gives incorrect results.

## Common mistakes

- **Forgetting that LINQ `OrderBy` doesn't modify the original** – You must assign the result or use `.ToList()` / `.ToArray()`.

```csharp
List<int> numbers = [3, 1, 4, 1, 5];
numbers.OrderBy(x => x);  // ❌ Numbers still [3, 1, 4, 1, 5]

// ✓ Assign the result
var sorted = numbers.OrderBy(x => x).ToList();
```

- **Forgetting `using System.Linq`** when using `OrderBy`, `OrderByDescending`, `ThenBy`, etc.

```csharp
// ❌ Compiler error: OrderBy does not exist
List<int> numbers = [3, 1, 4];
var sorted = numbers.OrderBy(x => x).ToList();

// ✓ Add using
using System.Linq;
// Now OrderBy is available
```

- **Sorting a list of objects that don't implement `IComparable`** – You'll get an `InvalidOperationException`.

```csharp
public class Player { }  // Does not implement IComparable<Player>

List<Player> players = [new Player(), new Player()];
players.Sort();  // ❌ InvalidOperationException
```

**Fix**: Implement `IComparable<T>`, use `List.Sort(comparator)`, or use LINQ `OrderBy`.

## Worked example: sorting players

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
    new Player { Name = "Charlie", Score = 100 },
    new Player { Name = "Diana", Score = 92 }
};

// Sort by score descending, then by name ascending
var sorted = players
    .OrderByDescending(p => p.Score)
    .ThenBy(p => p.Name)
    .ToList();

foreach (var p in sorted)
{
    Console.WriteLine($"{p.Name}: {p.Score}");
}
// Output:
// Alice: 100
// Charlie: 100
// Diana: 92
// Bob: 85
```

## Quick recap

- **`Array.Sort()` / `List.Sort()`**: In-place, modifies original.
- **LINQ `OrderBy()` / `OrderByDescending()`**: Non-destructive, returns new sorted sequence (requires `using System.Linq`).
- Sort by property with `OrderBy(x => x.Property)` or `Sort((a, b) => a.Property.CompareTo(b.Property))`.
- Use `ThenBy()` for secondary sorting (tiebreaker).
- String sorting: case-sensitive by default; use `StringComparer.OrdinalIgnoreCase` for case-insensitive.
- `IComparable<T>`: Define natural sort order on the type itself.
- `IComparer<T>`: Define alternative sort strategies.
- LINQ `OrderBy` is stable; `Array.Sort` / `List.Sort` are not (usually not important).
- Binary search works only on sorted data.
- Common errors: forgetting `using System.Linq`, sorting unsorted data with `BinarySearch`, forgetting LINQ doesn't modify the original.
