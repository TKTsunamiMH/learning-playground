---
title: Parsing and Formatting Numbers in C#
topic: C#
tags: [csharp, parse, tryparse, format, tostring, culture, bases, binary, hex, decimal]
date: 2026-11-13
---

# Parsing and Formatting Numbers in C#

Converting between text and numbers is a common task. C# provides safe and flexible methods for both directions, with support for different formats, bases, and cultures.

## Turning text into numbers: Parse and TryParse

### Parse: throws an exception if invalid

`Type.Parse(string)` converts a string to a number. If the string is not a valid number, it throws `FormatException`:

```csharp
int num = int.Parse("42");
Console.WriteLine(num);  // 42

double d = double.Parse("3.14");
Console.WriteLine(d);    // 3.14

// ❌ Throws FormatException
try
{
    int invalid = int.Parse("hello");  // Not a valid number
}
catch (FormatException)
{
    Console.WriteLine("Invalid number format");
}

// ❌ Also throws if out of range
try
{
    byte b = byte.Parse("999");  // 999 > 255 (byte max)
}
catch (OverflowException)
{
    Console.WriteLine("Number out of range");
}
```

### TryParse: returns true/false, safer

`Type.TryParse(string, out T result)` returns `true` if successful, `false` if invalid. No exception is thrown:

```csharp
// ✓ Safe way to read user input
Console.Write("Enter a number: ");
string input = Console.ReadLine();

if (int.TryParse(input, out int num))
{
    Console.WriteLine($"You entered: {num}");
}
else
{
    Console.WriteLine("That's not a valid number");
}
```

### The culture issue: "3.14" vs "3,14"

Different cultures use different decimal separators. In the US, it's `.` (3.14). In Europe, it's `,` (3,14). Parsing is culture-aware by default, which can cause issues:

```csharp
// Culture-aware parsing (may differ by system locale)
double d = double.Parse("3,14");   // In US locale: throws FormatException
                                   // In European locale: 3.14

// ❌ Unreliable across cultures
if (double.TryParse(userInput, out double value)) { }

// ✓ Reliable: use InvariantCulture for consistent parsing
using System.Globalization;

if (double.TryParse(userInput, NumberStyles.Any, CultureInfo.InvariantCulture, out double value))
{
    Console.WriteLine(value);
}

// Also works with Parse
double reliable = double.Parse("3.14", CultureInfo.InvariantCulture);
```

**Best practice:** Use `CultureInfo.InvariantCulture` when parsing user input or data from files/APIs to ensure consistent behavior regardless of the system locale.

## Turning numbers into text: ToString and formatting

### ToString: basic conversion

```csharp
int num = 42;
string text = num.ToString();
Console.WriteLine(text);  // "42"

double d = 3.14159;
string text2 = d.ToString();
Console.WriteLine(text2);  // "3.14159"
```

### Format specifiers

Pass a format string to `ToString(format)` to control the output:

| Specifier | Name | Example | Result |
|-----------|------|---------|--------|
| `F` | Fixed-point (decimal places) | `value.ToString("F2")` | "3.14" |
| `N` | Number with thousands separator | `value.ToString("N0")` | "1,000" |
| `D` | Decimal with leading zeros | `value.ToString("D3")` | "042" |
| `P` | Percent (multiply by 100, add %) | `value.ToString("P")` | "50.00%" |
| `C` | Currency | `value.ToString("C")` | "$3.14" |
| `X` | Hexadecimal uppercase | `value.ToString("X")` | "FF" |
| `x` | Hexadecimal lowercase | `value.ToString("x")` | "ff" |

```csharp
double value = 3.14159;

// Fixed-point: 2 decimal places
Console.WriteLine(value.ToString("F2"));       // "3.14"
Console.WriteLine(value.ToString("F0"));       // "3"

int number = 1000;

// Number with thousands separator
Console.WriteLine(number.ToString("N0"));      // "1,000"
Console.WriteLine(number.ToString("N2"));      // "1,000.00"

int id = 42;

// Leading zeros
Console.WriteLine(id.ToString("D3"));          // "042"
Console.WriteLine(id.ToString("D5"));          // "00042"

decimal percentage = 0.5m;

// Percent
Console.WriteLine(percentage.ToString("P"));   // "50.00%"
Console.WriteLine((0.333).ToString("P2"));     // "33.30%"

decimal price = 19.99m;

// Currency (uses current culture)
Console.WriteLine(price.ToString("C"));        // "$19.99" (US) or "€19,99" (EU)

int hex = 255;

// Hexadecimal
Console.WriteLine(hex.ToString("X"));          // "FF"
Console.WriteLine(hex.ToString("x"));          // "ff"
```

### String interpolation with format specifiers

