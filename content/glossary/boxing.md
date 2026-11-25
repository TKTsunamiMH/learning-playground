---
term: Boxing
fullName: Boxing and unboxing
category: C# Language
tags: [csharp, type conversion, memory, performance, value type]
date: 2026-11-25
---

## In short
Boxing is the process of wrapping a value type (like `int` or `struct`) in an object on the heap when treated as `object` or an interface. Unboxing extracts the original value type from the box.

## What it means for a C# developer
Boxing happens implicitly when a value type is treated as `object` or converted to an interface. This creates a heap allocation and prevents the performance benefits of value types. Avoid boxing in hot code paths. See [C# Type Conversion](/content/notes/csharp-type-conversion.md) for more details.

**Boxing:** Value type → object on heap.  
**Unboxing:** object on heap → value type.

```csharp
int x = 42;
object o = x;              // ✓ Boxing: int wrapped in object on heap
int y = (int)o;            // ✓ Unboxing: extract the int

// Avoid: boxing in tight loops or hot paths
List<object> list = new();
for (int i = 0; i < 1000; i++)
    list.Add(i);           // ❌ Boxing on every iteration (expensive)

// Better: use generic collections
List<int> list = new();
for (int i = 0; i < 1000; i++)
    list.Add(i);           // ✓ No boxing (value stored directly)
```

## Example
Boxing with structs:

```csharp
public struct Point { public int X; }
Point p = new Point { X = 10 };

object o = p;              // ✓ Boxing (Point wrapped in object)
IComparable c = p;         // ✓ Boxing (Point wrapped in object)

string s = p.ToString();   // ✗ No boxing (direct call on struct)
```

## Related terms
- [Value type](/glossary/value-type)
- [Reference type](/glossary/reference-type)
- [Struct](/glossary/struct)
- [Type conversion](/glossary/type-conversion) (if it exists)
- [Memory](/glossary/memory) (if it exists)
