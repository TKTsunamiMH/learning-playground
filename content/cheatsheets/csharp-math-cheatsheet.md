---
title: C# Math and Numbers Cheatsheet
topic: C#
tags: [csharp, cheatsheet, math, operators, parsing, formatting, random]
date: 2026-11-13
---

# C# Math and Numbers Cheatsheet

Quick reference for operators, Math class methods, rounding, random numbers, parsing, and formatting.

## Arithmetic operators and precedence

| Operator | Name | Example | Result |
|----------|------|---------|--------|
| `+` | Addition | `5 + 3` | 8 |
| `-` | Subtraction | `5 - 3` | 2 |
| `*` | Multiplication | `5 * 3` | 15 |
| `/` | Division | `5 / 2` | 2 (int) or 2.5 (if one is double) |
| `%` | Modulo | `5 % 3` | 2 |
| `+=`, `-=`, `*=`, `/=`, `%=` | Compound assignment | `x += 5;` | Adds 5 to x |
| `++` / `--` | Increment / Decrement | `x++` (postfix) or `++x` (prefix) | Returns old/new value |

**Precedence (high to low):** `++x`, `x++`, `-x` → `*`, `/`, `%` → `+`, `-` → assignment

Use parentheses for clarity: `(a + b) * c` instead of `a + b * c`.

## Most important Math class methods

All methods are **static**: call as `Math.Method(...)` without creating an object.

| Method | Purpose | Example | Result |
|--------|---------|---------|--------|
| `Math.Abs(x)` | Absolute value | `Math.Abs(-5)` | 5 |
| `Math.Min(x, y)` | Minimum | `Math.Min(3, 7)` | 3 |
| `Math.Max(x, y)` | Maximum | `Math.Max(3, 7)` | 7 |
| `Math.Sign(x)` | Sign (-1, 0, or 1) | `Math.Sign(-5)` | -1 |
| `Math.Clamp(x, min, max)` | Clamp x between bounds | `Math.Clamp(15, 0, 10)` | 10 |
| `Math.Pow(x, y)` | x to the power of y (returns double) | `Math.Pow(2, 3)` | 8.0 |
| `Math.Sqrt(x)` | Square root (returns double) | `Math.Sqrt(9)` | 3.0 |
| `Math.DivRem(a, b, out r)` | Quotient and remainder | `Math.DivRem(17, 5, out int r)` | quotient 3, r 2 |
| `Math.Round(x, digits)` | Round to N decimal places | `Math.Round(3.14159, 2)` | 3.14 |
| `Math.Floor(x)` | Round down | `Math.Floor(3.9)` | 3 |
| `Math.Ceiling(x)` | Round up | `Math.Ceiling(3.1)` | 4 |
| `Math.Truncate(x)` | Remove fractional part | `Math.Truncate(3.9)` | 3 |
| `Math.Sin(radians)`, `Cos`, `Tan` | Trig functions (radians, not degrees) | `Math.Sin(Math.PI / 2)` | 1 |
| `Math.Atan2(y, x)` | Angle between point and x-axis | `Math.Atan2(1, 1)` | ~0.785 (45°) |
| `Math.Log(x)`, `Log10(x)` | Logarithm | `Math.Log(Math.E)` | 1 |
| `Math.Exp(x)` | e to the power of x | `Math.Exp(1)` | ~2.718 |
| `Math.PI` | π constant | `Math.PI` | ~3.14159 |
| `Math.E` | e constant | `Math.E` | ~2.71828 |

**Key:** `Pow()` and `Sqrt()` return `double`, so cast to `int` if needed: `(int)Math.Pow(2, 3)` → 8.

## Rounding comparison

| Method | 2.4 | 2.5 | 2.6 | -2.5 |
|--------|-----|-----|-----|------|
| `Math.Round()` | 2 | 2 | 3 | -2 |
| `Math.Floor()` | 2 | 2 | 2 | -3 |
| `Math.Ceiling()` | 3 | 3 | 3 | -2 |
| `Math.Truncate()` | 2 | 2 | 2 | -2 |
| `(int)x` (casting) | 2 | 2 | 2 | -2 |

**Note:** `Math.Round(2.5)` uses banker's rounding (rounds to even). For traditional rounding, use `Math.Round(2.5, 0, MidpointRounding.AwayFromZero)` → 3.

## Random numbers

