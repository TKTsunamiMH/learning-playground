---
title: C# Tuples Cheatsheet
topic: C#
tags: [csharp, cheatsheet, tuples, syntax, reference]
date: 2026-11-16
---

# C# Tuples Cheatsheet

Quick reference for tuple syntax, declarations, access patterns, deconstruction, and common patterns.

## Tuple syntax at a glance

| Operation | Syntax | Example |
|-----------|--------|---------|
| **Declare type** | `(type1, type2, ...)` | `(int, string) pair = (1, "hello");` |
| **With names** | `(type1 name1, type2 name2)` | `(int Id, string Name) = (1, "Alice");` |
| **Create/assign** | `(value1, value2, ...)` | `var t = (42, "test");` |
| **With names** | `(name1: value1, name2: value2)` | `var p = (Id: 1, Name: "Bob");` |
| **Access by name** | `tuple.name` | `p.Name` → "Bob" |
| **Access by position** | `tuple.Item1`, `tuple.Item2`, ... | `p.Item1` → 1 |
| **Deconstruct** | `var (var1, var2) = tuple;` | `var (id, name) = p;` |
| **Deconstruct typed** | `(type1 var1, type2 var2) = tuple;` | `(int id, string name) = p;` |
| **Discard values** | Use `_` | `var (id, _) = p;  // ignore name` |
| **Return from method** | `(type1, type2) MethodName() { ... }` | `public (int, string) GetData()` |
| **Async return** | `Task<(type1, type2)> Method()` | `public async Task<(bool, int)> Fetch()` |
| **As dictionary key** | `Dictionary<(type1, type2), TValue>` | `var map = new Dictionary<(int, int), Tile>();` |

## Declaring tuples

### Positional (no names)

```csharp
(int, string) pair = (1, "Anna");
Console.WriteLine(pair.Item1);      // 1
Console.WriteLine(pair.Item2);      // Anna
```

### Named elements

```csharp
(int Id, string Name) person = (1, "Alice");
Console.WriteLine(person.Id);       // 1
Console.WriteLine(person.Name);     // Alice
Console.WriteLine(person.Item1);    // 1 (also works)
```

### Inferred from variable names (C# 7.1+)

```csharp
int id = 1;
string name = "Alice";
var tuple = (id, name);
Console.WriteLine(tuple.id);        // 1
Console.WriteLine(tuple.name);      // Alice
```

## Accessing elements

```csharp
var point = (X: 10, Y: 20);

// By name (preferred)
point.X                             // 10
point.Y                             // 20

// By position (always works)
point.Item1                         // 10
point.Item2                         // 20
```

## Deconstructing and discarding

### Basic deconstruction

```csharp
var person = (Name: "Alice", Age: 30);
var (name, age) = person;           // Into var
(string n, int a) = person;         // With types
```

### Discarding values

```csharp
var (name, _) = person;             // Ignore age
var (_, age) = person;              // Ignore name
var (_, _, z) = (1, 2, 3);          // Ignore first two
```

### In foreach loops

```csharp
var people = new List<(string Name, int Age)>
{
    ("Alice", 30),
    ("Bob", 25)
};

foreach (var (name, age) in people)
{
    Console.WriteLine($"{name} is {age}");
}
```

## Swapping and multiple assignment

```csharp
// Swap
int a = 10, b = 20;
(a, b) = (b, a);                    // a=20, b=10

// Multiple assignment
(x, y, z) = (y, z, x);              // Rotate values
```

## Returning from methods

```csharp
// Simple return
public (int Min, int Max) GetRange(int[] numbers)
{
    return (numbers.Min(), numbers.Max());
}

var range = GetRange(new[] { 1, 5, 3 });
var (min, max) = GetRange(new[] { 1, 5, 3 });

// Async return
public async Task<(bool Success, string Message)> FetchAsync(string url)
{
    // ...
    return (true, "Data fetched");
}

var (success, msg) = await FetchAsync(url);
```

## Comparing tuples

```csharp
var t1 = (X: 10, Y: 20);
var t2 = (X: 10, Y: 20);
var t3 = (X: 5, Y: 15);

t1 == t2                            // true (same values)
t1 != t3                            // true (different values)
t1.Equals(t2)                       // true
```

## Tuple vs class vs struct vs record

