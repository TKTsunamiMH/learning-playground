---
term: IEnumerable
fullName: Interface for iterable collections
category: C# Language
tags: [csharp, interface, collection, iteration]
date: 2026-11-24
---

## In short
`IEnumerable<T>` is an interface that represents a collection you can iterate over. It's the foundation of LINQ.

## What it means for a C# developer
Any type that implements `IEnumerable<T>` can be queried with LINQ. This includes arrays, lists, dictionaries, sets, strings, database queries, and custom collections.

```csharp
// All these implement IEnumerable<T> (or similar)
int[] array = [1, 2, 3];           // IEnumerable<int>
List<string> list = ["a", "b"];    // IEnumerable<string>
string text = "hello";             // IEnumerable<char>
DbSet<User> users = ...;           // IQueryable<User> (extends IEnumerable)
```

You iterate with `foreach` or LINQ methods:

```csharp
var numbers = new[] { 1, 2, 3 };

// foreach (requires IEnumerable)
foreach (var n in numbers) { ... }

// LINQ (also requires IEnumerable, extends to IQueryable)
var evens = numbers.Where(x => x % 2 == 0);
```

**IEnumerable vs IQueryable**: `IEnumerable<T>` is for in-memory collections (LINQ to Objects). `IQueryable<T>` extends it for remote data (EF Core builds SQL).

## Example
```csharp
public List<User> GetActiveUsers(IEnumerable<User> users)
{
    // Any IEnumerable<User> works: list, array, DbSet, etc.
    return users.Where(u => u.IsActive).ToList();
}
```

## Related terms
- [LINQ](/glossary/linq)
- [Interface](/glossary/oop) (OOP concept)
- [Lambda expression](/glossary/lambda-expression)

