---
term: IoC
fullName: Inversion of Control
category: Backend & .NET
tags: [architecture, patterns, di]
date: 2026-10-29
---

## In short
IoC is the broader principle that moves control of object creation and flow to a framework or container.

## What it means for a .NET Full Stack developer
DI in ASP.NET Core is one concrete way to apply IoC.  
Instead of manually wiring every dependency, the container resolves them for you.  
This helps modular design and keeps app startup configuration centralized.

## Example
Scenario: Controller dependencies are created by the DI container, not by `new` calls in the controller.

## Related terms
- [Dependency Injection (DI)](/glossary/dependency-injection-di)
- [ASP.NET Core](/glossary/aspnet-core)
- [SOLID](/glossary/solid)

