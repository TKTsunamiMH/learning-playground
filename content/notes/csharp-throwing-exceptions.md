---
title: Throwing Exceptions in C#
topic: C#
tags: [csharp, throw, exceptions, validation, argument-validation, rethrowing]
date: 2026-11-23
---

# Throwing Exceptions in C#

Throwing an exception signals that something has gone wrong and execution cannot continue normally. Use `throw new SomeException("message")` to create and throw an exception. Knowing *when* and *how* to throw, and how to rethrow without losing the stack trace, is crucial for writing robust code.

## When to throw

Throw an exception when:

1. **Invalid arguments**: A method received arguments it cannot process
2. **Invalid state**: An object is in a state where the operation cannot proceed
3. **Preconditions violated**: Something required hasn't been set up

```csharp
public class BankAccount
{
    private decimal _balance;

    public BankAccount(decimal initialBalance)
    {
        if (initialBalance < 0)
            throw new ArgumentOutOfRangeException(nameof(initialBalance), "Cannot be negative");
        _balance = initialBalance;
    }

    public void Withdraw(decimal amount)
    {
        if (amount <= 0)
            throw new ArgumentOutOfRangeException(nameof(amount), "Must be positive");
        
        if (amount > _balance)
            throw new InvalidOperationException("Insufficient funds");
        
        _balance -= amount;
    }
}

// Usage:
try
{
    var account = new BankAccount(-100);  // ❌ Throws ArgumentOutOfRangeException
}
catch (ArgumentOutOfRangeException ex)
{
    Console.WriteLine($"Invalid account: {ex.Message}");
}
```

## Argument validation

Use these standard exceptions to validate arguments:

| Exception | Use when | Example |
|-----------|----------|---------|
| `ArgumentNullException` | Argument is `null` and shouldn't be | `if (name == null) throw new ArgumentNullException(nameof(name));` |
| `ArgumentOutOfRangeException` | Argument value is outside the allowed range | `if (age < 0 || age > 150)` |
| `ArgumentException` | Argument value is invalid in some other way | `if (email doesn't contain @)` |

```csharp
public class Person
{
    public string Name { get; }
    public int Age { get; }

    public Person(string name, int age)
    {
        if (name == null)
            throw new ArgumentNullException(nameof(name), "Name cannot be null");
        
        if (name.Length == 0)
            throw new ArgumentException("Name cannot be empty", nameof(name));
        
        if (age < 0 || age > 150)
            throw new ArgumentOutOfRangeException(nameof(age), "Age must be between 0 and 150");
        
        Name = name;
        Age = age;
    }
}

// Helper methods (C# 11+, available in some .NET versions)
// ArgumentNullException.ThrowIfNull(name);
// ArgumentOutOfRangeException.ThrowIfNegative(age);
```

Modern .NET versions offer helper methods to reduce boilerplate:

```csharp
public Person(string name, int age)
{
    ArgumentNullException.ThrowIfNull(name);
    ArgumentException.ThrowIfNullOrEmpty(name);
    // ArgumentOutOfRangeException.ThrowIfNegativeOrZero(age);  // If available
    
    Name = name;
    Age = age;
}
```

## InvalidOperationException, NotImplementedException, NotSupportedException

| Exception | When | Example |
|-----------|------|---------|
| `InvalidOperationException` | Object state doesn't allow the operation | `Closing a stream that's already closed` |
| `NotImplementedException` | A method/feature isn't implemented yet | A stub method that hasn't been coded |
| `NotSupportedException` | An operation is intentionally not supported | Trying to modify a read-only collection |

```csharp
public class FileWriter
{
    private StreamWriter? _stream;
    private bool _disposed = false;

    public void Write(string text)
    {
        if (_disposed)
            throw new InvalidOperationException("Cannot write to a disposed writer");
        
        _stream?.WriteLine(text);
    }

    public void Dispose()
    {
        if (!_disposed)
        {
            _stream?.Dispose();
            _disposed = true;
        }
    }
}

// NotImplementedException
public class FutureFeature
{
    public void SomeFeature()
    {
        throw new NotImplementedException("This feature is planned for v2.0");
    }
}
```

## Rethrowing: `throw;` vs `throw ex;`

When catching an exception and wanting to pass it up, **always use `throw;` without arguments**. This preserves the original stack trace. Using `throw ex;` resets the stack trace, losing information about where the error truly started:

```csharp
public void ProcessFile(string path)
{
    try
    {
        ReadFile(path);
    }
    catch (FileNotFoundException ex)
    {
        // Log the error
        logger.LogError("File not found: " + path);
        
        // ✓ Good: throw; preserves the stack trace
        throw;
    }
}

