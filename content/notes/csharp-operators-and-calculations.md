---
title: Operators and Calculations in C#
topic: C#
tags: [csharp, operators, arithmetic, modulo, division, precedence, increment, decrement]
date: 2026-11-13
---

# Operators and Calculations in C#

Arithmetic operators perform calculations on numbers. Understanding how they work, their precedence, and common pitfalls is essential for writing correct math code.

## Arithmetic operators

| Operator | Name | Example | Result |
|----------|------|---------|--------|
| `+` | Addition | `5 + 3` | 8 |
| `-` | Subtraction | `5 - 3` | 2 |
| `*` | Multiplication | `5 * 3` | 15 |
| `/` | Division | `5 / 3` | 1 (integer) or 1.67 (decimal) |
| `%` | Modulo (remainder) | `5 % 3` | 2 |

```csharp
int a = 10;
int b = 3;

int sum = a + b;           // 13
int diff = a - b;          // 7
int prod = a * b;          // 30
int quotient = a / b;      // 3 (integer division truncates)
int remainder = a % b;     // 1
```

## Compound assignment operators

Combine an operator with assignment for brevity:

| Operator | Equivalent | Example |
|----------|-----------|---------|
| `+=` | `x = x + y` | `x += 5;` |
| `-=` | `x = x - y` | `x -= 5;` |
| `*=` | `x = x * y` | `x *= 2;` |
| `/=` | `x = x / y` | `x /= 2;` |
| `%=` | `x = x % y` | `x %= 10;` |

```csharp
int count = 10;
count += 5;    // count = 15
count -= 3;    // count = 12
count *= 2;    // count = 24
count /= 4;    // count = 6
count %= 5;    // count = 1
```

## Increment and decrement: ++ and --

The `++` and `--` operators add or subtract 1. They can be **prefix** or **postfix**, and the difference matters:

| Form | Name | Effect | Returns | Example |
|------|------|--------|---------|---------|
| `++x` | Prefix increment | Increment first | New value | `int y = ++x;` |
| `x++` | Postfix increment | Return first, then increment | Old value | `int y = x++;` |
| `--x` | Prefix decrement | Decrement first | New value | `int y = --x;` |
| `x--` | Postfix decrement | Return first, then decrement | Old value | `int y = x--;` |

```csharp
// Prefix: increment first, then use the new value
int x = 5;
int y = ++x;  // x is 6, y is 6
Console.WriteLine($"x={x}, y={y}");  // x=6, y=6

// Postfix: use the old value, then increment
int a = 5;
int b = a++;  // a becomes 6, but b gets the old value (5)
Console.WriteLine($"a={a}, b={b}");  // a=6, b=5
```

**In loops, prefix is slightly more efficient (no temporary copy of the old value), but the difference is negligible:**

```csharp
for (int i = 0; i < 10; i++)   // Postfix (common idiom, fine)
for (int i = 0; i < 10; ++i)   // Prefix (very slightly faster, rarely matters)
```

## Operator precedence and parentheses

Operators follow a **precedence order**: which operations run first without parentheses. Higher precedence operators run before lower ones.

| Precedence (high to low) | Operators |
|--------------------------|-----------|
| 1 (highest) | `++x`, `x++`, `--x`, `x--`, `+x`, `-x` (unary) |
| 2 | `*`, `/`, `%` |
| 3 | `+`, `-` |
| 4 (lowest) | `=`, `+=`, `-=`, etc. |

Without explicit parentheses, `*` and `/` run before `+` and `-`:

```csharp
int result = 2 + 3 * 4;  // 2 + (3 * 4) = 14, not (2 + 3) * 4 = 20
```

**Use parentheses for clarity, even when not strictly required:**

```csharp
// ✓ Clear
int result = (2 + 3) * 4;   // 20

// ✓ Also clear (relies on precedence)
int result = 2 + 3 * 4;     // 14

// ❌ Unclear
int x = a + b * c - d / e % f;

// ✓ Better
int x = a + (b * c) - ((d / e) % f);
```

## Integer division vs floating-point division

When both operands are **integers**, the result is truncated (decimal part discarded). To get a decimal result, cast at least one operand to a decimal type.

```csharp
// Integer division: truncates
int a = 7;
int b = 2;
int result = a / b;           // 3 (not 3.5)
Console.WriteLine(result);    // 3

// Floating-point division: keeps decimal
double x = 7;
double y = 2;
double result2 = x / y;       // 3.5
Console.WriteLine(result2);   // 3.5

// ✓ Cast to get decimal result
int num1 = 7;
int num2 = 2;
double decimal_result = (double)num1 / num2;  // 3.5
Console.WriteLine(decimal_result);            // 3.5

decimal dec_result = (decimal)num1 / num2;    // 3.5m
Console.WriteLine(dec_result);                // 3.5
```

