---
title: Common Exceptions Reference in C#
topic: C#
tags: [csharp, exceptions, reference, troubleshooting, debugging]
date: 2026-11-23
---

# Common Exceptions Reference in C#

This is a quick reference for the most frequently encountered exceptions: what causes them, typical examples, and how to fix them.

## Exception reference table

| Exception | Typical Cause | Example | How to Fix |
|-----------|---------------|---------|-----------|
| **NullReferenceException** | Calling a method on a `null` object | `string text = null; text.Length;` | Check for `null` before accessing: `if (text != null) { }` or use the null-conditional operator `text?.Length` |
| **ArgumentNullException** | Method received `null` when it shouldn't | Constructor: `public Class(string name)` with `name == null` | Validate arguments: `ArgumentNullException.ThrowIfNull(name);` |
| **ArgumentOutOfRangeException** | Argument value is outside allowed range | `TimeSpan.FromSeconds(-10)` or negative age | Check bounds: `if (age < 0) throw new ArgumentOutOfRangeException(...)` |
| **IndexOutOfRangeException** | Array/list index is out of bounds | `int[] arr = [1,2,3]; arr[10]` | Verify index: `if (index >= 0 && index < arr.Length)` |
| **InvalidCastException** | Cannot cast to the target type | `object obj = "text"; int x = (int)obj;` | Use `is` or `as` to check first: `if (obj is int) { int x = (int)obj; }` or use `as`: `int x = obj as int ?? 0;` |
| **FormatException** | String cannot be parsed as target type | `int.Parse("abc")` | Use `TryParse` instead: `int.TryParse("abc", out int x)` |
| **OverflowException** | Numeric conversion results in overflow | `byte b = 256;` (max is 255) or `checked { int x = int.MaxValue + 1; }` | Validate ranges or use `checked` context carefully |
| **DivideByZeroException** | Division by zero | `int x = 10 / 0;` | Validate divisor: `if (divisor != 0) result = x / divisor;` |
| **InvalidOperationException** | Object state doesn't allow the operation | Enumerating a collection while modifying it; calling methods on a disposed object | Check state before operation; don't modify during enumeration; don't use disposed objects |
| **KeyNotFoundException** | Dictionary/collection key not found | `dict["missing"]` on a Dictionary | Use `TryGetValue`: `if (dict.TryGetValue(key, out var value))` or `ContainsKey` |
| **FileNotFoundException** | File doesn't exist | `File.ReadAllText("missing.txt")` | Check file exists: `if (File.Exists(path)) { ... }` or catch and handle |
| **DirectoryNotFoundException** | Directory doesn't exist | `Directory.GetFiles("missing/path")` | Check directory exists: `if (Directory.Exists(path))` or create it |
| **UnauthorizedAccessException** | No permission to access file/directory | Trying to read a file you don't have permission for | Check permissions, run as admin, or catch and handle gracefully |
| **IOException** | General I/O error (disk full, permissions, etc.) | Various file/stream operations | Use specific exceptions where possible; catch `IOException` as fallback |
| **TimeoutException** | Operation exceeded time limit | HTTP request timeout, database query timeout | Increase timeout, optimize operation, or implement retry logic |
| **ObjectDisposedException** | Using an object after it's been disposed | Calling methods on a closed `StreamWriter` | Don't use objects after disposal; use `using` or check if disposed |
| **StackOverflowException** | Stack exhausted (infinite recursion) | `void Infinite() { Infinite(); }` | **Cannot be caught**; fix the infinite recursion in your code |

## How to find the cause quickly

When you get an exception, follow these steps:

1. **Read the exception message** – It often tells you exactly what's wrong
2. **Look at the exception type** – The type name suggests the category of error
3. **Find the FIRST line of YOUR code in the stack trace** – This is where the error started from your code's perspective

```csharp
// If you see:
// NullReferenceException: Object reference not set to an instance of an object.
// Stack trace:
// at MyApp.MyClass.ProcessUser() in C:\app\MyClass.cs:line 50
// at MyApp.Program.Main() in C:\app\Program.cs:line 15

// Action: Go to MyClass.cs, line 50, and check what might be null
// (Likely: a property or parameter that wasn't initialized)
```

## Common patterns and solutions

### NullReferenceException

