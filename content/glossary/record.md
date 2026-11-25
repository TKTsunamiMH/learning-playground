---
term: Record
fullName: Record type
category: C# Language
tags: [csharp, type, immutability, data, equality]
date: 2026-11-25
---

## In short
A record is a type (C# 9+) designed for immutable data with value-based equality and auto-generated useful methods like `ToString`.

## What it means for a C# developer
Records simplify data types. They automatically compare by content (not identity like classes), print nicely via auto-generated `ToString`, and support the `with` expression for non-destructive mutation. Use records for DTOs, immutable domain values, and API contracts.

**Two flavors:** `record` (reference type, like a class) and `record struct` (value type, like a struct).

Syntax: `public record Name(Type1 Prop1, Type2 Prop2);`

```csharp
public record Person(string Name, int Age);

var p1 = new Person("Alice", 30);
var p2 = new Person("Alice", 30);

Console.WriteLine(p1 == p2);     // true (value equality)
Console.WriteLine(p1);           // Person { Name = Alice, Age = 30 }

var p3 = p1 with { Age = 31 };   // Non-destructive mutation
Console.WriteLine(p1.Age);       // 30 (original unchanged)
Console.WriteLine(p3.Age);       // 31 (new record)
```

## Example
Positional record: `public record LoginResult(bool Success, string? Error);`

Non-positional record: `public record User { public string Name { get; init; } }`

## Related terms
- [Immutability](/glossary/immutability)
- [DTO](/glossary/dto)
- [Struct](/glossary/struct)
- [Class](/glossary/class) (if it exists)
- [Value type](/glossary/value-type)
- [Reference type](/glossary/reference-type)