public void BadRethrowing(string path)
{
    try
    {
        ReadFile(path);
    }
    catch (FileNotFoundException ex)
    {
        logger.LogError("File not found: " + path);
        
        // ❌ Bad: throw ex; resets the stack trace
        throw ex;
        // The stack trace now shows this line, not where ReadFile() was called!
    }
}

// Stack trace with throw; (correct):
// at MyApp.ReadFile() in C:\app\MyClass.cs:line 50
// at MyApp.ProcessFile() in C:\app\MyClass.cs:line 20

// Stack trace with throw ex; (wrong):
// at MyApp.BadRethrowing() in C:\app\MyClass.cs:line 35
// Original call site (line 50 in ReadFile) is hidden!
```

## Wrapping exceptions

When catching an exception and throwing a different one, **preserve the original exception as the `InnerException`**. This prevents losing diagnostic information:

```csharp
public class UserService
{
    public User GetUser(int userId)
    {
        try
        {
            return _database.GetUserById(userId);
        }
        catch (IOException ex)
        {
            // ❌ Bad: original error is lost
            throw new InvalidOperationException("Failed to fetch user");
        }
    }
}

// ✓ Good: wrap and preserve the original
public class UserService
{
    public User GetUser(int userId)
    {
        try
        {
            return _database.GetUserById(userId);
        }
        catch (IOException ex)
        {
            throw new InvalidOperationException(
                $"Failed to fetch user {userId} from database",
                innerException: ex
            );
        }
    }
}

// Usage: the caller can see both exceptions
try
{
    var user = userService.GetUser(123);
}
catch (InvalidOperationException ex)
{
    Console.WriteLine($"Error: {ex.Message}");
    if (ex.InnerException != null)
        Console.WriteLine($"Caused by: {ex.InnerException.GetType().Name}: {ex.InnerException.Message}");
}
// Output:
// Error: Failed to fetch user 123 from database
// Caused by: IOException: Disk I/O error
```

## Throw expressions

You can use `throw` as an expression (not just a statement) for concise validation:

```csharp
// Throw if null
public class Product
{
    public string Name { get; }

    public Product(string name)
    {
        Name = name ?? throw new ArgumentNullException(nameof(name));
    }
}

// Throw in a ternary
int ValidateAge(int age) =>
    age >= 0 && age <= 150
        ? age
        : throw new ArgumentOutOfRangeException(nameof(age));

// Throw after null-coalescing
string GetDescription(string? input) =>
    input ?? throw new ArgumentNullException(nameof(input), "Description is required");

var age = ValidateAge(user.AgeString);  // ✓ Concise
Console.WriteLine(age);
```

## Common mistakes

- **Using `throw ex;` and losing the stack trace** – Always use bare `throw;` to preserve the original error location.

```csharp
// ❌ Bad
try { ReadFile(path); }
catch (Exception ex)
{
    throw ex;  // Stack trace now points here, not to ReadFile!
}

// ✓ Good
try { ReadFile(path); }
catch (Exception ex)
{
    throw;  // Original stack trace preserved
}
```

- **Not preserving the original exception when wrapping** – Use `throw new X(..., innerException: ex)` to keep diagnostic information.

```csharp
// ❌ Bad: original error is gone
try { database.Save(); }
catch (DbException ex)
{
    throw new InvalidOperationException("Save failed");  // ex is lost!
}

// ✓ Good: original is preserved
try { database.Save(); }
catch (DbException ex)
{
    throw new InvalidOperationException("Save failed", ex);
}
```

- **Throwing `Exception` directly** – Always throw a specific exception type so callers know what to expect.

```csharp
// ❌ Bad: too generic
throw new Exception("Something went wrong");

// ✓ Good: specific, tells the caller what happened
throw new ArgumentNullException(nameof(name));
throw new InvalidOperationException("Cannot delete a user with active orders");
```

## Quick recap

- Throw an exception when: an argument is invalid, the object state doesn't permit the operation, or a precondition is violated.
- Use `ArgumentNullException`, `ArgumentOutOfRangeException`, `ArgumentException` for argument validation.
- Use `InvalidOperationException` when object state forbids the operation; `NotImplementedException` for stubs; `NotSupportedException` for intentionally unsupported operations.
- **Always use bare `throw;` to rethrow**, not `throw ex;`, which resets the stack trace.
- **Wrap exceptions with `throw new X(..., innerException: ex)`** to preserve the original error.
- Throw expressions let you validate concisely with `x ?? throw new ...` or ternary operators.
- Never throw `Exception` directly; always use a specific exception type.
