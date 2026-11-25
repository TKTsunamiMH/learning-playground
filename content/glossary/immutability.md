---
term: Immutability
fullName: Immutability
category: Software Design
tags: [design, immutable, state, functional, records]
date: 2026-11-25
---

## In short
Immutability means an object cannot be changed after creation. Its state remains constant throughout its lifetime.

## What it means for a C# developer
Immutable objects make code safer and easier to reason about. Once created, their data never changes. Use immutable types (like `string`, `record`, `readonly struct`) for domain values, DTOs, and configuration. For mutable objects (like classes), you must track when and how state changes, which is error-prone.

**Immutable:** State cannot be modified after construction.  
**Mutable:** State can be modified at any time.

```csharp
// Immutable record
public record Person(string Name, int Age);
var p1 = new Person("Alice", 30);
// p1.Name = "Bob";  // ❌ Error: init-only property cannot be set

// Create a copy with changes (non-destructive mutation)
var p2 = p1 with { Age = 31 };
Console.WriteLine(p1.Age);  // 30 (original unchanged)

// Mutable class
public class PersonClass
{
    public string Name { get; set; }
    public int Age { get; set; }
}
var c = new PersonClass { Name = "Alice", Age = 30 };
c.Name = "Bob";  // ✓ Can change (mutable)
```

## Example
Immutable types in C#: `string`, `record`, `readonly struct`, `Guid`, `DateTime`.

Mutable types: `List<T>`, `Dictionary<K,V>`, most `class` objects.

## Related terms
- [Record](/glossary/record)
- [Struct](/glossary/struct)
- [Value type](/glossary/value-type)
- [Reference type](/glossary/reference-type)
- [Functional programming](/glossary/functional-programming) (if it exists)
