---
title: Type Conversion in C#
topic: C#
tags: [csharp, conversion, casting, parse, tryrparse, boxing, unboxing]
date: 2026-11-06
---

# Type Conversion in C#

Converting a value from one type to another is a common task. C# offers several ways to do it: implicit conversion, explicit casting, `Parse`, `TryParse`, and the `Convert` class. Each has different use cases and error-handling characteristics.

## Implicit conversion (safe, automatic)

The compiler automatically converts a smaller type to a larger type with no data loss:

```csharp
int x = 100;
long y = x;              // ✓ Implicit: int → long (no data loss)
double z = 42;           // ✓ Implicit: int → double

// Implicit conversions are safe
byte b = 255;
int i = b;               // ✓ No loss
```

## Explicit casting (requires cast, may lose data)

Use `(TargetType)` to convert from a larger type to a smaller type. Compiler requires explicit syntax:

```csharp
long big = 1000;
int small = (int)big;     // ✓ Explicit cast: long → int

double d = 3.99;
int i = (int)d;           // 3 (truncates, doesn't round)

// ❌ Without cast: compiler error CS0266
// int x = big;            // Error: cannot implicitly convert long to int

// ✓ With cast:
int x = (int)big;         // Works
```

## Parse() and TryParse()

Use these to convert strings to other types:

### Parse(): Simple, but throws on invalid input

```csharp
string input = "42";
int number = int.Parse(input);        // 42

string date = "2026-11-06";
DateTime parsed = DateTime.Parse(date);

// ❌ If input is invalid, throws FormatException
string invalid = "abc";
int x = int.Parse(invalid);           // Throws FormatException
```

### TryParse(): Safe, returns bool

Returns `false` if conversion fails; returns `true` and outputs the value if successful:

```csharp
string input = "42";
if (int.TryParse(input, out int number))
{
    Console.WriteLine($"Parsed: {number}");  // Parsed: 42
}
else
{
    Console.WriteLine("Invalid input");
}

// TryParse never throws
string invalid = "abc";
if (int.TryParse(invalid, out int x))
{
    Console.WriteLine(x);  // Never reached
}
else
{
    Console.WriteLine("Not a valid integer");  // This runs
}
```

### Real-world example: Safe user input

```csharp
Console.Write("Enter your age: ");
string input = Console.ReadLine();

if (int.TryParse(input, out int age) && age >= 0)
{
    Console.WriteLine($"You are {age} years old");
}
else
{
    Console.WriteLine("Invalid age. Please enter a positive integer.");
}
```

**Best practice:** Use `TryParse()` for user input; use `Parse()` only when you're certain the string is valid.

## The Convert class

`System.Convert` offers a unified API for conversions:

```csharp
string input = "42";
int number = Convert.ToInt32(input);   // Calls Parse internally

double d = 3.99;
int truncated = Convert.ToInt32(d);    // 4 (rounds, not truncates!)

// Works with various types
string fromBool = Convert.ToString(true);     // "True"
int fromBool2 = Convert.ToInt32(true);        // 1
```

**Note:** `Convert.ToInt32()` rounds, while direct casting truncates.

## Boxing and unboxing

**Boxing** wraps a value type in an `object`. **Unboxing** extracts it back. Both involve memory allocation and performance cost:

```csharp
// Boxing: value type → object
int x = 42;
object boxed = x;          // Boxed: allocates on heap

// Unboxing: object → value type (must cast to the original type)
int unboxed = (int)boxed;  // ✓ Works: object was originally int

// ❌ Wrong type on unbox: throws InvalidCastException
long wrongType = (long)boxed;  // Error: object was int, not long
```

Avoid boxing/unboxing in performance-critical code; use generics instead:

```csharp
// ❌ Bad: boxing happens in the list
List<object> list = new List<object> { 1, 2, 3 };  // Each int is boxed

// ✓ Good: no boxing with generics
List<int> list = new List<int> { 1, 2, 3 };  // No boxing
```

## Common conversion errors and fixes

### FormatException: Cannot parse string

**Problem:** String is not in the expected format.

```csharp
// ❌ Error: "abc" is not a number
int x = int.Parse("abc");   // Throws FormatException

// ✓ Fix 1: Use TryParse
if (int.TryParse("abc", out int result))
{
    Console.WriteLine(result);
}
else
{
    Console.WriteLine("Invalid format");
}

// ✓ Fix 2: Ensure valid input before parsing
string input = "42";
int x = int.Parse(input);   // OK
```

