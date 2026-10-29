---
term: Unit Test
fullName: Unit Test
category: Testing
tags: [testing, quality, xunit]
date: 2026-10-29
---

## In short
A unit test verifies a small piece of logic in isolation.

## What it means for a .NET Full Stack developer
You test services, validators, and utility methods without external dependencies.  
Fast unit tests help catch regressions during local development and CI.  
They pair well with DI and mocking to isolate behavior.

## Example
```csharp
[Fact] public void CalculatesTotal() { }
```

## Related terms
- [xUnit](/glossary/xunit)
- [Mocking](/glossary/mocking)
- [TDD](/glossary/tdd)

