---
title: Static Members in C#
topic: C#
tags: [csharp, static, class, instance, constant]
date: 2026-11-04
---

# Static Members in C#

A **static** member belongs to the **type itself**, not to individual instances (objects). When you call a static member, you use the class name, not an object: `ClassName.Member`. This is useful for shared values, utility functions, and constants that don't depend on any particular object's state.

## Static fields, methods, and properties

```csharp
public class Counter
{
    // Static field: shared by all instances
    private static int _total = 0;

    public Counter()
    {
        _total++;
    }

    // Static method: no instance needed
    public static int GetTotal()
    {
        return _total;
    }

    // Static property: also accessed via class name
    public static int Total => _total;
}

// Usage:
var c1 = new Counter();  // _total = 1
var c2 = new Counter();  // _total = 2
Console.WriteLine(Counter.GetTotal());  // 2
Console.WriteLine(Counter.Total);       // 2
```

## Instance vs static comparison

| | Instance | Static |
|---|----------|--------|
| **Belongs to** | Object (instance) | Type (class) |
| **Created when** | Object is created | Class is loaded |
| **How to access** | `object.Member` | `ClassName.Member` |
| **Can access** | Instance members, static members | Only static members |
| **Separate copy for** | Each object | All objects (shared) |

## Static constructors

A static constructor runs once when the class first loads, before any instances are created:

```csharp
public class Settings
{
    public static readonly string ConfigPath;

    static Settings()  // No parameters, no access modifier
    {
        ConfigPath = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData),
            "MyApp.config"
        );
        Console.WriteLine("Settings initialized");
    }
}

// Output: "Settings initialized" (runs once, before first use)
var path = Settings.ConfigPath;
```

## Common compiler error: CS0120

If you forget to make a member static and try to access it via the class name, you get:

```csharp
public class MathHelper
{
    public int Add(int a, int b) => a + b;  // Instance method
}

// ❌ Error CS0120: An object reference is required for the non-static member 'Add'
var result = MathHelper.Add(2, 3);

// ✓ Fix 1: Make the method static
public class MathHelper
{
    public static int Add(int a, int b) => a + b;
}
var result = MathHelper.Add(2, 3);  // ✓

// ✓ Fix 2: Create an instance first
var helper = new MathHelper();
var result = helper.Add(2, 3);  // ✓
```

## Static classes

A class can be declared `static` if all its members are static. You cannot create instances:

```csharp
public static class MathUtils
{
    public static double Square(double x) => x * x;
    public static double Cube(double x) => x * x * x;
}

var result = MathUtils.Square(5);  // ✓
// var utils = new MathUtils();  // ❌ Compiler error: cannot instantiate static class
```

## Const vs static readonly

- **`const`** – Compile-time constant, value is baked into the code, zero runtime overhead.
- **`static readonly`** – Runtime constant, value is set once but computed at runtime.

```csharp
public class Physics
{
    public const double PI = 3.14159;  // Compile-time
    public static readonly DateTime StartupTime = DateTime.Now;  // Runtime
}
```

## When to use static

**Good use cases:**
- **Pure utility/helper methods** with no state (e.g., `Math.Abs()`, `string.IsNullOrEmpty()`)
- **Constants and configuration** (e.g., `Math.PI`, `ApiEndpoint`)
- **Factory methods** that create and return instances
- **Extension methods** (always static)
- **Program.Main()** entry point

**Bad use cases:**
- **Shared mutable state** – Static fields that change lead to bugs in multi-threaded code.
- **Anything that should be testable** – Static dependencies are hard to mock and test.
- **Anything that needs dependency injection** – DI replaces static with instance members.

```csharp
// ❌ Bad: mutable static state (hard to test, thread-unsafe)
public static class GlobalCache
{
    public static Dictionary<string, object> Items = new();
}

// ✓ Good: each service has its own cache instance
public class CacheService
{
    private Dictionary<string, object> _items = new();
}
```

## Example: With and without static

```csharp
// ❌ Static version: limited and hard to test
public static class BadCalculator
{
    public static double Add(double a, double b) => a + b;
}

// Later, you want to track operations for logging
// Can't add state to a static class!

// ✓ Instance version: flexible
public class Calculator
{
    private List<string> _history = new();

    public double Add(double a, double b)
    {
        var result = a + b;
        _history.Add($"Added {a} + {b} = {result}");
        return result;
    }

    public IReadOnlyList<string> History => _history.AsReadOnly();
}

var calc = new Calculator();
var sum = calc.Add(2, 3);
Console.WriteLine(calc.History[0]);  // "Added 2 + 3 = 5"
```

## Common mistakes

- **Using static when you should use instances** – Static ties code together and breaks testing.
- **Forgetting that CS0120 means "use the class name" or "create an instance"** – Pick based on what you need.
- **Shared mutable static state** – Very dangerous in multithreaded apps; prefer instance fields.

## Quick recap

- Static members belong to the type, not instances; access via `ClassName.Member`.
- Static fields, methods, properties, and constructors all exist at the class level.
- Use static for utilities, constants, and factory methods—not for state that changes.
- Instance members are more flexible and testable; prefer them by default.
- CS0120 error? Either make the member `static` or create an instance first.
