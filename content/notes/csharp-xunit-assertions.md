---
title: C# xUnit Assertions
topic: C#
tags: [csharp, unit-test, xunit, assertions, comparison]
date: 2026-11-27
---

# C# xUnit Assertions

An **assertion** is a statement that checks if something is true. xUnit's `Assert` class provides methods to verify test results. This note covers all common assertion methods, comparing different data types, testing exceptions, and when to split assertions across multiple tests.

## The Assert class: common methods

xUnit assertions always follow the same pattern: `Assert.MethodName(expected, actual)` for comparisons. **Important**: The `expected` value comes first, then the `actual` result.

Here are the most common assertions:

| Method | Checks | Example |
|--------|--------|---------|
| `Assert.Equal(expected, actual)` | Values are equal | `Assert.Equal(5, calculator.Add(2, 3));` |
| `Assert.NotEqual(unexpected, actual)` | Values are NOT equal | `Assert.NotEqual(0, result);` |
| `Assert.True(condition)` | Condition is `true` | `Assert.True(user.IsActive);` |
| `Assert.False(condition)` | Condition is `false` | `Assert.False(list.IsEmpty);` |
| `Assert.Null(actual)` | Value is `null` | `Assert.Null(result);` |
| `Assert.NotNull(actual)` | Value is not `null` | `Assert.NotNull(user);` |
| `Assert.Same(expected, actual)` | Same object reference (not just equal) | `Assert.Same(original, cached);` |
| `Assert.NotSame(unexpected, actual)` | Different object reference | `Assert.NotSame(obj1, obj2);` |
| `Assert.Empty(collection)` | Collection has no items | `Assert.Empty(emptyList);` |
| `Assert.NotEmpty(collection)` | Collection has items | `Assert.NotEmpty(results);` |
| `Assert.Contains(item, collection)` | Collection contains item | `Assert.Contains(5, numbers);` |
| `Assert.DoesNotContain(item, collection)` | Collection doesn't contain item | `Assert.DoesNotContain(99, numbers);` |
| `Assert.InRange(actual, min, max)` | Value is between min and max (inclusive) | `Assert.InRange(age, 0, 150);` |
| `Assert.IsType<T>(actual)` | Object is exactly type T | `Assert.IsType<FormatException>(ex);` |
| `Assert.IsAssignableFrom<T>(actual)` | Object can be assigned to type T (includes inheritance) | `Assert.IsAssignableFrom<Exception>(ex);` |
| `Assert.StartsWith(expected, actual)` | String starts with expected | `Assert.StartsWith("Hello", greeting);` |
| `Assert.EndsWith(expected, actual)` | String ends with expected | `Assert.EndsWith(".com", email);` |

## Examples with common data types

### Integers and numbers

```csharp
[Fact]
public void Add_TwoNumbers_ReturnsSum()
{
    var calc = new Calculator();
    int result = calc.Add(2, 3);
    Assert.Equal(5, result);  // ✓ PASSED
}

[Fact]
public void AgeValidator_NegativeAge_ReturnsFalse()
{
    bool isValid = AgeValidator.IsValid(-5);
    Assert.False(isValid);  // ✓ PASSED
}

[Fact]
public void ParseScore_ValidString_ReturnsInteger()
{
    int score = int.Parse("42");
    Assert.InRange(score, 0, 100);  // ✓ PASSED if 0 <= score <= 100
}
```

### Floating-point and decimal numbers

**Important**: Never use `Assert.Equal` with `double` or `float` without a precision parameter, because floating-point arithmetic is imprecise.

```csharp
// ❌ Bad: flaky, may fail due to floating-point precision
[Fact]
public void CalculateDiscount_10Percent_Returns0Point1()
{
    double result = CalculateDiscount(100, 0.10);
    Assert.Equal(0.1, result);  // May fail: 0.09999999999 ≠ 0.1
}

// ✓ Good: specify precision (number of decimal places)
[Fact]
public void CalculateDiscount_10Percent_Returns0Point1()
{
    double result = CalculateDiscount(100, 0.10);
    Assert.Equal(0.1, result, precision: 5);  // Checks to 5 decimal places
}

// ✓ Better: use decimal for money
[Fact]
public void CalculateDiscount_10Percent_Returns10Dollars()
{
    decimal result = CalculateDiscount(100m, 0.10m);
    Assert.Equal(10m, result);  // Decimal doesn't have precision issues
}
```

For more details, see [Floating-Point and Decimal](/content/notes/csharp-floating-point-and-decimal.md).

### Collections (lists and arrays)

