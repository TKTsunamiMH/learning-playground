---
term: xUnit
fullName: xUnit.net Testing Framework
category: Testing
tags: [dotnet, testing, unit-test, framework]
date: 2026-11-27
---

## In short
xUnit is the most popular testing framework for .NET applications; it's clean, fast, and integrates seamlessly with CI/CD.

## What it means for a .NET Full Stack developer
It is widely used for unit and integration tests in C# projects.  
xUnit integrates perfectly with `dotnet test` and GitHub Actions CI pipelines.  
Its simple attribute model (`[Fact]`, `[Theory]`) keeps test code readable and minimal.  
Test discovery and execution are automatic; it creates a fresh class instance for each test, ensuring isolation.  
You'll use `Assert.Equal()`, `Assert.True()`, `Assert.Throws<T>()` for verification.

## Example
```csharp
[Fact]
public void Add_TwoNumbers_ReturnsSum()
{
    var calc = new Calculator();
    Assert.Equal(5, calc.Add(2, 3));
}

// Run: dotnet test
// Output: ✓ PASSED
```

## Related terms
- [Unit Test](/glossary/unit-test)
- [Integration Test](/glossary/integration-test)
- [CI/CD](/glossary/ci-cd)
- [Mocking](/glossary/mocking)
- [TDD](/glossary/tdd)
