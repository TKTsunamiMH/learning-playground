---
term: Dependency Injection (DI)
fullName: Dependency Injection
category: Backend & .NET
tags: [patterns, aspnet-core, architecture]
date: 2026-10-29
---

## In short
DI is a pattern where dependencies are provided to a class instead of created inside it.

## What it means for a .NET Full Stack developer
ASP.NET Core has built-in DI, so services are registered and injected through constructors.  
This improves testability, reduces tight coupling, and supports cleaner architecture.  
You will use DI for repositories, HTTP clients, and domain services regularly.

## Example
```csharp
builder.Services.AddScoped<IOrderService, OrderService>();
```

## Related terms
- [IoC](/glossary/ioc)
- [Clean Architecture](/glossary/clean-architecture)
- [Unit Test](/glossary/unit-test)

