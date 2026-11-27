---
title: C# Unit Testing Cheatsheet
topic: C#
tags: [csharp, unit-test, cheatsheet, xunit, quick-reference]
date: 2026-11-27
---

# C# Unit Testing Cheatsheet

Quick reference for xUnit setup, assertions, test organization, and common patterns.

## Project setup commands

```bash
# Create a solution with two projects
dotnet new sln -n MyApp
dotnet new classlib -n MyApp
dotnet new xunit -n MyApp.Tests
dotnet sln add MyApp/MyApp.csproj MyApp.Tests/MyApp.Tests.csproj

# Link test project to production project
dotnet add MyApp.Tests/MyApp.Tests.csproj reference MyApp/MyApp.csproj

# Run tests
dotnet test

# Run specific test
dotnet test --filter "FullyQualifiedName~CalculatorTests.Add_TwoNumbers"
```

## Arrange-Act-Assert (AAA) pattern

Every test follows this structure:

```csharp
[Fact]
public void MethodName_Scenario_ExpectedResult()
{
    // Arrange: prepare test data
    var calculator = new Calculator();
    int a = 2, b = 3;

    // Act: call the method under test
    int result = calculator.Add(a, b);

    // Assert: verify the result
    Assert.Equal(5, result);
}
```

## [Fact] vs [Theory] with [InlineData]

| Use | Syntax | Example |
|-----|--------|---------|
| **Single test** | `[Fact]` | Test one specific case |
| **Multiple cases** | `[Theory]` with `[InlineData(...)]` | Test same logic with different inputs |

```csharp
// Single case
[Fact]
public void Add_TwoNumbers_ReturnsSum()
{
    Assert.Equal(5, calculator.Add(2, 3));
}

// Multiple cases
[Theory]
[InlineData(2, 3, 5)]
[InlineData(0, 0, 0)]
[InlineData(-1, 1, 0)]
public void Add_TwoNumbers_ReturnsSum(int a, int b, int expected)
{
    Assert.Equal(expected, calculator.Add(a, b));
}
```

## Essential Assert methods

| Method | Checks | Example |
|--------|--------|---------|
| `Assert.Equal(expected, actual)` | Equality | `Assert.Equal(5, result)` |
| `Assert.NotEqual(unexpected, actual)` | Inequality | `Assert.NotEqual(0, result)` |
| `Assert.True(condition)` | Condition is true | `Assert.True(isValid)` |
| `Assert.False(condition)` | Condition is false | `Assert.False(isEmpty)` |
| `Assert.Null(actual)` | Is null | `Assert.Null(result)` |
| `Assert.NotNull(actual)` | Is not null | `Assert.NotNull(user)` |
| `Assert.Empty(collection)` | Collection is empty | `Assert.Empty(list)` |
| `Assert.NotEmpty(collection)` | Collection is not empty | `Assert.NotEmpty(list)` |
| `Assert.Contains(item, collection)` | Collection contains item | `Assert.Contains(5, list)` |
| `Assert.Throws<T>(action)` | Exception is thrown | `Assert.Throws<ArgumentException>(() => method())` |
| `Assert.InRange(value, min, max)` | Value is in range | `Assert.InRange(age, 0, 150)` |
| `Assert.IsType<T>(actual)` | Exact type match | `Assert.IsType<FormatException>(ex)` |
| `Assert.StartsWith(expected, actual)` | String starts with | `Assert.StartsWith("Hello", greeting)` |
| `Assert.EndsWith(expected, actual)` | String ends with | `Assert.EndsWith(".com", email)` |

## Testing exceptions

```csharp
// Test that specific exception is thrown
[Fact]
public void Withdraw_NegativeAmount_ThrowsArgumentException()
{
    var account = new BankAccount { Balance = 100m };
    Assert.Throws<ArgumentException>(() => account.Withdraw(-10));
}

// Test exception message
[Fact]
public void Withdraw_NegativeAmount_HasCorrectMessage()
{
    var account = new BankAccount { Balance = 100m };
    var ex = Assert.Throws<ArgumentException>(() => account.Withdraw(-10));
    Assert.Equal("Amount must be positive", ex.Message);
}

// Test async exception
[Fact]
public async Task GetUserAsync_InvalidId_ThrowsException()
{
    await Assert.ThrowsAsync<ArgumentException>(() => service.GetUserAsync(-1));
}

// Assert.Throws<T> (exact type) vs Assert.ThrowsAny<T> (or derived)
Assert.Throws<ArgumentException>(() => method());      // Must be ArgumentException
Assert.ThrowsAny<Exception>(() => method());           // ArgumentException or derived
```