```csharp
[Fact]
public void GetNumbers_ReturnsExpectedList()
{
    var expected = new List<int> { 1, 2, 3 };
    var result = GetNumbers();
    Assert.Equal(expected, result);  // ✓ PASSED if lists have same items in same order
}

[Fact]
public void FilterList_EmptyInput_ReturnsEmpty()
{
    var input = new List<int>();
    var result = FilterList(input);
    Assert.Empty(result);  // ✓ PASSED if result has no items
}

[Fact]
public void GetFavorites_ReturnsNonEmpty()
{
    var favorites = GetFavorites();
    Assert.NotEmpty(favorites);  // ✓ PASSED if has at least one item
}

[Fact]
public void GetPrimes_Contains5()
{
    var primes = GetPrimes(1, 10);
    Assert.Contains(5, primes);  // ✓ PASSED if 5 is in the list
}

// Order matters!
[Fact]
public void SortNumbers_ReturnsAscendingOrder()
{
    var input = new List<int> { 3, 1, 2 };
    var result = SortNumbers(input);
    Assert.Equal(new List<int> { 1, 2, 3 }, result);  // ✓ Order checked
}
```

### Strings

```csharp
[Fact]
public void Greeting_ReturnsCorrectMessage()
{
    var result = Greeting("Alice");
    Assert.Equal("Hello, Alice!", result);  // ✓ Exact match
}

[Fact]
public void EmailValidator_ValidEmail_ReturnsTrue()
{
    bool isValid = EmailValidator.IsValid("alice@example.com");
    Assert.True(isValid);
}

// String comparison is case-sensitive by default
[Fact]
public void GetName_CaseMatters()
{
    var result = GetName();
    Assert.Equal("Alice", result);  // ✓ Exact case
    // Assert.Equal("alice", result);  // ✗ Would fail (different case)
}

[Fact]
public void FullName_ReturnsLastNameFirst()
{
    var result = FullName("Alice", "Smith");
    Assert.StartsWith("Smith", result);  // ✓ PASSED if starts with "Smith"
    Assert.EndsWith("Alice", result);    // ✓ PASSED if ends with "Alice"
}
```

### Records vs classes

Records compare by value (the content), so `Assert.Equal` works naturally:

```csharp
public record Person(string Name, int Age);  // Records compare by value

[Fact]
public void CreatePerson_ReturnsCorrectData()
{
    var expected = new Person("Alice", 30);
    var actual = CreatePerson("Alice", 30);
    Assert.Equal(expected, actual);  // ✓ PASSED: same values
}
```

Classes compare by reference (identity), so you need to either override `Equals` or compare properties individually:

```csharp
public class Employee  // Classes compare by reference by default
{
    public string Name { get; set; }
    public int Age { get; set; }
}

// ❌ Fails even though properties are the same
[Fact]
public void CreateEmployee_ReturnsCorrectData()
{
    var expected = new Employee { Name = "Alice", Age = 30 };
    var actual = CreateEmployee("Alice", 30);
    Assert.Equal(expected, actual);  // ✗ FAILED: different object instances
}

// ✓ Compare properties instead
[Fact]
public void CreateEmployee_ReturnsCorrectData()
{
    var actual = CreateEmployee("Alice", 30);
    Assert.Equal("Alice", actual.Name);
    Assert.Equal(30, actual.Age);
}
```

For more details, see [Records](/content/notes/csharp-records.md).

## Testing exceptions

Use `Assert.Throws<T>` to verify that a method throws the expected exception:

```csharp
public class BankAccount
{
    public void Withdraw(decimal amount)
    {
        if (amount <= 0)
            throw new ArgumentException("Amount must be positive");
        if (amount > Balance)
            throw new InsufficientFundsException("Not enough balance");
        Balance -= amount;
    }
}

// Test that an exception is thrown with the exact type
[Fact]
public void Withdraw_NegativeAmount_ThrowsArgumentException()
{
    var account = new BankAccount { Balance = 100m };
    Assert.Throws<ArgumentException>(() => account.Withdraw(-10));
    // ✓ PASSED: ArgumentException was thrown
}

// Capture the exception to check its message
[Fact]
public void Withdraw_NegativeAmount_ThrowsWithCorrectMessage()
{
    var account = new BankAccount { Balance = 100m };
    var ex = Assert.Throws<ArgumentException>(() => account.Withdraw(-10));
    Assert.Equal("Amount must be positive", ex.Message);
    // ✓ PASSED: correct exception type and message
}

// Use ThrowsAny<T> to accept derived exception types
[Fact]
public void Withdraw_InsufficientFunds_ThrowsException()
{
    var account = new BankAccount { Balance = 50m };
    // This passes for InsufficientFundsException or any derived type
    Assert.ThrowsAny<Exception>(() => account.Withdraw(100));
    // ✓ PASSED
}

// Throws<T> requires exact type; ThrowsAny<T> accepts derived types
[Fact]
public void Example_ExactType_vs_AnyType()
{
    // Assert.Throws<Exception>(() => ...) ✗ Fails if InsufficientFundsException is thrown
    // Assert.ThrowsAny<Exception>(() => ...) ✓ Passes for InsufficientFundsException
}
```

### Testing async methods that throw

