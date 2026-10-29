---
term: Middleware
fullName: ASP.NET Core Middleware Pipeline
category: Backend & .NET
tags: [aspnet-core, http, pipeline]
date: 2026-10-29
---

## In short
Middleware are components in the HTTP request pipeline that can inspect or modify requests and responses.

## What it means for a .NET Full Stack developer
You use middleware for logging, authentication, CORS, error handling, and routing setup.  
Order matters, because each middleware runs in sequence.  
Good middleware design keeps cross-cutting concerns separate from business logic.

## Example
```csharp
app.UseAuthentication();
app.UseAuthorization();
```

## Related terms
- [ASP.NET Core](/glossary/aspnet-core)
- [Pipeline](/glossary/pipeline)
- [CORS](/glossary/cors)

