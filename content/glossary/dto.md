---
term: DTO
fullName: Data Transfer Object
category: Backend & .NET
tags: [api, backend, contracts]
date: 2026-10-29
---

## In short
A DTO is a simple object used to send or receive data between layers or over APIs.

## What it means for a .NET Full Stack developer
DTOs keep your API contract separate from your EF Core entities and domain models.  
They help avoid over-posting and leaking internal fields.  
Using DTOs makes versioning and frontend integration cleaner.

## Example
```csharp
public record UserDto(int Id, string Name);
```

## Related terms
- [API](/glossary/api)
- [EF Core](/glossary/ef-core)
- [JSON](/glossary/json)
