---
title: C# Struct and Record Cheatsheet
topic: C#
tags: [csharp, cheatsheet, struct, record, syntax, reference]
date: 2026-11-25
---

# C# Struct and Record Cheatsheet

Quick reference for struct and record syntax, declarations, and common patterns.

## Syntax at a glance

| Feature | Syntax | Example |
|---------|--------|---------|
| **Struct declaration** | `public struct Name { }` | `public struct Point { public int X; public int Y; }` |
| **Readonly struct** | `public readonly struct Name { }` | `public readonly struct Vector2 { public int X { get; } }` |
| **Ref struct** | `public ref struct Name { }` | `public ref struct StackOnly { }` |
| **Record class** | `public record Name(params);` | `public record Person(string Name, int Age);` |
| **Record struct** | `public record struct Name(params);` | `public record struct Point(int X, int Y);` |
| **Positional record** | `record Type(Type1 prop1, Type2 prop2);` | `record User(int Id, string Name);` |
| **Non-positional record** | `record Type { public Type prop { get; init; } }` | `record User { public int Id { get; init; } }` |
| **With expression** | `var newRecord = old with { Prop = value };` | `var p2 = p1 with { Age = 31 };` |
| **Deconstruct record** | `var (var1, var2) = record;` | `var (name, age) = person;` |

## Struct syntax and patterns

### Basic struct

```csharp
public struct Rectangle
{
    public int Width;
    public int Height;

    public Rectangle(int width, int height)
    {
        Width = width;
        Height = height;
    }

    public int Area => Width * Height;
}

var rect = new Rectangle(10, 20);
Console.WriteLine(rect.Area);  // 200
```

### Readonly struct (C# 7.2+)

```csharp
public readonly struct Point
{
    public int X { get; }
    public int Y { get; }

    public Point(int x, int y)
    {
        X = x;
        Y = y;
    }
}

// Properties are init-only or readonly
// Point p = new Point(10, 20);
// p.X = 50;  // ❌ Error: readonly field cannot be modified
```

### C# 10+: Parameterless constructor and field initializers

```csharp
public struct Circle
{
    public int Radius = 5;  // Field initializer

    public Circle()         // Parameterless constructor
    {
        Radius = 1;
    }

    public Circle(int radius)
    {
        Radius = radius;
    }
}

var c1 = new Circle();      // Radius = 1
var c2 = new Circle(10);    // Radius = 10
```

### Nullable struct

```csharp
public struct Temperature
{
    public double Celsius;
}

Temperature? t1 = null;              // Can be null with ?
Temperature? t2 = new Temperature { Celsius = 25 };

if (t1 is not null)
    Console.WriteLine(t1.Value.Celsius);
```

## Record syntax and patterns

### Positional record class

```csharp
public record Person(string Name, int Age);

var p = new Person("Alice", 30);
Console.WriteLine(p);  // Person { Name = Alice, Age = 30 }

// Auto-generated: properties (init-only), constructor, Deconstruct, ToString, Equals, GetHashCode
```

### Positional record struct

```csharp
public record struct Point(int X, int Y);

var p = new Point(10, 20);
Console.WriteLine(p);  // Point { X = 10, Y = 20 }

// Properties are readonly (fully immutable)
// p.X = 50;  // ❌ Error
```

### Non-positional record

```csharp
public record Person
{
    public string Name { get; init; }
    public int Age { get; init; }
}

var p = new Person { Name = "Alice", Age = 30 };
Console.WriteLine(p);  // Person { Name = Alice, Age = 30 }
```

### Record with inheritance

```csharp
public record Person(string Name, int Age);

public record Employee(string Name, int Age, string EmployeeId) : Person(Name, Age);

var emp = new Employee("Alice", 30, "EMP123");
Console.WriteLine(emp);  // Employee { Name = Alice, Age = 30, EmployeeId = EMP123 }
```

### Sealed record

```csharp
public sealed record User(int Id, string Name);

// Cannot inherit from sealed record
// public record AdminUser(int Id, string Name, bool IsAdmin) : User(Id, Name);  // ❌
```

## With expression

Create a copy of a record with one or more fields changed:

```csharp
public record Person(string Name, int Age);

var p1 = new Person("Alice", 30);
var p2 = p1 with { Age = 31 };
var p3 = p1 with { Name = "Bob", Age = 25 };

Console.WriteLine(p1.Age);  // 30 (original unchanged)
Console.WriteLine(p2.Age);  // 31 (new record)

// Note: shallow copy (reference fields are shared)
public record PersonWithList(string Name, List<string> Hobbies);
var person1 = new PersonWithList("Alice", new List<string> { "reading" });
var person2 = person1 with { Name = "Bob" };
person2.Hobbies.Add("gaming");
Console.WriteLine(person1.Hobbies.Count);  // 2 (shared list)
```

## Deconstruction

Automatically supported by records and tuples:

```csharp
public record Person(string Name, int Age);

var person = new Person("Alice", 30);
var (name, age) = person;  // Deconstruct

Console.WriteLine($"{name} is {age}");  // Alice is 30

// With discard
var (n, _) = person;  // Ignore age
```

## The big comparison table: tuple, class, struct, record