## Naming pattern

**MethodName_Scenario_ExpectedResult** – Clear and consistent:

```csharp
[Fact]
public void Add_TwoPositiveNumbers_ReturnsSum() { }

[Fact]
public void Withdraw_InsufficientFunds_ThrowsException() { }

[Fact]
public void ParseInt_InvalidString_ThrowsFormatException() { }

[Fact]
public void GetUser_NullId_ReturnsNull() { }
```

## Test double types

| Type | Purpose | When to use |
|------|---------|------------|
| **Stub** | Returns fixed values | Method needs a response; value doesn't matter to test |
| **Fake** | Working, simplified impl | Need real behavior but faster (in-memory DB) |
| **Mock** | Records calls; verifies interaction | Need to verify method was called with specific args |
| **Spy** | Records calls; still works | Verify interaction without replacing behavior |

## Mocking with Moq (quick patterns)

```csharp
using Moq;

// Setup: configure return value
var mockRepo = new Mock<IRepository>();
mockRepo.Setup(x => x.GetById(1)).Returns(new User { Id = 1, Name = "Alice" });

// Setup: return based on input
mockRepo.Setup(x => x.GetById(It.IsAny<int>())).Returns(new User { Id = 1 });

// Setup: throw exception
mockRepo.Setup(x => x.Delete(0)).Throws<ArgumentException>();

// Verify: check method was called
mockRepo.Verify(x => x.Save(It.IsAny<User>()), Times.Once);

// Verify: check method was called with specific args
mockRepo.Verify(x => x.Save(It.Is<User>(u => u.Id == 1)), Times.Once);

// Use mock in production code
var service = new UserService(mockRepo.Object);
var user = service.GetUser(1);
```

## Red-Green-Refactor cycle

```
1. RED: Write failing test
   [Fact]
   public void Add_Works() { Assert.Equal(5, calc.Add(2, 3)); }
   // Error: Calculator doesn't exist

2. GREEN: Write minimal code to pass
   public class Calculator { public int Add(int a, int b) => a + b; }
   // ✓ Test passes

3. REFACTOR: Improve (optional if already clean)
   // No changes needed; code is already good
```

## Test organization and isolation

```csharp
// ✓ Good: each test is independent, fresh instances
public class BankAccountTests
{
    [Fact]
    public void Deposit_100_BalanceIs100()
    {
        var account = new BankAccount();  // Fresh instance
        account.Deposit(100);
        Assert.Equal(100m, account.Balance);
    }

    [Fact]
    public void Deposit_200_BalanceIs200()
    {
        var account = new BankAccount();  // Different instance
        account.Deposit(200);
        Assert.Equal(200m, account.Balance);
    }
}

// ✓ Good: shared setup in constructor (runs before each test)
public class CalculatorTests
{
    private readonly Calculator calculator;

    public CalculatorTests()
    {
        calculator = new Calculator();  // Runs before EACH test
    }

    [Fact]
    public void Add_Works() => Assert.Equal(5, calculator.Add(2, 3));

    [Fact]
    public void Subtract_Works() => Assert.Equal(1, calculator.Subtract(3, 2));
}

// ✓ Good: cleanup with IDisposable
public class DatabaseTests : IDisposable
{
    private readonly TestDatabase db = new TestDatabase();

    [Fact]
    public void Query_ReturnsResults() => Assert.NotEmpty(db.Query("SELECT * FROM Users"));

    public void Dispose() => db.Close();
}
```

## Edge cases to test

Always test boundaries:

