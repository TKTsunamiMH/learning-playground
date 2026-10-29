---
term: Minimal API
fullName: ASP.NET Core Minimal API
category: Backend & .NET
tags: [aspnet-core, api, backend]
date: 2026-10-29
---

## In short
Minimal API is a lightweight way to define HTTP endpoints in ASP.NET Core with less boilerplate.

## What it means for a .NET Full Stack developer
It is useful for small services, prototypes, and focused backend endpoints.  
You still get DI, middleware, and model binding features from ASP.NET Core.  
It can coexist with controllers in larger systems when needed.

## Example
```csharp
app.MapPost("/todos", (TodoDto dto) => Results.Created($"/todos/{dto.Id}", dto));
```

## Related terms
- [ASP.NET Core](/glossary/aspnet-core)
- [API](/glossary/api)
- [DTO](/glossary/dto)