| | Tuple | Class | Struct | Record Class | Record Struct |
|---|-------|-------|--------|--------------|---------------|
| **Type** | Value | Reference | Value | Reference | Value |
| **Equality** | By value | By identity | By value | By value | By value |
| **Mutable** | ✓ | ✓ | ✓ | ✗ | ✗ |
| **Can be null** | ✗ | ✓ | ✗ | ✓ | ✗ |
| **ToString** | Generic | ✗ | ✗ | ✓ | ✓ |
| **Equals/GetHashCode** | ✓ | ✗ | ✓ | ✓ | ✓ |
| **Deconstruct** | ✓ | ✗ | ✗ | ✓ | ✓ |
| **With expression** | ✗ | ✗ | ✗ | ✓ | ✓ |
| **Inheritance** | ✗ | ✓ | ✗ | ✓ (from records) | ✗ |
| **Methods** | ✗ | ✓ | ✓ | ✓ | ✓ |
| **Heap allocation** | ✗ | ✓ | ✗ | ✓ | ✗ |
| **Best for** | Quick returns | Objects, entities | Small values | Immutable data, DTOs | Small immutable values |

## Decision guide: which one when?

- **Temporary 2–3 value return** → **Tuple** (`(int, string)`)
- **Small, immutable value** (≤16 bytes) → **Struct** or **Record Struct**
- **Immutable data, value equality** → **Record Class** or **Record Struct**
- **Object with identity and mutable state** → **Class**
- **Database entity** → **Class** (or use record as DTO, map to class)
- **Domain event, command, message** → **Record Class**
- **API DTO, request/response** → **Record Class**
- **Game vector, math primitive** → **Readonly Struct** or **Record Struct**

## Where records are preferred

- **DTOs and API models** – Clean syntax, model binding, JSON serialization work seamlessly.
- **Immutable domain values** – EmailAddress, Money, Coordinates, all representable as records.
- **Domain events and commands** – Event-driven apps benefit from records' immutability and clean `ToString`.
- **Configuration objects** – Immutability, value equality, easy to log.
- **Operation results** – `LoginResult(bool Success, string? Error)` is cleaner than a class.
- **Dictionary keys and HashSet items** – Value-based `Equals` and `GetHashCode` work correctly.
- **Test assertions** – Value equality makes `Assert.Equal(expected, actual)` simple.
- **LINQ projections** – Named record types are clearer and reusable vs. anonymous types.
- **Pattern matching** – Positional patterns work elegantly with records.

**NOT preferred:** EF Core entities (use class), mutable business objects (use class), types requiring reference identity (use class).

## Common errors and fixes

### Error CS1612: Cannot modify returned value

You try to modify a struct retrieved from a collection:

```csharp
var points = new List<Point> { new Point { X = 1, Y = 2 } };

// ❌ Error CS1612: cannot modify the return value of a property
// points[0].X = 100;

// ✓ Fix: get, modify, reassign
Point p = points[0];
p.X = 100;
points[0] = p;
```

### Boxing surprises

A struct treated as `object` or interface gets boxed (wrapped in an object on the heap), negating performance benefits:

```csharp
public struct Point { public int X; }

Point p = new Point { X = 10 };
object o = p;  // ❌ Boxing: Point wrapped in object on heap

// Avoid boxing structs in hot paths
IComparable c = p;  // ❌ Boxing again

// ✓ Better: call methods directly on the struct
string s = p.ToString();  // No boxing
```

**Fix:** Use generic collections and methods; avoid treating structs as `object` or interfaces.

### Shallow copy with `with` expression

The `with` expression creates a shallow copy. Reference fields (lists, arrays, objects) are shared:

```csharp
public record Person(string Name, List<string> Hobbies);

var p1 = new Person("Alice", new List<string> { "reading" });
var p2 = p1 with { Name = "Bob" };

p2.Hobbies.Add("gaming");
Console.WriteLine(p1.Hobbies.Count);  // 2 (p1's list changed!)

// ✓ Fix: use immutable collections
using System.Collections.Immutable;
public record PersonImmutable(string Name, ImmutableList<string> Hobbies);

var p1 = new PersonImmutable("Alice", ImmutableList.Create("reading"));
var p2 = p1 with { Hobbies = p1.Hobbies.Add("gaming") };  // Safe
```

## Quick recap

- **Struct** syntax: `public struct Name { ... }`; use `readonly struct` for immutability.
- **Record** syntax: `public record Name(fields);` or `record struct Name(fields);`.
- **Positional record:** Auto-generates properties, constructor, `Deconstruct`, `ToString`, `Equals`.
- **Init-only properties:** Records are immutable by default; use `with` for non-destructive mutation.
- **Value-based equality:** Two records with the same values are equal (unlike classes).
- **Common mistakes:** Large mutable structs, CS1612 errors, boxing surprises, shallow copies with `with`.
- **Rule of thumb:** Tuple for simple returns, struct for small values, record for immutable data, class for objects with identity and behavior.

## Related notes

- [C# Structs](/content/notes/csharp-structs.md)
- [C# Records](/content/notes/csharp-records.md)
- [C# Struct vs Class](/content/notes/csharp-struct-vs-class.md)
- [C# Record vs Class vs Struct vs Tuple](/content/notes/csharp-record-vs-class-vs-struct.md)
- [Where Records Are Preferred](/content/notes/csharp-where-records-are-preferred.md)
