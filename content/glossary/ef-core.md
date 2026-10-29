---
term: EF Core
fullName: Entity Framework Core
category: Backend & .NET
tags: [database, orm, csharp]
date: 2026-10-29
---

## In short
EF Core is the main .NET ORM for working with relational databases in C#.

## What it means for a .NET Full Stack developer
You map C# entities to tables and query with LINQ instead of writing every SQL statement manually.  
Migrations help version schema changes in source control.  
You still need SQL knowledge for indexing, query tuning, and data design.

## Example
```csharp
builder.Services.AddDbContext<AppDbContext>();
```

## Related terms
- [ORM](/glossary/orm)
- [Migration](/glossary/migration)
- [SQL](/glossary/sql)

