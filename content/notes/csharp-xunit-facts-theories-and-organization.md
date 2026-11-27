---
title: C# xUnit Facts, Theories, and Organization
topic: C#
tags: [csharp, unit-test, xunit, fact, theory, test-organization]
date: 2026-11-27
---

# C# xUnit Facts, Theories, and Organization

This note covers the difference between `[Fact]` (a fixed test) and `[Theory]` (a parameterized test), how to organize tests with clear naming, edge cases to test, and how xUnit handles test isolation and independence.

## [Fact] vs [Theory]

### [Fact]: a test without parameters

A `[Fact]` is a single test with no parameters. Use it for a specific scenario:

```csharp
[Fact]
public void Add_TwoNumbers_ReturnsSum()
{
    var calculator = new Calculator();
    int result = calculator.Add(2, 3);
    Assert.Equal(5, result);
}
```

### [Theory]: the same test with multiple data sets

A `[Theory]` runs the same test logic multiple times with different inputs. Use `[InlineData(...)]` to provide test data:

```csharp
[Theory]
[InlineData(2, 3, 5)]
[InlineData(0, 0, 0)]
[InlineData(-1, 1, 0)]
[InlineData(100, 200, 300)]
public void Add_TwoNumbers_ReturnsSum(int a, int b, int expected)
{
    var calculator = new Calculator();
    int result = calculator.Add(a, b);
    Assert.Equal(expected, result);
}

// Runs 4 times with:
// (2, 3, 5) ✓
// (0, 0, 0) ✓
// (-1, 1, 0) ✓
// (100, 200, 300) ✓
```

**Benefit**: Test multiple cases (including edge cases) with less repetition.

### When to use [Theory] with [InlineData]

Use `[Theory]` when you have multiple inputs to test the same logic:

```csharp
// Good: boundary cases for a discount calculator
[Theory]
[InlineData(0, 0.0)]       // No discount
[InlineData(100, 0.1)]     // 10% for $100
[InlineData(500, 0.2)]     // 20% for $500
[InlineData(1000, 0.3)]    // 30% for $1000
public void CalculateDiscount_VaryingAmounts_ReturnsCorrectDiscount(decimal amount, double expectedRate)
{
    var service = new DiscountService();
    double result = service.CalculateDiscountRate(amount);
    Assert.Equal(expectedRate, result, precision: 5);
}

// Good: edge cases for string validation
[Theory]
[InlineData(null)]      // null input
[InlineData("")]        // empty string
[InlineData("   ")]     // whitespace
[InlineData("abc")]     // too short
[InlineData("a")]       // minimum length
[InlineData("abcdef")]  // normal
public void ValidateUsername_VaryingInputs_ReturnsExpected(string input)
{
    bool result = UsernameValidator.IsValid(input);
    bool expected = input != null && input.Trim().Length >= 3;
    Assert.Equal(expected, result);
}
```

### [MemberData] and [ClassData] for complex scenarios

When `[InlineData]` isn't enough (e.g., complex objects), use:

- **`[MemberData(...)]`**: Reference a property or method that returns test data
- **`[ClassData(...)]`**: Reference a class that implements `IEnumerable<object[]>`

```csharp
// Define test data in a property
public static IEnumerable<object[]> ValidUserData =>
    new List<object[]>
    {
        new object[] { "alice@example.com", "password123", true },
        new object[] { "bob@example.com", "pw", false },  // too short
        new object[] { "", "password123", false },        // empty email
    };

// Use in [Theory]
[Theory]
[MemberData(nameof(ValidUserData))]
public void ValidateUser_VaryingInputs_ReturnsExpected(string email, string password, bool expected)
{
    bool result = UserValidator.IsValid(email, password);
    Assert.Equal(expected, result);
}
```

For simple cases, prefer `[InlineData]`. Use `[MemberData]` or `[ClassData]` only when data is complex or shared across tests.

## Naming tests clearly

A clear test name tells you:
1. **What is being tested** (the method or feature)
2. **What scenario** (the input or condition)
3. **What is expected** (the result)

### Pattern: MethodName_Scenario_ExpectedResult

This is the most common naming pattern:

```csharp
// Method_Scenario_ExpectedResult
[Fact]
public void Add_TwoPositiveNumbers_ReturnsSum()
{
    // ✓ Clear: testing Add() with positive numbers, expecting sum
}

[Fact]
public void Withdraw_InsufficientFunds_ThrowsException()
{
    // ✓ Clear: testing Withdraw() with insufficient funds, expecting exception
}

[Fact]
public void ParseInt_ValidString_ReturnsInteger()
{
    // ✓ Clear: testing ParseInt() with valid string, expecting integer
}

[Fact]
public void ParseInt_InvalidString_ThrowsFormatException()
{
    // ✓ Clear: testing ParseInt() with invalid string, expecting exception
}
```

