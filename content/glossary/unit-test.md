---
term: Unit Test
fullName: Unit Test
category: Testing
tags: [testing, quality, xunit, automation]
date: 2026-11-27
---

## In short
A unit test verifies a small piece of logic (a "unit," like a method) in isolation, automatically checking that it behaves as expected.

## What it means for a .NET Full Stack developer
You test services, validators, calculators, and business logic without external dependencies (database, HTTP, file system).  
Fast unit tests run in milliseconds, catch regressions early during local development and CI, and serve as documentation of expected behavior.  
They pair well with [Dependency Injection (DI)](/glossary/dependency-injection-di) and [Mocking](/glossary/mocking) to isolate the code you're testing.  
Professional teams and CI/CD pipelines require comprehensive unit tests.

## Example
```csharp
[Fact]
public void Add_TwoNumbers_ReturnsSum()
{
    var calc = new Calculator();
    int result = calc.Add(2, 3);
    Assert.Equal(5, result);  // ✓ PASSED
}
```

## Related terms
- [xUnit](/glossary/xunit)
- [Mocking](/glossary/mocking)
- [TDD](/glossary/tdd)
- [Integration Test](/glossary/integration-test)
- [CI/CD](/glossary/ci-cd)
- [Dependency Injection (DI)](/glossary/dependency-injection-di)