| | Tuple | Class | Struct | Record |
|---|-------|-------|--------|--------|
| **Syntax** | `(int, string)` | `public class T { ... }` | `public struct T { ... }` | `record T(int, string)` |
| **Storage** | Stack (value) | Heap (ref) | Stack (value) | Heap (ref) |
| **Mutable** | ✓ | ✓ | ✓ | ✗ (default) |
| **Members** | ✓ Elements | ✓ Fields/props | ✓ Fields/props | ✓ Properties |
| **Methods** | ✗ | ✓ | ✓ | ✓ |
| **Equality** | ✓ By value | ✗ By ref | ✓ By value | ✓ By value |
| **Return** | ✓ | ✓ | ✓ | ✓ |
| **Best for** | Temporary, return 2–3 values | Complex behavior | Lightweight value | Immutable domain data |

## Where to use tuples

| Use Case | Example | Code |
|----------|---------|------|
| **Return 2–3 values** | Min/max, validation | `(int Min, int Max) GetRange(...)` |
| **Temporary data** | LINQ projection | `Select(p => (p.Name, p.Price))` |
| **Dictionary keys** | Grid coordinates | `Dictionary<(int, int), Tile>` |
| **Swap variables** | Exchange values | `(a, b) = (b, a);` |
| **Deconstruct** | Unpack values | `var (x, y) = point;` |
| **Test data** | xUnit theory | `[InlineData(1, 2)]` |

## Where NOT to use tuples

| Scenario | Why | Use Instead |
|----------|-----|-------------|
| **Public API** | Unclear meaning | Record or class |
| **4+ elements** | Confusing (many Items) | Record or class |
| **Complex data** | Needs behavior | Record or class |
| **Long-lived** | Data with business logic | Record or class |
| **Mutable data** | Clarity and maintainability | Class (if mutable) |

## Common errors and one-line fixes

### CS1002: Mismatch in number of elements

**Cause:** Tuple unpacking has wrong number of variables.

```csharp
var person = (Name: "Alice", Age: 30);
var (name, age, city) = person;     // ❌ 3 elements expected, 2 given

// Fix: Match the count
var (name, age) = person;           // ✓
// Or ignore with discard
var (name, age, _) = person;        // ❌ Still 2 elements, can't add 3rd
```

### Element assignment when unpacking positionally

**Cause:** Using named unpacking wrongly; names don't match the tuple's order.

```csharp
var t = (X: 10, Y: 20);
var (y, x) = t;                     // Names ignored; unpacks by position!
// y = 10 (first element)
// x = 20 (second element)

// Fix: Use correct position or the tuple's names
var (x, y) = t;                     // ✓ Correct order
var x = t.X; var y = t.Y;           // ✓ Use names
```

### Trying to name elements after creation

**Cause:** Tuple element names exist at compile time; you can't rename at runtime.

```csharp
var t = (1, 2);                     // No names
t.X                                 // ❌ Element X doesn't exist

// Fix: Name elements when creating
var t = (X: 1, Y: 2);               // ✓
```

### Cannot return anonymous tuple type

**Cause:** Trying to return a tuple without declaring its type.

```csharp
public var GetData()                // ❌ Can't use var as return type
{
    return (1, "hello");
}

// Fix: Declare the full tuple type
public (int, string) GetData()      // ✓
{
    return (1, "hello");
}

// Or with names
public (int Id, string Value) GetData()  // ✓
{
    return (1, "hello");
}
```

### IndexOutOfRangeException using Item indexing

**Cause:** Accessing `Item3` when tuple only has 2 elements.

```csharp
var t = (1, 2);
Console.WriteLine(t.Item3);         // ❌ IndexOutOfRangeException

// Fix: Only access existing elements
Console.WriteLine(t.Item1);         // ✓
Console.WriteLine(t.Item2);         // ✓
```

## Tuple field initialization from matching variables

```csharp
int x = 10;
string name = "Alice";

// Names inferred from variables (C# 7.1+)
var tuple = (x, name);
Console.WriteLine(tuple.x);         // 10 (inferred name)
Console.WriteLine(tuple.name);      // Alice (inferred name)

// Or explicit
var tuple2 = (X: x, Name: name);
Console.WriteLine(tuple2.X);        // 10
```

## Links to detailed notes

- [C# Tuples Basics](/content/notes/csharp-tuples-basics.md) – Syntax and core concepts.
- [C# Tuple Deconstruction and Discards](/content/notes/csharp-tuple-deconstruction-and-discards.md) – Unpacking and discarding.
- [C# Tuples as Return Values](/content/notes/csharp-tuples-as-return-values.md) – Using tuples in methods.
- [C# Where to Use Tuples](/content/notes/csharp-where-to-use-tuples.md) – Design patterns and best practices.
- [C# Tuples vs Anonymous Types and Records](/content/notes/csharp-tuples-vs-anonymous-types-and-records.md) – Type comparisons.
- [Classes and Members Overview](/content/notes/csharp-classes-and-members-overview.md) – When to use classes instead.
