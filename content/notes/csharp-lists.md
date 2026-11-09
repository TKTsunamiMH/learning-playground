---
title: C# Lists
topic: C#
tags: [csharp, list, collections, generic, dynamic-size, system.collections.generic]
date: 2026-11-09
---

# C# Lists

`List<T>` is a generic collection in the `System.Collections.Generic` namespace that holds elements of a **single type** and **grows or shrinks dynamically**. Lists are backed by an array internally; when the array fills up, a larger one is allocated and elements are copied over. Lists are a **reference type** and provide convenient methods for adding, removing, and searching items.

## What is a List<T>?

- **Generic**: Type-safe; `List<int>`, `List<string>`, `List<Player>`, etc.
- **Dynamic size**: Add and remove items freely; grows as needed.
- **Backed by an array**: Internally uses an array that resizes when needed.
- **Reference type**: The list object is on the heap.
- **Ordered**: Elements are in insertion order (for most operations).
- **Count vs Capacity**: `Count` is how many items are in the list; `Capacity` is how many it can hold before needing to resize.

## Creating a List

### Basic instantiation

```csharp
List<int> numbers = new List<int>();
List<string> names = new List<string>();

Console.WriteLine(numbers.Count);     // 0
Console.WriteLine(numbers.Capacity);  // 0 (or 4, depending on .NET version)
```

### With an initial capacity

```csharp
// Start with capacity for 10 elements (more efficient if you know approximate size)
List<int> numbers = new List<int>(10);
Console.WriteLine(numbers.Count);     // 0
Console.WriteLine(numbers.Capacity);  // 10
```

### With an initializer

```csharp
List<int> scores = new List<int> { 85, 90, 78, 92 };
Console.WriteLine(scores.Count);      // 4
Console.WriteLine(scores[0]);         // 85
```

### From an array

```csharp
int[] arr = [1, 2, 3, 4, 5];
List<int> list = new List<int>(arr);

Console.WriteLine(list.Count);        // 5
Console.WriteLine(list[2]);           // 3
```

### Collection expression (C# 12+)

```csharp
List<string> colors = ["red", "green", "blue"];
Console.WriteLine(colors.Count);      // 3
```

## Common List methods

| Method | Purpose | Example |
|--------|---------|---------|
| `Add(item)` | Add item to end | `list.Add(5);` |
| `AddRange(collection)` | Add multiple items | `list.AddRange([6, 7, 8]);` |
| `Insert(index, item)` | Add at specific index | `list.Insert(1, 99);` |
| `Remove(item)` | Remove first occurrence | `list.Remove(99);` returns true/false |
| `RemoveAt(index)` | Remove at index | `list.RemoveAt(1);` |
| `RemoveAll(predicate)` | Remove all matching condition | `list.RemoveAll(x => x < 50);` |
| `Clear()` | Remove all items | `list.Clear();` |
| `Contains(item)` | Check if item exists | `list.Contains(85);` returns true/false |
| `Count` | Number of items (property) | `int n = list.Count;` |
| `IndexOf(item)` | Find index of item | `list.IndexOf(85);` returns -1 if not found |

## Adding items

```csharp
List<int> scores = new List<int>();

scores.Add(85);
scores.Add(90);
scores.Add(78);
Console.WriteLine(scores.Count);      // 3

// Add multiple at once
scores.AddRange([92, 88]);
Console.WriteLine(scores.Count);      // 5

// Insert at specific index
scores.Insert(1, 95);  // Insert 95 at index 1
Console.WriteLine(scores[1]);         // 95
```

## Removing items

```csharp
List<string> fruits = ["apple", "banana", "cherry", "date"];

// Remove by value
bool removed = fruits.Remove("banana");
Console.WriteLine(removed);           // true
Console.WriteLine(fruits.Count);      // 3

// Remove by index
fruits.RemoveAt(0);  // Remove "apple"
Console.WriteLine(fruits.Count);      // 2

// Remove all matching a condition
List<int> numbers = [10, 5, 30, 2, 50, 8];
numbers.RemoveAll(x => x < 10);
// numbers is now [10, 30, 50]

// Clear all
fruits.Clear();
Console.WriteLine(fruits.Count);      // 0
```

## Looping through a List

### for loop

```csharp
List<int> numbers = [10, 20, 30, 40];

for (int i = 0; i < numbers.Count; i++)
{
    Console.WriteLine($"Index {i}: {numbers[i]}");
}
```

### foreach loop

```csharp
foreach (int num in numbers)
{
    Console.WriteLine(num);
}
```

## ⚠️ Modifying a list during foreach iteration

This is a **classic mistake** that causes an `InvalidOperationException`:

