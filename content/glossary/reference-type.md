---
term: Reference type
fullName: Reference type
category: C# Language
tags: [csharp, type, memory, heap, reference semantics]
date: 2026-11-25
---

## In short
A reference type is a C# type whose data is stored on the heap; variables hold a reference (address) to the data, not the data itself.

## What it means for a C# developer
Reference types (like `class`, `string`, `array`) are stored on the heap. When you assign a reference type to another variable, both variables reference the same object—changes via one variable are visible through the other. This contrasts with value types (like `int`, `struct`), which are copied on assignment.

**Key distinction:** Reference type shared by reference; value type copied on assignment.

```csharp
// Reference type: shared reference
var list1 = new List<int> { 1, 2 };
var list2 = list1;      // Both reference the same list
list2.Add(3);
Console.WriteLine(list1.Count);  // 3 (changed via list2)

// Value type: copied
int x = 10;
int y = x;      // Copy the value
y = 20;
Console.WriteLine(x);  // 10 (original unchanged)
```

## Example
Built-in reference types: `string`, `object`, `array`, `List<T>`, `Dictionary<K,V>`.

Custom reference types: `class`, `record`, `interface`, `delegate`.

## Related terms
- [Value type](/glossary/value-type)
- [Class](/glossary/class) (if it exists)
- [Record](/glossary/record)
- [Struct](/glossary/struct)
- [Boxing](/glossary/boxing)