```csharp
[Theory]
[InlineData(null)]            // null
[InlineData("")]              // empty
[InlineData("   ")]           // whitespace
[InlineData("a")]             // minimum
[InlineData("abc")]           // normal
public void ValidateInput_EdgeCases(string input) { }

// Numbers
[Theory]
[InlineData(0)]               // zero
[InlineData(-1)]              // negative
[InlineData(int.MinValue)]    // minimum
[InlineData(int.MaxValue)]    // maximum
public void ValidateNumber_EdgeCases(int value) { }

// Lists
[Fact]
public void GetFirst_EmptyList_ThrowsException() 
    => Assert.Throws<InvalidOperationException>(() => list.First());

[Fact]
public void GetFirst_OneItem_ReturnsItem() => Assert.Equal(1, list.First());

[Fact]
public void GetLast_ReturnsLastItem() => Assert.Equal(5, list.Last());
```

## Common problems and fixes

| Problem | Error | Fix |
|---------|-------|-----|
| Tests not discovered | Tests don't appear in Test Explorer | Make test class and methods `public`; ensure `[Fact]` or `[Theory]` attribute |
| Missing project reference | `CS0103: 'ClassName' does not exist` | Run `dotnet add MyApp.Tests reference MyApp` |
| Class not accessible | `CS0122: inaccessible due to protection level` | Make class `public`, or add `[assembly: InternalsVisibleTo("MyApp.Tests")]` |
| Swapped expected/actual | Failure message is confusing | Remember: `Assert.Equal(expected, actual)` – expected first |
| Flaky double comparison | Test fails randomly on `double` | Use `precision` parameter: `Assert.Equal(0.3, result, precision: 10)` |
| Exception not tested properly | Test always passes, no exception validation | Use `Assert.Throws<T>()`, not try/catch in tests |

## What makes a good test checklist

- [ ] **Fast**: Runs in milliseconds; no I/O, database, or network calls
- [ ] **Isolated**: Doesn't depend on other tests or external state
- [ ] **Repeatable**: Passes every time, in any order
- [ ] **Self-checking**: Automatically verifies; no manual inspection
- [ ] **Readable**: Clear name and AAA structure; anyone can understand it
- [ ] **One concept**: Verifies one behavior per test
- [ ] **Independent**: Fresh setup; no shared state between tests
- [ ] **No logic**: No if/loops; straight-line code
- [ ] **Edge cases**: Includes null, empty, zero, boundaries

## Quick setup template

```csharp
using Xunit;

namespace MyApp.Tests;

public class CalculatorTests
{
    private readonly Calculator calculator = new();

    [Fact]
    public void Add_TwoNumbers_ReturnsSum()
    {
        // Arrange
        int a = 2, b = 3;

        // Act
        int result = calculator.Add(a, b);

        // Assert
        Assert.Equal(5, result);
    }

    [Theory]
    [InlineData(1, 1, 2)]
    [InlineData(2, 3, 5)]
    public void Add_MultipleInputs_ReturnsCorrect(int a, int b, int expected)
    {
        int result = calculator.Add(a, b);
        Assert.Equal(expected, result);
    }
}
```

## Related notes

- [C# Unit Testing Basics](/content/notes/csharp-unit-testing-basics.md)
- [C# xUnit First Test Project](/content/notes/csharp-xunit-first-test-project.md)
- [C# xUnit Assertions](/content/notes/csharp-xunit-assertions.md)
- [C# xUnit Facts, Theories, and Organization](/content/notes/csharp-xunit-facts-theories-and-organization.md)
- [C# Test Doubles and Mocking](/content/notes/csharp-test-doubles-and-mocking.md)
- [C# TDD and Testing Practices](/content/notes/csharp-tdd-and-testing-practices.md)

## Terminal commands

```bash
# Run all tests
dotnet test

# Run with verbose output
dotnet test --verbosity detailed

# Run specific test file
dotnet test MyApp.Tests/CalculatorTests.cs

# Run tests matching filter
dotnet test --filter "Name~Add"

# Run with coverage
dotnet test /p:CollectCoverage=true

# Debug a test (stop at breakpoint)
dotnet test --configuration Debug -- (use IDE debugger or `dotnet test --collect:"XPlat Code Coverage"`)
```
