---
title: Floating-Point and Decimal Types in C#
topic: C#
tags: [csharp, float, double, decimal, precision, money, math]
date: 2026-11-06
---

# Floating-Point and Decimal Types in C#

C# offers three types for storing numbers with fractional parts: `float`, `double`, and `decimal`. They differ in precision, range, and performance. Choosing the right one depends on your use case.

## float vs double vs decimal

| Type | Alias for | Bytes | Precision | Range | When to use |
|------|-----------|-------|-----------|-------|-------------|
| `float` | System.Single | 4 | ~7 digits | ±1.5E-45 to ±3.4E38 | Graphics, games, performance-critical |
| `double` | System.Double | 8 | ~15-17 digits | ±5.0E-324 to ±1.7E308 | General math, science, default choice |
| `decimal` | System.Decimal | 16 | 28-29 digits | ±1.0E-28 to ±7.9E28 | **Money, financial calculations** |

**Key insight:** Use `decimal` for money; use `double` for math; use `float` only when memory or performance is critical (graphics, game engines).

## The floating-point precision problem

`float` and `double` use **binary representation**, which cannot exactly represent all decimal values. This causes rounding errors:

```csharp
// ❌ Common gotcha: 0.1 + 0.2 ≠ 0.3 with double
double a = 0.1;
double b = 0.2;
double c = a + b;
Console.WriteLine(c == 0.3);              // false!
Console.WriteLine(c);                     // 0.30000000000000004
Console.WriteLine($"{c:F20}");            // 0.30000000000000004441
```

### Why does this happen?

Binary can represent 1/2, 1/4, 1/8 exactly, but 1/10 becomes a repeating fraction. The result is stored with limited precision, introducing tiny errors.

### The solution for money

Use `decimal`, which uses **base-10 representation**:

```csharp
// ✓ Decimal is exact for financial values
decimal a = 0.1m;
decimal b = 0.2m;
decimal c = a + b;
Console.WriteLine(c == 0.3m);             // true
Console.WriteLine(c);                     // 0.3
```

## When to use each type

**Use `decimal` for:**
- Prices, salaries, taxes, any financial calculation
- Accounting and reporting
- Legal/regulatory numbers that must be precise

```csharp
decimal price = 19.99m;
decimal taxRate = 0.08m;
decimal total = price * (1 + taxRate);
Console.WriteLine(total);  // 21.5892 (exact)
```

**Use `double` for:**
- General scientific and mathematical calculations
- Physics, statistics, analytics
- Default choice when precision is "good enough"

```csharp
double x = Math.Sqrt(2);      // ~1.414213562373095
double angle = Math.PI;        // ~3.141592653589793
double result = Math.Sin(angle);
```

**Use `float` for:**
- Graphics and game engines (GPU-friendly)
- Large arrays where memory is critical
- Rarely needed in business or web apps

```csharp
float[] vertices = new float[10_000_000];  // Saves 40 MB vs double
```

## Safely comparing floating-point numbers

Because of rounding errors, never use `==` to compare floats and doubles:

```csharp
// ❌ Unreliable with double
double a = 0.1 + 0.2;
if (a == 0.3) { }  // May be false due to rounding

// ✓ Check if difference is within a small tolerance
double tolerance = 0.00001;
if (Math.Abs(a - 0.3) < tolerance) { }  // Safer

// ✓ Or use decimal for exact comparison
decimal da = 0.1m + 0.2m;
if (da == 0.3m) { }  // Safe and reliable
```

## Integer vs floating-point division

Dividing two integers always produces an integer (truncating the decimal):

```csharp
int a = 7;
int b = 2;
int result = a / b;     // 3 (not 3.5)
Console.WriteLine(result);  // 3
```

To get a decimal result, cast at least one operand to a decimal type:

```csharp
int a = 7;
int b = 2;
double result = (double)a / b;  // 3.5
Console.WriteLine(result);      // 3.5

decimal result2 = (decimal)a / b;  // 3.5m
Console.WriteLine(result2);        // 3.5
```

## Rounding

Use `Math.Round()` to control decimal places:

```csharp
double value = 3.14159;
double rounded = Math.Round(value, 2);     // 3.14
Console.WriteLine(rounded);                // 3.14

decimal price = 19.996m;
decimal rounded2 = Math.Round(price, 2);   // 20.00 (banker's rounding)
```

Or use `ToString()` for formatting (doesn't change the value):

```csharp
double value = 3.14159;
Console.WriteLine(value.ToString("F2"));   // "3.14"
Console.WriteLine($"{value:F2}");         // "3.14"
```

## Casting between types

```csharp
// double to decimal
double d = 3.14159;
decimal dec = (decimal)d;  // Explicit cast required

// decimal to double
decimal price = 99.99m;
double dbl = (double)price;  // Explicit cast required

// int to double (implicit)
int count = 100;
double d2 = count;  // ✓ No cast needed

// double to int (explicit)
double value = 3.99;
int truncated = (int)value;  // 3 (truncates, doesn't round)
```

## Literal suffixes and defaults

Suffixes specify the type; without a suffix, decimals default to `double`:

```csharp
double x = 3.14;      // Default (no suffix)
double y = 3.14d;     // Explicit d suffix
float z = 3.14f;      // Float requires f suffix
decimal m = 3.14m;    // Decimal requires m suffix

// ❌ Missing suffix: this is a double, not decimal
decimal price = 19.99;  // Implicitly converts from double to decimal
                        // (loses precision, not recommended)

// ✓ Always use m suffix for money
decimal price = 19.99m;
```

## Examples

```csharp
// Example 1: Financial calculation with decimal
decimal itemPrice = 29.99m;
decimal quantity = 3;
decimal subtotal = itemPrice * quantity;
decimal tax = Math.Round(subtotal * 0.08m, 2);
decimal total = subtotal + tax;
Console.WriteLine($"Total: ${total}");  // Total: $97.17

// Example 2: Math with double
double radius = 5.0;
double area = Math.PI * radius * radius;
Console.WriteLine($"Area: {area:F2}");  // Area: 78.50

// Example 3: Casting to get decimal result
int x = 7;
int y = 2;
double result = (double)x / y;  // 3.5
```

## Common mistakes

- **Using `double` for money** – Binary rounding errors accumulate; always use `decimal`.
- **Comparing floats with `==`** – Use a tolerance check or switch to `decimal`.
- **Forgetting the `m` suffix for decimals** – `19.99` is a double (loses precision); use `19.99m`.

## Quick recap

- Use `decimal` for money and financial calculations (exact base-10).
- Use `double` for general math and science (good precision, standard choice).
- Use `float` only for graphics/games where memory is critical.
- Binary floating-point has rounding errors; avoid `==` comparisons, use tolerance.
- Integer division truncates; cast to double/decimal to get fractional results.
- Always use `m` suffix for decimal literals: `19.99m`, not `19.99`.
