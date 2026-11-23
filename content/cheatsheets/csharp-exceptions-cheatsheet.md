---
title: C# Exception Handling Cheatsheet
topic: C#
tags: [csharp, cheatsheet, exception-handling, try-catch, best-practices]
date: 2026-11-23
---

# C# Exception Handling Cheatsheet

Quick reference for exception handling syntax, patterns, and best practices.

## Try-Catch-Finally syntax

```csharp
try
{
    // Code that might throw
}
catch (SpecificException ex)
{
    // Handle specific exception
}
catch (Exception ex)
{
    // Last resort: catch all (less specific comes after)
}
finally
{
    // Always runs; cleanup code
}
```

## Catch order and filters

**Always order from most specific to most general; general catch must be last:**

```csharp
try
{
    // ...
}
catch (ArgumentOutOfRangeException ex)  // ← Most specific first
{
}
catch (ArgumentException ex)  // ← More general
{
}
catch (Exception ex)  // ← Least specific (last)
{
}

// ✓ Exception filters (when condition)
catch (FormatException ex) when (input.Length == 0)
{
}
catch (FormatException ex) when (input.Contains("@"))
{
}
catch (FormatException ex)
{
}
```

## Throw vs throw ex

| Pattern | Stack Trace | Use |
|---------|------------|-----|
| `throw;` | ✓ Preserved (original location shown) | ✓ Always use to rethrow |
| `throw ex;` | ✗ Reset (points to this line) | ✗ Never use; loses context |
| `throw new X(..., ex)` | Shows new exception, includes original in `InnerException` | Wrap and preserve original |

```csharp
// ✓ Good: bare throw preserves stack trace
catch (FileNotFoundException ex)
{
    logger.LogError(ex, "File not found");
    throw;  // Stack trace shows where FileNotFound was thrown
}

// ❌ Bad: throw ex resets stack trace
catch (FileNotFoundException ex)
{
    logger.LogError(ex, "File not found");
    throw ex;  // Stack trace now points here, loses original location
}

// ✓ Good: wrap and preserve
catch (DbException ex)
{
    throw new InvalidOperationException("Save failed", ex);  // ex is InnerException
}
```

## Throw expressions

```csharp
// Null-coalescing with throw
string Name { get; } = name ?? throw new ArgumentNullException(nameof(name));

// Ternary with throw
int ValidateAge(int age) =>
    age >= 0 && age <= 150
        ? age
        : throw new ArgumentOutOfRangeException(nameof(age));

// Method with throw expression
string GetDescription(string? input) =>
    input ?? throw new ArgumentNullException(nameof(input));
```

## Common exceptions quick reference

| Exception | Cause | Example | Fix |
|-----------|-------|---------|-----|
| `NullReferenceException` | Calling method on `null` | `text.Length` where text is `null` | Check for `null`: `text?.Length` or `if (text != null)` |
| `ArgumentNullException` | Argument is `null` | Constructor receives `null` | Validate: `ArgumentNullException.ThrowIfNull(arg)` |
| `ArgumentOutOfRangeException` | Argument value out of range | Negative age, invalid index | Check bounds: `if (age < 0) throw ...` |
| `IndexOutOfRangeException` | Array/list index invalid | `arr[100]` on small array | Verify: `if (index < arr.Length)` |
| `FormatException` | Cannot parse string | `int.Parse("abc")` | Use `TryParse`: `int.TryParse(input, out int x)` |
| `InvalidOperationException` | Object state doesn't allow operation | Calling method on disposed object | Check state before operation |
| `KeyNotFoundException` | Dictionary key not found | `dict["missing"]` | Use `TryGetValue`: `dict.TryGetValue(key, out var v)` |
| `FileNotFoundException` | File doesn't exist | `File.ReadAllText("missing.txt")` | Check: `if (File.Exists(path))` |
| `IOException` | I/O error (permissions, disk full, etc.) | Various file operations | Catch and handle, or check permissions |
| `TimeoutException` | Operation exceeded time limit | HTTP/database timeout | Increase timeout or implement retry |
| `StackOverflowException` | Infinite recursion | Infinite recursive call | **Cannot be caught**; fix recursion |