### Alternative: Descriptive sentences

Some teams prefer natural language names:

```csharp
[Fact]
public void Should_Return_Sum_When_Adding_Two_Numbers()
{
    // ✓ Also clear, but longer
}

[Fact]
public void When_Withdrawing_More_Than_Balance_Then_Throws_Exception()
{
    // ✓ Also clear, but verbose
}
```

**Recommendation**: Use `MethodName_Scenario_ExpectedResult` for conciseness. Be consistent within your team.

### Good naming examples

```csharp
// ✓ Good names: specific scenario, clear outcome
public class DiscountServiceTests
{
    [Fact]
    public void CalculateDiscount_VipCustomer_Returns20Percent() { }

    [Fact]
    public void CalculateDiscount_RegularCustomer_Returns5Percent() { }

    [Fact]
    public void CalculateDiscount_ZeroOrderAmount_Returns0() { }
}

// ✗ Bad names: vague, unclear outcome
public class DiscountServiceTests
{
    [Fact]
    public void Test1() { }

    [Fact]
    public void DiscountTest() { }

    [Fact]
    public void WorksCorrectly() { }
}
```

## Testing edge cases and boundaries

Always test the **boundaries** where code is most likely to break:

| Boundary | Example |
|----------|---------|
| **Null** | `null` input |
| **Empty** | Empty string, empty list |
| **Zero** | 0, 0.0m |
| **Negative** | -1, -100 |
| **Maximum/Minimum** | `int.MaxValue`, `int.MinValue` |
| **First/Last** | First and last items in a list |
| **Off-by-one** | List length - 1, length, length + 1 |

```csharp
[Theory]
[InlineData(null)]                        // null
[InlineData("")]                          // empty
[InlineData("a")]                         // minimum valid
[InlineData("ab")]                        // just below limit
[InlineData("abc")]                       // at limit
[InlineData("abcd")]                      // just above limit
[InlineData("verylongstring...")]         // maximum
public void ValidateInput_EdgeCases_ReturnsCorrectly(string input)
{
    bool result = InputValidator.IsValid(input);
    // Test implementation here
}

public class ListTests
{
    private readonly List<int> list = new List<int> { 1, 2, 3, 4, 5 };

    [Fact]
    public void GetItem_FirstIndex_ReturnsFirstItem() => Assert.Equal(1, list[0]);

    [Fact]
    public void GetItem_LastIndex_ReturnsLastItem() => Assert.Equal(5, list[4]);

    [Fact]
    public void GetItem_OutOfBounds_ThrowsException() 
        => Assert.Throws<IndexOutOfRangeException>(() => { var _ = list[10]; });

    [Fact]
    public void RemoveAt_FirstIndex_RemovesFirst()
    {
        list.RemoveAt(0);
        Assert.DoesNotContain(1, list);
    }
}
```

See [Integer Types](/content/notes/csharp-integer-types.md), [Arrays](/content/notes/csharp-arrays.md), and [Lists](/content/notes/csharp-lists.md) for more on boundaries.

## Setup and cleanup in xUnit

### Constructor: runs before each test

xUnit creates a new test class instance for each test method. Use the constructor for setup:

```csharp
public class CalculatorTests
{
    private readonly Calculator calculator;

    public CalculatorTests()
    {
        // This runs before EACH test
        calculator = new Calculator();
    }

    [Fact]
    public void Add_Works() => Assert.Equal(5, calculator.Add(2, 3));

    [Fact]
    public void Subtract_Works() => Assert.Equal(-1, calculator.Subtract(2, 3));
    // Each test gets a fresh Calculator instance
}
```

### IDisposable: cleanup after each test

Implement `IDisposable` to clean up resources after each test:

```csharp
public class DatabaseTests : IDisposable
{
    private readonly TestDatabase db;

    public DatabaseTests()
    {
        db = new TestDatabase();
    }

    [Fact]
    public void Query_ReturnsResults()
    {
        var result = db.Query("SELECT * FROM Users");
        Assert.NotEmpty(result);
    }

    public void Dispose()
    {
        // Cleanup after the test
        db.Close();
        db.Dispose();
    }
}
```

### IClassFixture: shared setup (use sparingly)

If multiple tests need the same expensive setup (like a test database), use `IClassFixture<T>`:

