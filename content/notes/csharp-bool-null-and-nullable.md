---
title: Bool, Null, and Nullable Types in C#
topic: C#
tags: [csharp, bool, null, nullable, default values]
date: 2026-11-06
---

# Bool, Null, and Nullable Types in C#

`bool` represents a binary yes/no value. `null` represents "no value" and applies to reference types and nullable value types. Understanding these types is essential for conditional logic and safe null handling.

## bool: True or false

A `bool` holds exactly two values: `true` or `false`:

```csharp
bool isActive = true;
bool isEmpty = false;

// Comparison expressions evaluate to bool
bool isGreater = 5 > 3;          // true
bool isEqual = "hello" == "hi";  // false
```

## Logical operators

| Operator | Name | Example | Result |
|----------|------|---------|--------|
| `&&` | AND | `true && false` | `false` |
| `\|\|` | OR | `true \|\| false` | `true` |
| `!` | NOT | `!true` | `false` |

```csharp
int age = 25;
bool hasLicense = true;
bool canDrive = age >= 18 && hasLicense;     // true

bool isWeekend = false;
bool isSunny = true;
bool goToBeach = isWeekend || isSunny;       // true

bool isClosed = !isOpen;                     // Negation
```

### Short-circuit evaluation

`&&` and `||` stop evaluating as soon as the result is determined:

```csharp
// Short-circuit: DoExpensiveCheck() is never called
if (false && DoExpensiveCheck())  // Stops at false
{
}

// Short-circuit: DoExpensiveCheck() is called
if (true && DoExpensiveCheck())   // Evaluates both
{
}

// Short-circuit: DoExpensiveCheck() is never called
if (true || DoExpensiveCheck())   // Stops at true
{
}
```

This is important for performance and safety—use it wisely to avoid expensive operations.

## null: No value

`null` represents the absence of a value. It applies to:
- **Reference types** (like `string`, `class`)
- **Nullable value types** (like `int?`, `bool?`)

```csharp
string name = null;           // null reference (no object)
List<int> list = null;        // null reference
int? count = null;            // Nullable int, holds no value

// Checking for null
if (name == null) { }         // Unsafe: will throw if name is null
if (name != null) { }         // Safe: only access name here
```

## Nullable value types: int?, bool?, etc.

By default, value types like `int` and `bool` cannot be `null`. To allow null, add `?` to make them nullable:

```csharp
int regularInt = 0;           // Must have a value
int? nullableInt = null;      // Can be null or an int

bool regularBool = false;     // Must be true or false
bool? nullableBool = null;    // Can be null, true, or false

// Assigning values
int? age = 30;
age = null;                   // ✓ Now it's null
age = 25;                     // ✓ Back to a value
```

### Accessing the value with HasValue and Value

```csharp
int? age = 30;

// ✓ Safe approach: check HasValue first
if (age.HasValue)
{
    Console.WriteLine($"Age is {age.Value}");  // age.Value extracts the int
}
else
{
    Console.WriteLine("Age is not set");
}

// ❌ Unsafe: will throw InvalidOperationException if age is null
// Console.WriteLine(age.Value);
```

### The null-coalescing operator ??

Use `??` to provide a default value when null:

```csharp
int? count = null;
int result = count ?? 0;      // 0 (default, because count is null)

count = 5;
result = count ?? 0;          // 5 (count has a value)

// Chaining
string name = null;
string displayName = name ?? "Anonymous";
Console.WriteLine(displayName);  // "Anonymous"

// Chaining multiple
int? a = null;
int? b = null;
int? c = 10;
int result = a ?? b ?? c ?? 0;   // 10
```

### The null-conditional operator ?.

Use `?.` to safely call methods on nullable objects:

```csharp
string text = null;

// ❌ Will throw NullReferenceException
// int length = text.Length;

// ✓ Safe: returns null if text is null
int? length = text?.Length;       // null
if (length.HasValue)
{
    Console.WriteLine($"Length is {length}");
}

// Chaining with ??
string name = null;
int nameLength = name?.Length ?? 0;  // 0 (name is null)

// Method calls
List<int> list = null;
list?.Add(5);                    // Does nothing if list is null
```

## Nullable reference types (C# 8+)

Modern C# (8.0 and later) can track nullable reference types with `string?`:

```csharp
#nullable enable   // Enable nullable reference type checking

string name = "Alice";          // Non-nullable: must have a value
string? optional = null;        // Nullable: can be null

// Compiler warns if you might use a possibly-null value
if (optional != null)
{
    Console.WriteLine(optional.Length);  // ✓ Safe: checked for null
}
```

This is a compile-time feature that helps prevent null reference exceptions.

## Default values of types

When a variable is not initialized, it gets a default value:

```csharp
int i = default;               // 0
double d = default;            // 0.0
bool b = default;              // false
char c = default;              // '\0' (null character, invisible)
string s = default;            // null
List<int> list = default;      // null

// Explicitly
int x = default(int);          // 0
bool y = default(bool);        // false
```

For local variables, C# requires explicit initialization. For fields and properties, defaults are applied automatically.

## Examples

```csharp
// Example 1: Validating user input
int? userAge = GetUserAge();  // Might return null
if (userAge.HasValue && userAge.Value >= 18)
{
    Console.WriteLine("Adult");
}
else if (userAge.HasValue)
{
    Console.WriteLine("Minor");
}
else
{
    Console.WriteLine("Age not provided");
}

// Example 2: Using null-coalescing
string displayName = GetUserName() ?? "Guest";
Console.WriteLine(displayName);

// Example 3: Safe navigation
var order = GetOrder();
decimal? totalPrice = order?.Items?.Count > 0 ? order.Total : null;
```

## Common mistakes

- **Accessing nullable.Value without checking HasValue first** – Throws `InvalidOperationException` if null.
- **Comparing null with `==` on possibly-null objects** – Use `?.` operator or check `== null` explicitly.
- **Forgetting that bool defaults to false** – Uninitialized bool fields are `false`, not "unset."

## Quick recap

- `bool` is `true` or `false`.
- Logical operators: `&&` (AND), `||` (OR), `!` (NOT).
- `&&` and `||` short-circuit: stop evaluating once the result is known.
- `null` means "no value"; applies to reference types and nullable value types.
- `int?`, `bool?`, etc. are nullable value types; can be null or a regular value.
- Use `HasValue` and `Value` to safely check and access nullable types.
- `??` (null-coalescing) provides a default: `count ?? 0`.
- `?.` (null-conditional) safely calls methods: `text?.Length`.
- Default values: numbers default to 0, bool to false, references to null.