For async methods, use `Assert.ThrowsAsync<T>`:

```csharp
public class UserService
{
    public async Task<User> GetUserAsync(int id)
    {
        if (id <= 0)
            throw new ArgumentException("ID must be positive");
        await Task.Delay(100);  // Simulate async work
        return new User { Id = id };
    }
}

[Fact]
public async Task GetUserAsync_InvalidId_ThrowsArgumentException()
{
    var service = new UserService();
    await Assert.ThrowsAsync<ArgumentException>(() => service.GetUserAsync(-1));
    // ✓ PASSED: ArgumentException was thrown
}
```

For more details, see [Exceptions Basics](/content/notes/csharp-exceptions-basics.md).

## Multiple assertions: one concept per test

It's tempting to verify everything in one test, but it's better to split related checks into separate tests. This makes it clear what failed and keeps each test focused.

```csharp
// ❌ Bad: too many assertions, hard to know what failed
[Fact]
public void CreateOrder_ValidOrder_Works()
{
    var order = new Order { Items = [...], CustomerId = 1 };
    var result = OrderService.Create(order);
    
    Assert.NotNull(result);
    Assert.Equal(OrderStatus.Pending, result.Status);
    Assert.NotEqual(0, result.Id);
    Assert.NotNull(result.CreatedAt);
    Assert.True(result.Total > 0);
    Assert.NotEmpty(result.Items);
}

// ✓ Good: focused tests, one concept each
[Fact]
public void CreateOrder_ValidOrder_ReturnsOrderWithPendingStatus()
{
    var order = new Order { Items = [...], CustomerId = 1 };
    var result = OrderService.Create(order);
    Assert.Equal(OrderStatus.Pending, result.Status);
}

[Fact]
public void CreateOrder_ValidOrder_AssignsId()
{
    var order = new Order { Items = [...], CustomerId = 1 };
    var result = OrderService.Create(order);
    Assert.NotEqual(0, result.Id);
}

[Fact]
public void CreateOrder_ValidOrder_SetsCreatedAt()
{
    var order = new Order { Items = [...], CustomerId = 1 };
    var result = OrderService.Create(order);
    Assert.NotNull(result.CreatedAt);
}

[Fact]
public void CreateOrder_ValidOrder_CalculatesTotal()
{
    var order = new Order { Items = [...], CustomerId = 1 };
    var result = OrderService.Create(order);
    Assert.True(result.Total > 0);
}
```

**Exception**: It's fine to check related aspects of the same error:

```csharp
// ✓ OK: checking one error from multiple angles
[Fact]
public void Withdraw_NegativeAmount_ThrowsCorrectException()
{
    var account = new BankAccount { Balance = 100m };
    var ex = Assert.Throws<ArgumentException>(() => account.Withdraw(-10));
    Assert.Equal("Amount must be positive", ex.Message);  // Related assertions OK
}
```

## Common mistakes

- **Swapped expected and actual**: The order matters! Expected comes first. If you swap them, failure messages are confusing.

```csharp
// ❌ Wrong order
Assert.Equal(result, expected);  // Expected shows as "actual" in error message

// ✓ Correct order
Assert.Equal(expected, result);
```

- **Asserting on `double` without precision**: Floating-point arithmetic produces imprecise results. Always use the `precision` parameter or use `decimal` for money.

```csharp
// ❌ Flaky
Assert.Equal(0.3, 0.1 + 0.2);  // May fail: result is 0.30000000000000004

// ✓ Correct
Assert.Equal(0.3, 0.1 + 0.2, precision: 10);
```

- **Catching exceptions with try/catch instead of Assert.Throws**: This defeats the purpose of the test because the test won't fail if no exception is thrown.

```csharp
// ❌ Bad: test always passes, even if Withdraw doesn't throw
[Fact]
public void Withdraw_NegativeAmount_ThrowsException()
{
    var account = new BankAccount { Balance = 100m };
    try
    {
        account.Withdraw(-10);
        // If we get here, the test passes silently... but it should fail!
    }
    catch (Exception ex)
    {
        Assert.NotNull(ex.Message);
    }
}

// ✓ Good: test fails if no exception is thrown
[Fact]
public void Withdraw_NegativeAmount_ThrowsException()
{
    var account = new BankAccount { Balance = 100m };
    Assert.Throws<ArgumentException>(() => account.Withdraw(-10));
}
```

## Quick recap

- Use `Assert.Equal(expected, actual)` for most comparisons; remember **expected first**.
- For floating-point numbers, use `precision` parameter or `decimal` type.
- Compare collections with `Assert.Equal`; order matters.
- Records compare by value naturally; classes require `Equals` override or property-by-property comparison.
- Use `Assert.Throws<T>` to verify exceptions; `Assert.ThrowsAsync<T>` for async.
- Split assertions by concept: each test should verify one idea.
- Never catch exceptions with try/catch in tests; use `Assert.Throws`.