Use the same format specifiers inside `{value:format}`:

```csharp
double price = 19.99;
int discount = 15;

Console.WriteLine($"Price: ${price:F2}");           // Price: $19.99
Console.WriteLine($"Discount: {discount:P}");      // Discount: 1500.00%
                                                    // (0.15 as decimal would be 15%)
Console.WriteLine($"ID: {42:D4}");                  // ID: 0042
```

### Format with culture

For currency or locale-specific output, pass `CultureInfo`:

```csharp
using System.Globalization;

decimal price = 19.99m;

// US culture
Console.WriteLine(price.ToString("C", CultureInfo.GetCultureInfo("en-US")));
// $19.99

// European culture (euros)
Console.WriteLine(price.ToString("C", CultureInfo.GetCultureInfo("de-DE")));
// 19,99 €

// Japanese yen (no decimal places)
Console.WriteLine(price.ToString("C", CultureInfo.GetCultureInfo("ja-JP")));
// ￥20
```

## Number bases in brief

C# supports binary (base 2), decimal (base 10), octal (base 8), and hexadecimal (base 16) literals:

```csharp
int binary = 0b1010;         // Binary: 10 in decimal
int hex = 0x0A;              // Hexadecimal: 10 in decimal
int decimal_val = 10;        // Decimal: 10

Console.WriteLine(binary);   // 10
Console.WriteLine(hex);      // 10
Console.WriteLine(decimal_val);  // 10

// Convert to other bases using ToString
int num = 255;
Console.WriteLine(num.ToString("B"));      // ❌ 'B' doesn't exist (no binary formatter)
Console.WriteLine(Convert.ToString(num, 2));  // "11111111" (binary)
Console.WriteLine(Convert.ToString(num, 16)); // "ff" (hex)
Console.WriteLine(num.ToString("X"));      // "FF" (hex uppercase)
```

**Use `Convert.ToString(value, base)` to convert to different bases:**

```csharp
int num = 42;

Console.WriteLine(Convert.ToString(num, 2));   // "101010" (binary)
Console.WriteLine(Convert.ToString(num, 8));   // "52" (octal)
Console.WriteLine(Convert.ToString(num, 16));  // "2a" (hex lowercase)
```

## Digit separators and literal suffixes

Digit separators make large numbers readable. Suffixes specify the type (see [Integer Types in C#](csharp-integer-types.md) and [Floating-Point and Decimal Types in C#](csharp-floating-point-and-decimal.md)):

```csharp
long population = 1_000_000_000;  // 1 billion (underscores for readability)
decimal money = 19_999.99m;       // 19,999.99 (works with decimals too)

// Suffixes
long big = 1_000_000L;   // long
uint count = 1_000U;     // uint
ulong huge = 1_000UL;    // ulong
float f = 3.14f;         // float
decimal d = 3.14m;       // decimal

Console.WriteLine(population);  // 1000000000
Console.WriteLine(money);       // 19999.99
```

## Parsing from different bases

Convert hex or binary strings back to decimal:

```csharp
// Parse hex string
int hex = int.Parse("FF", System.Globalization.NumberStyles.HexNumber);
Console.WriteLine(hex);  // 255

// Parse binary string (requires custom logic in older .NET)
int binary = Convert.ToInt32("1010", 2);
Console.WriteLine(binary);  // 10

// Or use int.Parse with NumberStyles
int hex2 = int.Parse("1A", NumberStyles.HexNumber);
Console.WriteLine(hex2);  // 26
```

## Common mistakes

- **Parse throws FormatException on bad input** – Use `TryParse` for user input.
- **Formatting with `ToString("F2")` only affects display** – The actual value is unchanged. Use `Math.Round()` if you need to change the value.
- **Culture-dependent parsing** – Use `CultureInfo.InvariantCulture` for reliable parsing across locales.

Example of culture issue:

```csharp
// ❌ May fail depending on system locale
double value = double.Parse(userInput);  // Works in US, fails in Europe if input is "3,14"

// ✓ Use InvariantCulture
double value = double.Parse(userInput, CultureInfo.InvariantCulture);
```

## Quick recap

- Use `int.Parse()` for guaranteed-valid input; use `int.TryParse()` for user input.
- Always use `CultureInfo.InvariantCulture` when parsing or formatting for consistency.
- Format specifiers: `F2` (2 decimals), `N0` (no decimals, thousands sep), `D3` (3 digits, leading zeros), `P` (percent), `C` (currency), `X` (hex).
- Use `Convert.ToString(num, base)` to convert to binary, octal, or hex.
- Digit separators (`1_000_000`) improve readability; suffixes (`1000L`, `3.14m`) specify type.
- Formatting doesn't change the actual value; only `Math.Round()` or reassignment does.
