---
title: C# Unit Testing Basics
topic: C#
tags: [csharp, unit-test, testing, quality, automation]
date: 2026-11-27
---

# C# Unit Testing Basics

A **unit test** is a small, automated program that checks that a specific piece of code (called a "unit," typically a method) behaves as expected. Unit tests run in seconds, catch regressions early, document code behavior, and are essential for safe refactoring and professional development workflows.

## Why write unit tests?

- **Find bugs early**: Catch problems during development, not in production or during code review.
- **Safe refactoring**: Change code with confidence; tests verify that behavior hasn't changed.
- **Document behavior**: Tests show how code is *supposed* to work—better than comments that become outdated.
- **Confidence**: Tests give you and your team confidence when modifying or extending code.
- **Professional practice**: Most professional teams and CI/CD pipelines require tests.

## Test types in short

The **test pyramid** shows the recommended mix of tests:

```
        /\       E2E Tests (few, slow)
       /  \      Test multiple systems end-to-end
      /    \
     /      \    Integration Tests (some, medium speed)
    /        \   Test multiple components together
   /          \
  /            \ Unit Tests (many, fast)
 /              \ Test a single method or class
/______________\
```

| Test Type | Scope | Speed | Frequency | Example |
|-----------|-------|-------|-----------|---------|
| **Unit Test** | Single method/class | Very fast (ms) | Most tests | Test `Calculator.Add()` |
| **Integration Test** | Multiple components | Slower (seconds) | Moderate | Test API endpoint with database |
| **End-to-End (E2E)** | Full system | Slowest (seconds) | Few | Test complete user workflow in a browser |

**Unit tests** dominate because they're fast, isolated, and give immediate feedback. Integration and E2E tests are valuable but slower, so use fewer of them.

## The Arrange-Act-Assert (AAA) pattern

Every unit test follows a simple three-step pattern:

1. **Arrange**: Set up the objects and data needed for the test.
2. **Act**: Call the method under test with the prepared inputs.
3. **Assert**: Check that the result is what you expected.

Here's a complete example:

```csharp
public class Calculator
{
    public int Add(int a, int b) => a + b;
}

[Fact]
public void Add_TwoNumbers_ReturnsSum()
{
    // Arrange: prepare the test
    var calculator = new Calculator();
    int a = 2;
    int b = 3;
    int expected = 5;

    // Act: call the method under test
    int result = calculator.Add(a, b);

    // Assert: check the result
    Assert.Equal(expected, result);
}

// Output: ✓ PASSED
```

**Clarity tip**: Use comments to mark each section clearly, especially when learning. As you get comfortable, the structure becomes obvious and comments are optional.

Another example with a `BankAccount` class:

```csharp
public class BankAccount
{
    public decimal Balance { get; private set; }

    public void Deposit(decimal amount)
    {
        if (amount <= 0) throw new ArgumentException("Amount must be positive");
        Balance += amount;
    }
}

[Fact]
public void Deposit_ValidAmount_IncreasesBalance()
{
    // Arrange
    var account = new BankAccount();
    decimal depositAmount = 100m;

    // Act
    account.Deposit(depositAmount);

    // Assert
    Assert.Equal(100m, account.Balance);
}

// Output: ✓ PASSED
```

## What makes a good unit test? (FIRST principles)

A good unit test is:

- **Fast**: Runs in milliseconds; no I/O, database, or network calls.
- **Isolated**: Tests one thing in isolation; unaffected by other tests or external state.
- **Repeatable**: Produces the same result every time, regardless of environment or time.
- **Self-checking**: Automatically verifies its own result; no manual inspection needed.
- **Readable**: Clear naming and structure so anyone can understand what it tests and why.

A test that takes 10 seconds, flakes randomly, depends on a database, or has unclear intent is not a good unit test.

## What to test and what not to test

**✓ Test this:**
- Business logic and calculations (discount rules, validators, algorithms)
- Boundary cases and edge cases (null, empty, zero, negative, min/max values)
- Error cases and exceptions (invalid input, expected errors)
- Interaction with dependencies (did we call the logger? did we pass the right arguments?)

