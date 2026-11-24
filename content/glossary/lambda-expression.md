---
term: Lambda expression
fullName: Anonymous function using =>
category: C# Language
tags: [csharp, function, lambda, anonymous]
date: 2026-11-24
---

## In short
A lambda expression is an anonymous function using `=>` syntax to define a quick, inline function.

## What it means for a C# developer
Lambda expressions are essential for LINQ queries. They let you pass behavior (filtering, transforming) without defining a separate method. 

Syntax: `input => operation`

```csharp
// Lambda: "x such that x is greater than 10"
x => x > 10

// With parameter types: input => output
Func<int, bool> isPositive = x => x > 0;
isPositive(5);  // true
```

## Example
```csharp
var adults = people.Where(p => p.Age >= 18).ToList();
//                        ^^^^^^^^^^^^^^^^^^^^
//                        Lambda expression
```

The lambda `p => p.Age >= 18` is shorthand for a full method `bool IsAdult(Person p) { return p.Age >= 18; }`

## Related terms
- [LINQ](/glossary/linq)
- [Delegate](/glossary/delegate) (if it exists, or just function type)
- [Anonymous types](/glossary/anonymous-types) (if it exists)

