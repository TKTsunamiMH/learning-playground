---
title: C# foreach Loop
topic: C#
tags: [csharp, loops, foreach, collections, enumerable, iteration, read-only]
date: 2026-11-10
---

# C# foreach Loop

The `foreach` loop iterates through every item in a collection (array, list, string, etc.) in order. It's the simplest loop when you want to examine each element but don't need an index. The iteration variable is **read-only**—you cannot assign to it directly.

## foreach loop: syntax and how it works

A `foreach` loop has a simple structure:

```csharp
foreach (Type item in collection)
{
    // Code runs once for each item in collection
    // item is the current element
}
```

- **Type**: The type of each element (e.g., `int`, `string`, `Player`).
- **item**: The variable holding the current element (exists only inside the loop).
- **collection**: An array, list, or any enumerable collection.

**Example: iterate through an array**

```csharp
int[] numbers = [10, 20, 30, 40];

foreach (int num in numbers)
{
    Console.WriteLine(num);
}
// Output:
// 10
// 20
// 30
// 40
```

**Example: iterate through a string character by character**

```csharp
string word = "Hello";

foreach (char letter in word)
{
    Console.WriteLine(letter);
}
// Output:
// H
// e
// l
// l
// o
```

**Example: iterate through a List<T>**

```csharp
List<string> fruits = new List<string> { "apple", "banana", "cherry" };

foreach (string fruit in fruits)
{
    Console.WriteLine(fruit);
}
// Output:
// apple
// banana
// cherry
```

## foreach with custom objects

`foreach` works with lists of custom objects:

```csharp
class Player
{
    public string Name { get; set; }
    public int Score { get; set; }

    public Player(string name, int score)
    {
        Name = name;
        Score = score;
    }
}

List<Player> players = new List<Player>
{
    new Player("Alice", 100),
    new Player("Bob", 85),
    new Player("Charlie", 92)
};

foreach (Player player in players)
{
    Console.WriteLine($"{player.Name}: {player.Score}");
}
// Output:
// Alice: 100
// Bob: 85
// Charlie: 92
```

## What works with foreach

`foreach` works with anything **enumerable**—any collection implementing `IEnumerable`:

- **Arrays**: `int[]`, `string[]`, etc.
- **Lists**: `List<T>`
- **Strings**: `string` (iterates each character)
- **Dictionaries**: `Dictionary<K, V>` (iterates key-value pairs, see below)
- **Ranges**: `1..10` (C# 8+)
- **Custom enumerables**: Any class implementing `IEnumerable`

**Quick Dictionary example:**

```csharp
Dictionary<string, int> ages = new Dictionary<string, int>
{
    { "Alice", 30 },
    { "Bob", 25 }
};

foreach (var pair in ages)
{
    Console.WriteLine($"{pair.Key}: {pair.Value}");
}
// Output:
// Alice: 30
// Bob: 25
```

## The iteration variable is read-only

The variable you declare in `foreach` (e.g., `num`, `fruit`) is **read-only**. You cannot assign to it:

**❌ Compiler error CS1656:**

```csharp
int[] numbers = [1, 2, 3];

foreach (int num in numbers)
{
    num = 0;  // ❌ Error CS1656: Cannot assign to foreach iteration variable 'num'
}
```

**Why?** The iteration variable is just a temporary name for the current element. For value types, assigning to `num` would not change the array.

### Fix: Use a for loop if you need to modify elements

```csharp
int[] numbers = [1, 2, 3];

for (int i = 0; i < numbers.Length; i++)
{
    numbers[i] = 0;  // ✓ Modify array elements by index
}

Console.WriteLine(string.Join(", ", numbers));
// Output: 0, 0, 0
```

### Fix: Modify object properties, not the variable itself

With reference types like custom objects, you can modify **properties** of the object:

```csharp
class Player
{
    public string Name { get; set; }
    public int Score { get; set; }
}

List<Player> players = new List<Player>
{
    new Player { Name = "Alice", Score = 100 },
    new Player { Name = "Bob", Score = 85 }
};

foreach (Player player in players)
{
    player.Score += 10;  // ✓ Modify object properties
}

foreach (Player player in players)
{
    Console.WriteLine($"{player.Name}: {player.Score}");
}
// Output:
// Alice: 110
// Bob: 95
```

## Do not modify a collection during iteration

**❌ InvalidOperationException: "Collection was modified during enumeration"**

```csharp
List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };

foreach (int num in numbers)
{
    if (num % 2 == 0)
    {
        numbers.Remove(num);  // ❌ InvalidOperationException
    }
}
```

### Fix: Use a for loop backwards

```csharp
List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };

for (int i = numbers.Count - 1; i >= 0; i--)
{
    if (numbers[i] % 2 == 0)
    {
        numbers.RemoveAt(i);  // ✓ Safe
    }
}

Console.WriteLine(string.Join(", ", numbers));
// Output: 1, 3, 5
```

### Fix: Use RemoveAll with a predicate

```csharp
List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };

numbers.RemoveAll(num => num % 2 == 0);  // ✓ Remove all even numbers

Console.WriteLine(string.Join(", ", numbers));
// Output: 1, 3, 5
```

### Fix: Iterate over a copy

```csharp
List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };

foreach (int num in numbers.ToList())  // ✓ Iterate a copy
{
    if (num % 2 == 0)
    {
        numbers.Remove(num);
    }
}

Console.WriteLine(string.Join(", ", numbers));
// Output: 1, 3, 5
```

## foreach vs for comparison

| Aspect | foreach | for |
|--------|---------|-----|
| **Access by index** | No | Yes |
| **Readability** | Better for all items | Better with index |
| **Modify collection** | ❌ Not safe | ✓ Safe (backwards) |
| **Skip items** | Harder | Easy (`i += 2`) |
| **Direction** | Forward only | Any (forward, backward) |
| **Modifying elements** | ✓ Properties | ✓ Direct by index |
| **Performance** | Slightly slower | Slightly faster |

**Rule of thumb**: Use `foreach` when you need each item. Use `for` when you need the index or control over iteration.

## Common mistakes

- **Trying to assign to the iteration variable** – It's read-only. Use a `for` loop or modify object properties.

```csharp
// ❌ Error CS1656
foreach (int num in numbers)
{
    num = 0;
}

// ✓ Use for loop
for (int i = 0; i < numbers.Length; i++)
{
    numbers[i] = 0;
}
```

- **Modifying a collection during iteration** – This throws `InvalidOperationException`. Use a `for` loop backwards, `RemoveAll`, or iterate a copy.

```csharp
// ❌ InvalidOperationException
foreach (int num in list)
{
    if (num > 5)
    {
        list.Remove(num);
    }
}

// ✓ Use RemoveAll
list.RemoveAll(num => num > 5);
```

- **Using foreach when you need an index** – Reach for `for` if you need positions.

```csharp
// ❌ No index available
foreach (string fruit in fruits)
{
    // How to access the index?
}

// ✓ Use for if you need the index
for (int i = 0; i < fruits.Count; i++)
{
    Console.WriteLine($"Index {i}: {fruits[i]}");
}
```

## Quick recap

- **foreach** iterates every item in a collection automatically, without an index.
- It works with arrays, lists, strings, dictionaries, and any enumerable.
- The iteration variable is **read-only**; use `for` to modify array elements.
- Modify **object properties** in `foreach`; they're not read-only.
- Never add or remove items from a collection during `foreach` iteration; use `for` backwards, `RemoveAll`, or iterate a copy.
- Choose `foreach` for clarity when iterating all items; choose `for` when you need the index.