**✗ Don't test this:**
- Trivial properties or getters/setters with no logic
- Framework code (BCL and third-party libraries already have tests)
- Private methods directly (test through public behavior instead)
- UI rendering details (use integration tests for that; test the business logic behind the UI)
- Pure framework features (like LINQ operators)

**Example: What not to test**

```csharp
public class Person
{
    public string Name { get; set; }  // ← Don't test: trivial property
    public int Age { get; set; }      // ← Don't test: trivial property
}

// ❌ Not worth testing (framework behavior)
[Fact]
public void Name_SetValue_ReturnsValue()
{
    var person = new Person { Name = "Alice" };
    Assert.Equal("Alice", person.Name);
}

// ✓ Worth testing (actual logic)
[Fact]
public void IsAdult_Age18Plus_ReturnsTrue()
{
    var person = new Person { Age = 18 };
    Assert.True(person.IsAdult);  // IsAdult is a method with logic
}
```

## Common mistakes

- **Testing implementation details instead of behavior**: If you refactor the internals but behavior stays the same, your test should still pass. Tests that break on internal changes are fragile.

```csharp
// ❌ Bad: tests the internals (how it works)
[Fact]
public void CalculateDiscount_CallsSpecialRuleMethod()
{
    // This test would break if you refactor the internal method names
}

// ✓ Good: tests the behavior (what it does)
[Fact]
public void CalculateDiscount_VipCustomer_Returns20Percent()
{
    var customer = new Customer { IsVip = true };
    decimal discount = OrderService.CalculateDiscount(customer);
    Assert.Equal(0.20m, discount);
}
```

- **Too many assertions in one test**: Each test should verify one concept. If multiple assertions fail, it's hard to know which one broke the behavior.

```csharp
// ❌ Bad: tests multiple unrelated things
[Fact]
public void ProcessOrder_ValidOrder_Works()
{
    var order = new Order { Items = [...] };
    order.Process();
    Assert.Equal(OrderStatus.Processed, order.Status);
    Assert.NotNull(order.ProcessedAt);
    Assert.True(order.ConfirmationSent);
    Assert.Equal(2, emailServiceCalls);  // Too many ideas
}

// ✓ Good: focused, one concept per test
[Fact]
public void ProcessOrder_ValidOrder_SetsStatusToProcessed()
{
    var order = new Order { Items = [...] };
    order.Process();
    Assert.Equal(OrderStatus.Processed, order.Status);
}

[Fact]
public void ProcessOrder_ValidOrder_SendsConfirmationEmail()
{
    var order = new Order { Items = [...] };
    order.Process();
    Assert.True(order.ConfirmationSent);
}
```

- **Tests that depend on each other or on order**: Each test should be independent. If test A must run before test B, your tests are fragile.

```csharp
// ❌ Bad: test B depends on A
private static int counter = 0;

[Fact]
public void Test_A_IncrementCounter()
{
    counter++;  // Shared state across tests
}

[Fact]
public void Test_B_CheckCounter()
{
    Assert.Equal(1, counter);  // Fails if A didn't run first
}

// ✓ Good: each test is independent
[Fact]
public void Service_Initialize_StartsWithZero()
{
    var service = new MyService();
    Assert.Equal(0, service.Count);
}

[Fact]
public void Service_Increment_RaisesCountByOne()
{
    var service = new MyService();
    service.Increment();
    Assert.Equal(1, service.Count);
}
```

## Quick recap

- A unit test verifies that a small piece of code behaves as expected.
- Unit tests are fast, automated, and run in milliseconds.
- The Arrange-Act-Assert (AAA) pattern structures every test: set up data, run the method, check the result.
- Good unit tests are **Fast, Isolated, Repeatable, Self-checking, Readable** (FIRST).
- Test business logic and edge cases; don't test trivial properties or framework code.
- Each test should verify one concept and be independent of other tests.
- Avoid testing implementation details; test behavior instead.
- Professional development requires unit tests for safety, documentation, and CI/CD pipelines.
