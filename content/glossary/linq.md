---
term: LINQ
fullName: Language Integrated Query
category: Backend & .NET
tags: [csharp, querying, ef-core]
date: 2026-10-29
---

## In short
LINQ lets you query data in C# using readable, composable expressions.

## What it means for a .NET Full Stack developer
You use LINQ for in-memory collections and database queries through EF Core.  
It keeps filtering, projection, and sorting in strongly typed C# code.  
Understanding deferred execution helps avoid performance surprises.

## Example
```csharp
var activeUsers = users.Where(u => u.IsActive).ToList();
```

## Related terms
- [EF Core](/glossary/ef-core)
- [ORM](/glossary/orm)
- [SQL](/glossary/sql)