**Common mistake: casting AFTER division**

```csharp
int a = 7;
int b = 2;

// ❌ Wrong: division happens first (as integers), then cast
double wrong = (double)(a / b);  // (double)3 = 3.0

// ✓ Correct: cast before division
double correct = (double)a / b;  // 7.0 / 2 = 3.5
```

## Modulo: remainder and wrapping

The `%` operator returns the **remainder** of a division. It's useful for checking divisibility, cycling through ranges, and detecting even/odd.

```csharp
// Remainder
int a = 17;
int b = 5;
int rem = a % b;              // 2 (17 = 5 * 3 + 2)
Console.WriteLine(rem);       // 2

// Even/odd check
int num = 10;
if (num % 2 == 0) Console.WriteLine("Even");    // 10 % 2 = 0
if (num % 2 != 0) Console.WriteLine("Odd");     // 10 % 2 = 1

// Wrapping around (e.g., circular array index)
int[] arr = new int[5];
int index = 17;
int wrapped = index % arr.Length;  // 17 % 5 = 2
Console.WriteLine(arr[wrapped]);   // Access arr[2]
```

### Modulo with negative numbers

The sign of the result **follows the sign of the dividend** (the left operand):

```csharp
Console.WriteLine(7 % 3);      //  1 (positive)
Console.WriteLine(-7 % 3);     // -1 (negative, same sign as -7)
Console.WriteLine(7 % -3);     //  1 (positive, same sign as 7)
Console.WriteLine(-7 % -3);    // -1 (negative, same sign as -7)
```

## Division by zero

Dividing by zero behaves differently for integers and floating-point:

```csharp
// Integer: throws DivideByZeroException
try
{
    int x = 10;
    int y = 0;
    int result = x / y;  // Throws DivideByZeroException
}
catch (DivideByZeroException)
{
    Console.WriteLine("Cannot divide by zero!");
}

// Floating-point: returns Infinity or NaN
double a = 10.0;
double b = 0.0;
double inf = a / b;             // Infinity
double negInf = -a / b;         // -Infinity
double nan = b / b;             // NaN (0.0 / 0.0)

Console.WriteLine(double.IsInfinity(inf));     // true
Console.WriteLine(double.IsNaN(nan));          // true

// Use these to check for special values
if (double.IsInfinity(result))
{
    Console.WriteLine("Result is infinite");
}
if (double.IsNaN(result))
{
    Console.WriteLine("Result is not a number");
}
```

## Comparison operators

| Operator | Name | Example | Result |
|----------|------|---------|--------|
| `==` | Equal to | `5 == 5` | true |
| `!=` | Not equal to | `5 != 3` | true |
| `<` | Less than | `3 < 5` | true |
| `>` | Greater than | `5 > 3` | true |
| `<=` | Less than or equal | `3 <= 5` | true |
| `>=` | Greater than or equal | `5 >= 5` | true |

```csharp
int x = 10;
int y = 20;

Console.WriteLine(x == y);     // false
Console.WriteLine(x != y);     // true
Console.WriteLine(x < y);      // true
Console.WriteLine(x > y);      // false
Console.WriteLine(x <= y);     // true
Console.WriteLine(x >= y);     // false
```

### Comparing floating-point numbers

Never use `==` for `double` or `float` directly due to rounding errors. Use a tolerance check instead (see [Floating-Point and Decimal Types](csharp-floating-point-and-decimal.md) for details):

```csharp
double a = 0.1 + 0.2;
double b = 0.3;

// ❌ Unreliable
if (a == b) { }  // May be false!

// ✓ Tolerance check
double tolerance = 0.00001;
if (Math.Abs(a - b) < tolerance) { }  // Safe
```

## Common mistakes

- **Forgetting that integer division truncates** – `7 / 2 = 3`, not 3.5. Cast first: `(double)7 / 2`.
- **Casting after division** – `(double)(7 / 2)` gives 3.0, not 3.5. Cast a numerator first: `(double)7 / 2`.
- **Using `==` on floats and doubles** – Use a tolerance check with `Math.Abs(a - b) < epsilon`.

## Quick recap

- Arithmetic operators: `+`, `-`, `*`, `/`, `%` work on numbers.
- Compound assignment: `+=`, `-=`, `*=`, `/=`, `%=` combine operation and assignment.
- Prefix `++x` and `--x` increment/decrement first, then return; postfix `x++` and `x--` return first.
- Precedence: `*`, `/`, `%` run before `+`, `-`; use parentheses for clarity.
- Integer division truncates; cast to `double` or `decimal` for fractional results.
- Modulo (`%`) returns remainder; sign follows the dividend.
- Integer division by zero throws `DivideByZeroException`; float division returns `Infinity` or `NaN`.
- Never compare doubles with `==`; use a tolerance check instead.
