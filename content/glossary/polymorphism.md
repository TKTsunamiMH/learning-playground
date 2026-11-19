---
term: Polymorphism
fullName: Polymorphism (Many Forms)
category: OOP & Design
tags: [csharp, oop, design, patterns]
date: 2026-11-19
---

## In short
Polymorphism is the ability for one name or type to have many behaviors, depending on the actual type or context.

## What it means for a .NET Full Stack developer
Polymorphism is everywhere in C#: virtual methods, interfaces, overloading, and generics.  
It lets you write flexible code that depends on base types or interfaces instead of concrete classes.  
This makes adding new types easy without changing existing code, improves testability, and reduces if/else chains.  
Master it to write cleaner, more maintainable services and domain logic.

## Example
```csharp
List<Shape> shapes = new() { new Circle(5), new Rectangle(3, 4) };
foreach (var shape in shapes)
    Console.WriteLine(shape.Area());  // Different Area() behavior per type
```

## Related terms
- [OOP](/glossary/oop)
- [Inheritance](/glossary/inheritance) (not yet; use the concept)
- [Interfaces](/glossary/interface) (not yet; use the concept)
- [SOLID](/glossary/solid)
- [Design Patterns](/glossary/design-patterns) (not yet)
- [Dependency Injection (DI)](/glossary/dependency-injection-di)