```csharp
// Random integer from 0 to 99 (max is exclusive)
int num = Random.Shared.Next(100);

// Random integer from 1 to 6 (dice roll)
int die = Random.Shared.Next(1, 7);

// Random double from 0.0 to 1.0 (exclusive)
double d = Random.Shared.NextDouble();

// Pick a random item from array or list
T item = collection[Random.Shared.Next(collection.Count)];
```

**Note:** `Next(min, max)` returns `[min, max)` (min inclusive, max exclusive).

## Parsing and formatting

### Parse text → number

```csharp
// Throws FormatException if invalid
int num = int.Parse("42");
double d = double.Parse("3.14");

// Safer: returns true/false
if (int.TryParse("42", out int num)) { }

// Use InvariantCulture for consistent parsing
if (double.TryParse(input, NumberStyles.Any, 
    CultureInfo.InvariantCulture, out double value)) { }
```

### Format number → text

```csharp
int num = 42;
double price = 19.99;

// Basic
num.ToString();                    // "42"

// Format specifiers
price.ToString("F2");              // "19.99" (2 decimal places)
num.ToString("D3");                // "042" (3 digits, leading zeros)
num.ToString("X");                 // "2A" (hexadecimal)
price.ToString("C");               // "$19.99" (currency)
0.5.ToString("P");                 // "50.00%" (percent)

// String interpolation with format
$"{price:F2}";                     // "19.99"
$"{num:D4}";                       // "0042"
```

### Convert to/from different bases

```csharp
// Convert to binary, octal, hex
int num = 42;
Convert.ToString(num, 2);          // "101010" (binary)
Convert.ToString(num, 8);          // "52" (octal)
Convert.ToString(num, 16);         // "2a" (hexadecimal)
num.ToString("X");                 // "2A" (hex uppercase)

// Parse from hex/binary
int hex = int.Parse("2A", NumberStyles.HexNumber);  // 42
int binary = Convert.ToInt32("101010", 2);          // 42
```

## Digit separators and literal suffixes

```csharp
long big = 1_000_000;       // Digit separator for readability
float f = 3.14f;            // float suffix
double d = 3.14;            // double (default for decimals)
decimal m = 3.14m;          // decimal suffix (use for money!)
long l = 1000L;             // long suffix
uint u = 1000U;             // uint suffix
ulong ul = 1000UL;          // ulong suffix
```

## Common errors and fixes

| Error | Cause | Example | Fix |
|-------|-------|---------|-----|
| `DivideByZeroException` | Division by zero (int only) | `int x = 10 / 0;` | Check divisor first: `if (b != 0) result = a / b;` |
| `OverflowException` | `Math.Abs(int.MinValue)` | `Math.Abs(int.MinValue)` | Cast to long first: `Math.Abs((long)int.MinValue)` |
| CS0266 | Cannot implicitly convert `double` to `int` | `int x = Math.Pow(2, 3);` | Add explicit cast: `int x = (int)Math.Pow(2, 3);` |
| `FormatException` | `int.Parse()` on invalid input | `int.Parse("hello")` | Use `int.TryParse()` instead |
| Culture-dependent parsing | Locale affects decimal separator | `double.Parse("3,14")` | Use `CultureInfo.InvariantCulture` |

### Key fixes

**Integer division truncates, not rounds:**
```csharp
// ❌ Wrong (cast after division)
double result = (double)(7 / 2);    // 3.0

// ✓ Correct (cast before division)
double result = (double)7 / 2;      // 3.5
```

**Formatting doesn't change the value:**
```csharp
double value = 3.14159;
Console.WriteLine($"{value:F2}");   // Display: "3.14"
Console.WriteLine(value);            // Actual value: 3.14159 (unchanged)

// To actually change the value, use Math.Round
double rounded = Math.Round(value, 2);  // Value is now 3.14
```

**Pow and Sqrt return double:**
```csharp
// ❌ CS0266 error
int result = Math.Pow(2, 3);

// ✓ Cast to int
int result = (int)Math.Pow(2, 3);   // 8
```

## Links to detailed notes

- [Operators and Calculations](csharp-operators-and-calculations.md)
- [The Math Class in C#](csharp-math-class-basics.md)
- [Rounding Numbers](csharp-rounding-numbers.md)
- [Advanced Math and Random](csharp-math-advanced-and-random.md)
- [Parsing and Formatting Numbers](csharp-parsing-and-formatting-numbers.md)