### InvalidCastException: Cannot unbox to wrong type

**Problem:** Unboxing to a type different from the original.

```csharp
object boxed = 42;           // Boxed int

// ❌ Error: object was int, not long
long value = (long)boxed;    // Throws InvalidCastException

// ✓ Fix: Unbox to the correct type
int value = (int)boxed;      // ✓ OK
```

### OverflowException: Value out of range

**Problem:** Value exceeds the target type's range.

```csharp
long big = long.MaxValue;
int x = (int)big;            // Wraps silently to negative (unchecked)

// ✓ Fix: Use checked to throw exception
try
{
    checked
    {
        int x = (int)big;    // Throws OverflowException
    }
}
catch (OverflowException)
{
    Console.WriteLine("Value too large");
}
```

### CS0266: Cannot implicitly convert

**Problem:** Trying to assign without an explicit cast.

```csharp
long value = 1000;
int x = value;               // ❌ CS0266: no implicit conversion

// ✓ Fix: Add explicit cast
int x = (int)value;          // ✓
```

### CS0221: Constant value out of range

**Problem:** Numeric literal doesn't fit in target type.

```csharp
byte b = 300;                // ❌ CS0221: 300 > 255 (max byte)

// ✓ Fix 1: Use a value that fits
byte b = 255;                // ✓

// ✓ Fix 2: Cast (at runtime)
int temp = 300;
byte b = (byte)temp;         // ✓ (wraps to 44)
```

## Conversion table: common scenarios

| From | To | Implicit? | Method | Example |
|------|----|-----------|---------|---------| 
| `int` | `long` | Yes | Auto | `long x = 100;` |
| `long` | `int` | No | Cast | `int x = (int)1000L;` |
| `string` | `int` | No | Parse/TryParse | `int.Parse("42")` |
| `int` | `string` | No | ToString | `100.ToString()` |
| `double` | `decimal` | No | Cast | `(decimal)3.14` |
| `int` | `double` | Yes | Auto | `double x = 42;` |
| `bool` | `int` | No | Convert | `Convert.ToInt32(true)` → 1 |
| `object` | `int` | No | Unbox | `(int)boxed` |

## ToString()

Convert any value to its string representation:

```csharp
int number = 42;
string text = number.ToString();          // "42"

double d = 3.14159;
string formatted = d.ToString("F2");      // "3.14"

bool flag = true;
string boolText = flag.ToString();        // "True"

// With string interpolation (automatic)
int x = 100;
string message = $"Value is {x}";        // "Value is 100"
```

## Examples

```csharp
// Example 1: Parse and handle errors
Console.Write("Enter a number: ");
string input = Console.ReadLine();

if (double.TryParse(input, out double value))
{
    Console.WriteLine($"Parsed: {value * 2}");
}
else
{
    Console.WriteLine("Invalid number");
}

// Example 2: Multiple conversions
int x = 42;
long y = x;                      // Implicit
string text = y.ToString();      // ToString
int back = int.Parse(text);      // Parse

// Example 3: Safe casting
object obj = 42;
if (obj is int intValue)         // Pattern matching
{
    Console.WriteLine(intValue);
}
```

## Common mistakes

- **Using Parse() on untrusted user input** – Use `TryParse()` instead to avoid exceptions.
- **Forgetting to cast when shrinking types** – `long → int` needs `(int)`.
- **Unboxing to the wrong type** – The unboxed type must match the original boxed type.
- **Assuming boxing is free** – It allocates memory and is slow; use generics to avoid it.

## Quick recap

- Implicit conversion: smaller → larger (safe, no cast needed).
- Explicit conversion: larger → smaller (requires `(TargetType)` cast).
- `Parse()`: converts strings but throws on invalid input.
- `TryParse()`: safer for user input, returns bool.
- `Convert` class: unified API with additional options.
- Boxing wraps value types in objects; unboxing extracts them (costly; avoid if possible).
- Common errors: FormatException, InvalidCastException, OverflowException, CS0266, CS0221.
- Always use `TryParse()` for user input; `Parse()` only for known-valid strings.
