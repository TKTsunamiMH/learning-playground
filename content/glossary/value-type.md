---
term: Value type
fullName: Value type
category: C# Language
tags: [csharp, type, memory, stack, copy semantics]
date: 2026-11-25
---

## In short
A value type is a C# type whose data is stored on the stack and copied when assigned or passed to a method.

## What it means for a C# developer
Value types (like `int`, `bool`, `struct`) are fast because they live on the stack. When you assign a value type to another variable, the data is copied—changes to the copy don't affect the original. This contrasts with reference types (like `class`), where variables share a reference to heap-allocated data.

**Key distinction:** Value type copied on assignment; reference type shared by reference.

```csharp
// Value type: copied
int x = 10;
int y = x;      // Copy the value
y = 20;
Console.WriteLine(x);  // 10 (original unchanged)

// Reference type: shared
var list1 = new List<int> { 1, 2 };
var list2 = list1;      // Share the reference
list2.Add(3);
Console.WriteLine(list1.Count);  // 3 (both point to same list)
```

## Example
Built-in value types: `int`, `double`, `bool`, `char`, `decimal`.

Custom value types: `struct`, `record struct`, enums.

## Related terms
- [Reference type](/glossary/reference-type)
- [Struct](/glossary/struct)
- [Boxing](/glossary/boxing)
- [Memory](/glossary/memory) (if it exists)