## Argument validation helpers

```csharp
// Null checks
ArgumentNullException.ThrowIfNull(arg);
ArgumentException.ThrowIfNullOrEmpty(text);
ArgumentException.ThrowIfNullOrWhiteSpace(text);

// Range checks (if available in your .NET version)
ArgumentOutOfRangeException.ThrowIfNegative(value);
ArgumentOutOfRangeException.ThrowIfNegativeOrZero(value);
ArgumentOutOfRangeException.ThrowIfGreaterThan(value, max);
ArgumentOutOfRangeException.ThrowIfGreaterThanOrEqual(value, max);
ArgumentOutOfRangeException.ThrowIfLessThan(value, min);
ArgumentOutOfRangeException.ThrowIfLessThanOrEqual(value, min);
```

## Custom exception template

```csharp
public class MyCustomException : Exception
{
    // Optional: domain-specific properties
    public int ErrorCode { get; }

    // Parameterless
    public MyCustomException() { }

    // With message
    public MyCustomException(string message) : base(message) { }

    // With message and inner exception
    public MyCustomException(string message, Exception innerException)
        : base(message, innerException) { }

    // With custom data
    public MyCustomException(int errorCode, string message)
        : base(message)
    {
        ErrorCode = errorCode;
    }
}
```

## Try patterns (alternatives to exceptions)

Use these instead of catching exceptions for predictable failures:

```csharp
// Dictionary
if (dict.TryGetValue(key, out var value)) { }

// Parsing
if (int.TryParse(input, out int num)) { }
if (DateTime.TryParse(input, out DateTime date)) { }
if (Enum.TryParse<MyEnum>(input, out var e)) { }

// Collections
if (queue.TryDequeue(out var item)) { }
if (stack.TryPop(out var item)) { }
if (list.TryGetFirst(out var item)) { }

// Optional
if (optional.HasValue) { var val = optional.Value; }

// Check before accessing
if (File.Exists(path)) { }
if (Directory.Exists(path)) { }
if (index >= 0 && index < list.Count) { }
```

## Resource cleanup patterns

```csharp
// Traditional try-finally
StreamWriter? writer = null;
try
{
    writer = new StreamWriter("file.txt");
    writer.WriteLine("data");
}
finally
{
    writer?.Dispose();
}

// ✓ Cleaner: using statement
using (StreamWriter writer = new StreamWriter("file.txt"))
{
    writer.WriteLine("data");
}

// ✓ Best: using declaration (C# 8.0+)
using StreamWriter writer = new StreamWriter("file.txt");
writer.WriteLine("data");
// Dispose() called automatically
```

## Logging exceptions

```csharp
// ❌ Bad: message only
logger.LogError("An error occurred");

// ✓ Good: include the exception and structured data
logger.LogError(ex, "Failed to process user {UserId}", userId);
logger.LogError(ex, "Payment failed: Amount={Amount}, Provider={Provider}", amount, provider);
```

## Best-practice checklist

- ✓ Catch only exceptions you can handle
- ✓ Catch specific exceptions (not `Exception` for every case)
- ✓ Order multiple `catch` blocks from most specific to most general
- ✓ Always log the full exception, not just the message
- ✓ Use `throw;` to rethrow, not `throw ex;`
- ✓ Use `finally` or `using` for cleanup
- ✓ Validate arguments and use Try patterns for predictable failures
- ✓ Never use empty `catch` blocks
- ✓ Never use `async void` (use `async Task` instead)
- ✓ Return structured error responses in web APIs, never stack traces
- ✓ Prefer `TryParse` over `Parse` for user input
- ✓ Prefer `TryGetValue` over catching `KeyNotFoundException`

## Related notes

- [Exception Basics](/content/notes/csharp-exceptions-basics.md)
- [Try-Catch-Finally](/content/notes/csharp-try-catch-finally.md)
- [Throwing Exceptions](/content/notes/csharp-throwing-exceptions.md)
- [Custom Exceptions](/content/notes/csharp-custom-exceptions.md)
- [Common Exceptions Reference](/content/notes/csharp-common-exceptions-reference.md)
- [Best Practices](/content/notes/csharp-exception-handling-best-practices.md)
