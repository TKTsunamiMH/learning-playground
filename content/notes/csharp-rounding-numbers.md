---
title: Rounding Numbers in C#
topic: C#
tags: [csharp, rounding, floor, ceiling, truncate, banker's rounding, decimal places, formatting]
date: 2026-11-13
---

# Rounding Numbers in C#

C# provides several methods to round, floor, and ceiling numbers. Understanding the differences and when to use each is important for financial, scientific, and display calculations.

## The four main methods

All four methods work with `double` and `decimal`. They differ in how they treat fractional values:

| Method | How it works | 2.4 | 2.5 | 2.6 | -2.4 | -2.5 | -2.6 |
|--------|--------------|-----|-----|-----|------|------|------|
| `Math.Round()` | Round to nearest (banker's rounding by default) | 2 | 2 | 3 | -2 | -2 | -3 |
| `Math.Floor()` | Round down (toward -∞) | 2 | 2 | 2 | -3 | -3 | -3 |
| `Math.Ceiling()` | Round up (toward +∞) | 3 | 3 | 3 | -2 | -2 | -2 |
| `Math.Truncate()` | Remove fractional part (toward zero) | 2 | 2 | 2 | -2 | -2 | -2 |

```csharp
double x = 2.5;
double y = -2.5;

Console.WriteLine(Math.Round(x));        // 2 (banker's rounding: to nearest even)
Console.WriteLine(Math.Round(y));        // -2
Console.WriteLine(Math.Floor(x));        // 2
Console.WriteLine(Math.Floor(y));        // -3
Console.WriteLine(Math.Ceiling(x));      // 3
Console.WriteLine(Math.Ceiling(y));      // -2
Console.WriteLine(Math.Truncate(x));     // 2
Console.WriteLine(Math.Truncate(y));     // -2
```

## Math.Round: banker's rounding vs AwayFromZero

`Math.Round()` uses **banker's rounding** (round-to-even) by default: when the value is exactly halfway between two integers, it rounds to the **nearest even number**. This can surprise you:

```csharp
Console.WriteLine(Math.Round(2.5));      // 2 (rounds to even)
Console.WriteLine(Math.Round(3.5));      // 4 (rounds to even)
Console.WriteLine(Math.Round(4.5));      // 4 (rounds to even)
Console.WriteLine(Math.Round(5.5));      // 6 (rounds to even)
```

**Why banker's rounding?** It reduces bias in repeated rounding operations (used in accounting and statistics).

### MidpointRounding.AwayFromZero (school rounding)

To get traditional "school" rounding (0.5 always rounds away from zero), use the `MidpointRounding` parameter:

```csharp
Console.WriteLine(Math.Round(2.5, MidpointRounding.AwayFromZero));      // 3
Console.WriteLine(Math.Round(3.5, MidpointRounding.AwayFromZero));      // 4
Console.WriteLine(Math.Round(-2.5, MidpointRounding.AwayFromZero));     // -3
Console.WriteLine(Math.Round(-3.5, MidpointRounding.AwayFromZero));     // -4
```

## Rounding to decimal places

Use `Math.Round(value, digits)` to specify how many decimal places to keep:

```csharp
double price = 19.995;
double rounded = Math.Round(price, 2);          // 20.00 (banker's rounding)
Console.WriteLine(rounded);                     // 20

double percentage = 33.3333;
double rounded2 = Math.Round(percentage, 2);    // 33.33
Console.WriteLine(rounded2);                    // 33.33

// With AwayFromZero for traditional rounding
decimal money = 10.555m;
decimal rounded3 = Math.Round(money, 2, MidpointRounding.AwayFromZero);  // 10.56
Console.WriteLine(rounded3);                    // 10.56
```

## Working with decimal for money

Always use `decimal` for financial calculations. Round to 2 decimal places before storing or displaying:

```csharp
decimal itemPrice = 29.99m;
decimal taxRate = 0.08m;
decimal subtotal = itemPrice * 3;                    // 89.97m
decimal tax = Math.Round(subtotal * taxRate, 2);    // 7.20m
decimal total = subtotal + tax;                      // 97.17m

Console.WriteLine($"Subtotal: ${subtotal}");         // Subtotal: $89.97
Console.WriteLine($"Tax: ${tax}");                   // Tax: $7.20
Console.WriteLine($"Total: ${total}");               // Total: $97.17
```

## Floor vs Truncate with negative numbers

While `Floor` and `Truncate` behave the same for positive numbers, they differ for negative numbers:

- **`Math.Floor()`** rounds down toward negative infinity
- **`Math.Truncate()`** removes the fractional part (toward zero)

```csharp
double x = -2.5;

Console.WriteLine(Math.Floor(x));       // -3 (toward -∞)
Console.WriteLine(Math.Truncate(x));    // -2 (toward zero)

// Practical: how many complete items can you buy?
double budget = 100;
double itemPrice = 29.99;
int itemsCanBuy = (int)Math.Floor(budget / itemPrice);  // 3
Console.WriteLine($"Can buy: {itemsCanBuy} items");      // Can buy: 3 items
```

## Casting a double to int truncates

When you cast a `double` to `int`, it **truncates** (toward zero), similar to `Math.Truncate()`:

```csharp
double value = 2.9;
int truncated = (int)value;  // 2 (NOT rounded to 3)
Console.WriteLine(truncated);  // 2

// NOT the same as rounding
int rounded = (int)Math.Round(value);  // 3
Console.WriteLine(rounded);  // 3
```

## Formatting vs rounding

**Important:** Formatting (display) is different from rounding (data modification).

- **Formatting** changes only how the number is displayed; the underlying value is unchanged.
- **Rounding** modifies the actual value.

```csharp
double value = 3.14159;

// Formatting only affects display
Console.WriteLine(value.ToString("F2"));   // "3.14" (display only)
Console.WriteLine($"{value:F2}");          // "3.14" (display only)
Console.WriteLine(value);                  // 3.14159 (still has all digits)

// To actually round the value, use Math.Round
double actuallyRounded = Math.Round(value, 2);  // 3.14 (data changed)
Console.WriteLine(actuallyRounded);             // 3.14

// Formatting a currency value (for display)
decimal price = 19.9999m;
Console.WriteLine(price.ToString("C"));    // "$19.9999" (not rounded for display)
Console.WriteLine(price.ToString("C2"));   // "$20.00" (formatted, but value unchanged)
```

## Practical example: financial report

```csharp
decimal revenue = 1_234_567.891m;
decimal expenses = 987_654.321m;
decimal profit = revenue - expenses;

// Round to cents
decimal roundedProfit = Math.Round(profit, 2);

// Display with formatting
Console.WriteLine($"Revenue:  {revenue:C}");
Console.WriteLine($"Expenses: {expenses:C}");
Console.WriteLine($"Profit:   {roundedProfit:C}");

// Output:
// Revenue:  $1,234,567.89
// Expenses: $987,654.32
// Profit:   $246,913.57
```

## Common mistakes

- **Assuming `Math.Round(2.5)` returns 3** – It returns 2 (banker's rounding). Use `MidpointRounding.AwayFromZero` for traditional rounding.
- **Confusing casting with rounding** – `(int)2.9` is 2, not 3. Use `Math.Round()` to round; casting truncates.
- **Using `ToString("F2")` to change a value** – Formatting only affects display. Use `Math.Round()` to change the actual value.

## Quick recap

- `Math.Round()` uses banker's rounding by default (rounds to even on 0.5).
- `Math.Round(value, digits)` rounds to N decimal places; use `MidpointRounding.AwayFromZero` for traditional rounding.
- `Math.Floor()` rounds toward -∞; `Math.Ceiling()` rounds toward +∞; `Math.Truncate()` removes the fractional part.
- Casting a `double` to `int` truncates toward zero.
- Use `decimal` for financial calculations; round to 2 places before storage or display.
- Formatting with `ToString("F2")` or `{value:F2}` affects display only, not the actual value.
