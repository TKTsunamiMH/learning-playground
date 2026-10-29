---
term: Clean Architecture
fullName: Clean Architecture
category: Architecture & Patterns
tags: [architecture, boundaries, backend]
date: 2026-10-29
---

## In short
Clean Architecture organizes code into layers with clear boundaries, so core business rules stay independent.

## What it means for a .NET Full Stack developer
In .NET, domain logic sits away from infrastructure details like EF Core or HTTP frameworks.  
This can improve testability and long-term flexibility.  
Apply it pragmatically, because too many layers can slow small projects.

## Example
Scenario: Domain project has no direct references to ASP.NET Core or SQL providers.

## Related terms
- [SOLID](/glossary/solid)
- [Dependency Injection (DI)](/glossary/dependency-injection-di)
- [Unit Test](/glossary/unit-test)
