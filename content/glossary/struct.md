---
term: Struct
fullName: Structure
category: C# Language
tags: [csharp, type, value type, memory, stack]
date: 2026-11-25
---

## In short
A struct is a custom value type in C# that stores data on the stack and is copied when assigned or passed to a method.

## What it means for a C# developer
Structs group related data (like `Point` with X and Y, or `DateTime`) without heap allocation. Use them for small, immutable values in performance-critical code. Unlike classes (reference types), structs are copied by value, so modifications to one copy don't affect others.

**Key distinction:** Struct is copied on assignment; class is shared by reference.

Syntax: `public struct Name { ... }`

```csharp
public struct Point
{
    public int X;
    public int Y;
}

Point p1 = new Point { X = 10, Y = 20 };
Point p2 = p1;        // Copy the struct
p2.X = 100;           // Modify the copy

Console.WriteLine(p1.X);  // 10 (original unchanged)
Console.WriteLine(p2.X);  // 100 (copy changed)
```

## Example
Common .NET structs: `int`, `double`, `DateTime`, `TimeSpan`, `Guid`, `KeyValuePair<K,V>`.

## Related terms
- [Value type](/glossary/value-type)
- [Reference type](/glossary/reference-type)
- [Record](/glossary/record)
- [Boxing](/glossary/boxing)
- [Class](/glossary/class) (if it exists)