```csharp
List<int> numbers = [1, 2, 3, 4, 5];

// ❌ This throws InvalidOperationException
foreach (int num in numbers)
{
    if (num % 2 == 0)
    {
        numbers.Remove(num);  // Modifying collection during iteration
    }
}
```

**Why?** The `foreach` loop internally uses an enumerator that tracks the collection's state. Adding or removing items invalidates the enumerator.

**Fix 1: Use a `for` loop backward**

```csharp
List<int> numbers = [1, 2, 3, 4, 5];

for (int i = numbers.Count - 1; i >= 0; i--)
{
    if (numbers[i] % 2 == 0)
    {
        numbers.RemoveAt(i);
    }
}
// numbers is now [1, 3, 5]
```

**Fix 2: Collect items to remove, then remove after**

```csharp
List<int> numbers = [1, 2, 3, 4, 5];
var toRemove = new List<int>();

foreach (int num in numbers)
{
    if (num % 2 == 0)
    {
        toRemove.Add(num);
    }
}

foreach (int num in toRemove)
{
    numbers.Remove(num);
}
// numbers is now [1, 3, 5]
```

**Fix 3: Use `RemoveAll` with a predicate**

```csharp
List<int> numbers = [1, 2, 3, 4, 5];
numbers.RemoveAll(x => x % 2 == 0);
// numbers is now [1, 3, 5]
```

## Searching in a List

```csharp
List<int> numbers = [10, 20, 30, 40, 50];

// Contains
Console.WriteLine(numbers.Contains(30));      // true
Console.WriteLine(numbers.Contains(99));      // false

// IndexOf
Console.WriteLine(numbers.IndexOf(30));       // 2
Console.WriteLine(numbers.IndexOf(99));       // -1 (not found)

// Find and FindIndex (with predicate)
List<int> scores = [85, 90, 78, 92, 88];
int firstHigh = scores.Find(x => x > 85);    // 90
int index = scores.FindIndex(x => x > 85);   // 1

// FindAll (returns all matches)
List<int> all = scores.FindAll(x => x > 85);  // [90, 92, 88]

// Exists
bool hasHigh = scores.Exists(x => x > 85);    // true
```

## Count vs Capacity

Internally, a list maintains a backing array larger than needed:

```csharp
List<int> list = new List<int> { 1, 2, 3 };

Console.WriteLine(list.Count);        // 3 (number of items)
Console.WriteLine(list.Capacity);     // 4 (or more, internal allocation)

list.Add(4);
Console.WriteLine(list.Count);        // 4
Console.WriteLine(list.Capacity);     // Still 4

list.Add(5);
Console.WriteLine(list.Count);        // 5
Console.WriteLine(list.Capacity);     // 8 (resized when full)

// Trim excess if you know the size won't change
list.TrimExcess();
Console.WriteLine(list.Capacity);     // 5 (closer to Count)
```

## Common mistakes

- **InvalidOperationException when modifying during `foreach`** – Don't add/remove items while iterating with `foreach`. Use a `for` loop backward or collect items to remove first.

```csharp
// ❌ InvalidOperationException
foreach (var item in list)
{
    list.Remove(item);  // Mutating the collection
}

// ✓ Use a for loop backward
for (int i = list.Count - 1; i >= 0; i--)
{
    list.RemoveAt(i);
}
```

- **ArgumentOutOfRangeException when accessing by index** – Lists are zero-indexed; check bounds before accessing.

```csharp
List<int> numbers = [1, 2, 3];
Console.WriteLine(numbers[5]);  // ❌ ArgumentOutOfRangeException
Console.WriteLine(numbers[2]);  // ✓ 3
```

- **Confusing `Count` with `Capacity`** – `Count` is what's in the list; `Capacity` is the internal array size. Capacity is usually larger and grows automatically.

## Quick recap

- `List<T>` is a **generic, dynamic-size collection** backed by an array internally.
- Create with `new List<int>()`, initialize with `{ }`, or use collection expressions.
- Add with `Add()`, `AddRange()`, `Insert()`; remove with `Remove()`, `RemoveAt()`, `RemoveAll()`, `Clear()`.
- Use `.Count` to get the number of items (not `.Length`).
- Loop with `for` or `foreach`; never modify during `foreach` (use `for` backward or `RemoveAll` instead).
- Search with `Contains()`, `IndexOf()`, `Find()`, `FindIndex()`, `FindAll()`, `Exists()`.
- `Capacity` is internal; `Count` is what matters to you.
- Common exception: `InvalidOperationException` from modifying during iteration; `ArgumentOutOfRangeException` from bad index.
