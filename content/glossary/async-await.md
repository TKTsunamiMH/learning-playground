---
term: async/await
fullName: Asynchronous Programming in C#
category: Backend & .NET
tags: [csharp, performance, backend]
date: 2026-10-29
---

## In short
`async/await` is a C# pattern for non-blocking operations like I/O calls.

## What it means for a .NET Full Stack developer
In ASP.NET Core, async endpoints improve scalability by freeing threads during waits.  
You use it for database, HTTP, and file operations.  
Correct async usage helps avoid deadlocks and improves API responsiveness.

## Example
```csharp
var customer = await dbContext.Customers.FindAsync(id);
```

## Related terms
- [ASP.NET Core](/glossary/aspnet-core)
- [EF Core](/glossary/ef-core)
- [API](/glossary/api)