```csharp
// ❌ Common cause: accessing properties on null
string? name = GetName();
int length = name.Length;  // NullReferenceException if GetName() returns null

// ✓ Solution 1: null check
if (name != null)
{
    int length = name.Length;
}

// ✓ Solution 2: null-conditional operator
int? length = name?.Length;

// ✓ Solution 3: null-coalescing with default
int length = name?.Length ?? 0;
```

### FormatException and OverflowException

```csharp
// ❌ Common causes
int x = int.Parse("not-a-number");  // FormatException
int y = int.Parse("999999999999999999999999999");  // OverflowException

// ✓ Solution: TryParse
if (int.TryParse(input, out int x))
{
    Console.WriteLine($"Parsed: {x}");
}
else
{
    Console.WriteLine("Invalid number");
}
```

### IndexOutOfRangeException

```csharp
// ❌ Common cause
int[] arr = [1, 2, 3];
int value = arr[10];  // IndexOutOfRangeException

// ✓ Solution: bounds check
if (index >= 0 && index < arr.Length)
{
    int value = arr[index];
}

// ✓ Or use TryGetValue pattern (for collections)
if (index < arr.Length)
{
    var value = arr[index];
}
```

### InvalidOperationException (Collection was modified)

```csharp
// ❌ Common cause: modifying a collection while iterating
var items = new List<int> { 1, 2, 3, 4, 5 };
foreach (var item in items)
{
    if (item == 3)
        items.Remove(item);  // ❌ InvalidOperationException
}

// ✓ Solution 1: iterate over a copy
foreach (var item in items.ToList())
{
    if (item == 3)
        items.Remove(item);  // ✓ Works
}

// ✓ Solution 2: use a standard for loop (backward)
for (int i = items.Count - 1; i >= 0; i--)
{
    if (items[i] == 3)
        items.RemoveAt(i);  // ✓ Works
}
```

### KeyNotFoundException

```csharp
// ❌ Common cause
var dict = new Dictionary<string, int> { { "a", 1 } };
int value = dict["b"];  // KeyNotFoundException

// ✓ Solution 1: TryGetValue
if (dict.TryGetValue("b", out int value))
{
    Console.WriteLine(value);
}
else
{
    Console.WriteLine("Key not found");
}

// ✓ Solution 2: check first
if (dict.ContainsKey("b"))
{
    int value = dict["b"];
}
```

## Common mistakes

- **Assuming a method never returns null** – Always check for `null` or use null-conditional operators.

```csharp
// ❌ Assumes FindUser never returns null
var user = FindUser(id);
Console.WriteLine(user.Email);  // NullReferenceException if FindUser returns null

// ✓ Check or use null-conditional
if (user != null)
{
    Console.WriteLine(user.Email);
}
// Or:
Console.WriteLine(user?.Email ?? "No email");
```

- **Not validating input ranges** – Always check that numeric values are within reasonable bounds.

```csharp
// ❌ Bad: array index from user input without validation
int[] data = GetData();
int index = int.Parse(userInput);
int value = data[index];  // IndexOutOfRangeException possible

// ✓ Good: validate
if (index >= 0 && index < data.Length)
{
    int value = data[index];
}
```

- **Not using TryParse for string conversions** – `Parse` throws; `TryParse` returns a bool and is safer.

```csharp
// ❌ Risky
int x = int.Parse(userInput);  // FormatException if invalid

// ✓ Safe
if (int.TryParse(userInput, out int x))
{
    Console.WriteLine($"Value: {x}");
}
else
{
    Console.WriteLine("Invalid input");
}
```

## Quick recap

- **NullReferenceException**: Object is `null`; use `?.` or null checks
- **ArgumentException** family: Invalid arguments; validate them
- **FormatException**: String can't be parsed; use `TryParse`
- **IndexOutOfRangeException**: Index out of bounds; check length first
- **InvalidOperationException**: Object state doesn't allow operation; check state
- **KeyNotFoundException**: Key not in dictionary; use `TryGetValue`
- **FileNotFoundException / DirectoryNotFoundException**: File/directory doesn't exist; check with `File.Exists()` or `Directory.Exists()`
- **TimeoutException**: Operation took too long; increase timeout or optimize
- **ObjectDisposedException**: Object already disposed; don't use it after disposal
- **StackOverflowException**: Cannot be caught; fix the infinite recursion
- Always read the message, check the type, and find the first line of YOUR code in the stack trace to debug quickly.
