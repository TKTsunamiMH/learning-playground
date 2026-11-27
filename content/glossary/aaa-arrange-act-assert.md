---
term: AAA (Arrange-Act-Assert)
fullName: Arrange-Act-Assert Pattern
category: Testing
tags: [testing, pattern, unit-test, test-structure]
date: 2026-11-27
---

## In short
AAA is a simple three-step pattern that structures every unit test: prepare data (Arrange), run the method (Act), verify the result (Assert).

## What it means for a .NET Full Stack developer
Every test in xUnit follows AAA: set up test objects, call the method under test, then check the result with assertions.  
It makes tests clear and readable; anyone can see what's being tested and why.  
Using AAA consistently across your team improves code quality and reduces confusion.

## Example
```csharp
[Fact]
public void Withdraw_ValidAmount_DecreasesBalance()
{
    // Arrange: prepare the test
    var account = new BankAccount { Balance = 100m };
    decimal amount = 30m;

    // Act: call the method under test
    account.Withdraw(amount);

    // Assert: verify the result
    Assert.Equal(70m, account.Balance);
}
```

## Related terms
- [Unit Test](/glossary/unit-test)
- [xUnit](/glossary/xunit)
- [TDD](/glossary/tdd)