```csharp
public class TestFixture : IAsyncLifetime
{
    public TestDatabase Database { get; private set; }

    // Called once before any test in the class runs
    public async Task InitializeAsync()
    {
        Database = new TestDatabase();
        await Database.InitializeAsync();
    }

    // Called once after all tests finish
    public async Task DisposeAsync()
    {
        await Database.DisposeAsync();
    }
}

public class SharedDatabaseTests : IClassFixture<TestFixture>
{
    private readonly TestFixture fixture;

    public SharedDatabaseTests(TestFixture fixture)
    {
        this.fixture = fixture;
    }

    [Fact]
    public void Test1_UsesSharedDatabase() => Assert.NotNull(fixture.Database);

    [Fact]
    public void Test2_UsesSharedDatabase() => Assert.NotNull(fixture.Database);
    // Database is created once, shared by all tests
}
```

**Use `IClassFixture` only when setup is expensive** (e.g., database connection); prefer creating fresh objects in the constructor.

## Tests run in isolation and independently

xUnit creates a **new instance** of the test class for each test method. This prevents shared state from causing dependencies:

```csharp
// ✓ Good: each test is independent
public class BankAccountTests
{
    private readonly BankAccount account = new BankAccount();

    [Fact]
    public void Deposit_100_BalanceIs100()
    {
        account.Deposit(100);
        Assert.Equal(100m, account.Balance);
    }

    [Fact]
    public void Deposit_200_BalanceIs200()
    {
        // This gets a fresh BankAccount, not the one from the previous test
        account.Deposit(200);
        Assert.Equal(200m, account.Balance);
    }
}

// ❌ Bad: shared mutable state breaks isolation
public class BrokenTests
{
    private static int counter = 0;  // Shared across all tests!

    [Fact]
    public void TestA_IncrementCounter()
    {
        counter++;
        Assert.Equal(1, counter);
    }

    [Fact]
    public void TestB_CheckCounter()
    {
        // Fails if TestA didn't run first
        Assert.Equal(1, counter);  // May be 0 if TestA didn't run yet
    }
}
```

**Key point**: Never rely on test order or use static/shared mutable state. Each test should work independently.

## Skipping tests and filtering

### Skipping a test temporarily

Use `[Fact(Skip = "reason")]` to skip a test without deleting it:

```csharp
[Fact(Skip = "Not implemented yet")]
public void AdvancedFeature_ReturnsExpected()
{
    // This test is skipped and won't run
}

[Theory(Skip = "Known issue: needs refactoring")]
[InlineData(1)]
[InlineData(2)]
public void KnownBuggyBehavior_ShouldFixEventually(int input)
{
    // These tests are skipped
}
```

### Running specific tests

```bash
# Run all tests
dotnet test

# Run tests in a specific test class
dotnet test --filter "FullyQualifiedName~CalculatorTests"

# Run tests matching a pattern
dotnet test --filter "Name~Add"
```

## Common mistakes

- **Depending on test order**: Tests can run in any order. Never assume one test ran before another or rely on shared state.

```csharp
// ❌ Bad: test B depends on test A
[Fact]
public void Test_A_Initialize() { Setup(); }

[Fact]
public void Test_B_UsesSetup() { Assert.True(isInitialized); }  // May fail

// ✓ Good: each test sets up independently
[Fact]
public void Test_A_Initialize() { Setup(); }

[Fact]
public void Test_B_UsesSetup() { Setup(); Assert.True(isInitialized); }
```

- **Using static/shared mutable state**: This breaks test isolation.

```csharp
// ❌ Bad
static int value = 0;

[Fact]
public void Test_A() { value = 5; }

[Fact]
public void Test_B() { Assert.Equal(5, value); }  // Flaky: depends on test order

// ✓ Good: instance variable
private int value;

[Fact]
public void Test_A() { value = 5; Assert.Equal(5, value); }

[Fact]
public void Test_B() { value = 10; Assert.Equal(10, value); }  // Always fresh
```

- **Too many [InlineData] rows**: If a [Theory] has 10+ rows, consider a [MemberData] property or separate test classes for clarity.

```csharp
// ✓ OK: a few cases
[Theory]
[InlineData(0, false)]
[InlineData(1, true)]
[InlineData(100, true)]
public void IsPositive_Works(int input, bool expected) { }

// Better: many cases go in a data property
[Theory]
[MemberData(nameof(GetValidUserInputs))]
public void ValidateUser_Works(string email, bool expected) { }
```

## Quick recap

- `[Fact]` is a single test; `[Theory]` runs the same test with multiple `[InlineData]` rows.
- Use `[Theory]` for edge cases and boundary conditions.
- Name tests clearly: `MethodName_Scenario_ExpectedResult`.
- Test boundaries: null, empty, zero, negative, min/max, first/last.
- Each test class instance is fresh for each test (no shared state between tests).
- Use the constructor for setup; implement `IDisposable` for cleanup.
- Use `IClassFixture<T>` only when setup is expensive.
- Never depend on test order or use `static` mutable state.
