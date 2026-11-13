---
title: Advanced Math and Random Numbers in C#
topic: C#
tags: [csharp, trigonometry, logarithm, random, sqrt, sin, cos, tan, distance, percentage]
date: 2026-11-13
---

# Advanced Math and Random Numbers in C#

Beyond basic arithmetic, C# offers trigonometric functions, logarithms, and utilities for generating random numbers. These are useful for simulations, games, graphics, and scientific calculations.

## Trigonometry in brief

Trigonometric functions (`Sin`, `Cos`, `Tan`) work with **angles in radians, not degrees**. Remember to convert if needed.

```csharp
// Convert degrees to radians: degrees * PI / 180
double degrees = 45;
double radians = degrees * Math.PI / 180;

Console.WriteLine(Math.Sin(radians));     // ~0.707
Console.WriteLine(Math.Cos(radians));     // ~0.707
Console.WriteLine(Math.Tan(radians));     // ~1.0
```

**Convert radians back to degrees: radians * 180 / PI**

```csharp
double radians = Math.PI / 4;            // 45 degrees in radians
double degrees = radians * 180 / Math.PI;
Console.WriteLine(degrees);              // 45
```

### Math.Atan2: find the angle between two points

`Math.Atan2(y, x)` returns the angle (in radians) between a point and the positive x-axis:

```csharp
// Angle from (0, 0) to (1, 1)
double angle = Math.Atan2(1, 1);
Console.WriteLine(angle);                        // ~0.785 radians (45 degrees)
Console.WriteLine(angle * 180 / Math.PI);       // 45 degrees
```

## Logarithms and exponentials

| Method | Purpose | Example |
|--------|---------|---------|
| `Math.Log(x)` | Natural logarithm (base e) | `Math.Log(Math.E)` → 1.0 |
| `Math.Log10(x)` | Logarithm base 10 | `Math.Log10(100)` → 2.0 |
| `Math.Exp(x)` | e to the power of x | `Math.Exp(1)` → ~2.718 |
| `Math.Cbrt(x)` | Cube root | `Math.Cbrt(8)` → 2.0 |

```csharp
Console.WriteLine(Math.Log(Math.E));              // 1.0 (log_e(e) = 1)
Console.WriteLine(Math.Log10(1000));              // 3.0 (log_10(1000) = 3)
Console.WriteLine(Math.Exp(0));                   // 1.0 (e^0 = 1)
Console.WriteLine(Math.Cbrt(27));                 // 3.0 (3-root of 27)
```

## Practical examples

### Distance between two points (Euclidean distance)

The distance from point (x1, y1) to (x2, y2) is √((x2−x1)² + (y2−y1)²):

```csharp
double x1 = 0, y1 = 0;
double x2 = 3, y2 = 4;

double dx = x2 - x1;
double dy = y2 - y1;
double distance = Math.Sqrt(dx * dx + dy * dy);

Console.WriteLine($"Distance: {distance}");       // Distance: 5
```

### Percentage calculation

```csharp
double part = 25;
double whole = 100;
double percentage = (part / whole) * 100;

Console.WriteLine($"Percentage: {percentage:F1}%");  // Percentage: 25.0%

// Or using Math.Round for 2 decimal places
double rounded = Math.Round(percentage, 2);
Console.WriteLine($"Rounded: {rounded}%");           // Rounded: 25.0%
```

### Average and sum

```csharp
double[] values = { 10, 20, 30, 40 };
double sum = 0;
foreach (double val in values) sum += val;
double average = sum / values.Length;

Console.WriteLine($"Sum: {sum}");                  // Sum: 100
Console.WriteLine($"Average: {average}");          // Average: 25
```

### Move a value toward a target

```csharp
public static double MoveToward(double current, double target, double step)
{
    if (Math.Abs(current - target) <= step)
    {
        return target;  // Reached the target
    }
    if (current < target)
    {
        return current + step;  // Move up
    }
    else
    {
        return current - step;  // Move down
    }
}

double health = 50;
double targetHealth = 100;
double regeneration = 10;

health = MoveToward(health, targetHealth, regeneration);
Console.WriteLine(health);  // 60 (moved 10 units closer)
```

## Random numbers

Use `Random.Shared` to generate pseudo-random numbers. `Random` is not cryptographically secure; for security-sensitive use, use `System.Security.Cryptography.RandomNumberGenerator`.

### Generating random integers

`Next(maxExclusive)` returns a random integer from 0 to maxExclusive-1 (max is **exclusive**):

```csharp
// Random integer from 0 to 99
int num = Random.Shared.Next(100);
Console.WriteLine(num);  // 0 to 99

// Random integer from 1 to 6 (dice roll)
int die = Random.Shared.Next(1, 7);
Console.WriteLine(die);  // 1 to 6 (7 is exclusive)

// Random negative value
int negative = Random.Shared.Next(-100, 0);
Console.WriteLine(negative);  // -100 to -1
```

### Generating random doubles

`NextDouble()` returns a random `double` from 0.0 to 1.0 (exclusive):

```csharp
double random = Random.Shared.NextDouble();
Console.WriteLine(random);  // 0.0 ≤ x < 1.0

// Scale to a range (e.g., 0 to 100)
double scaled = Random.Shared.NextDouble() * 100;
Console.WriteLine(scaled);  // 0.0 ≤ x < 100.0
```

### Pick a random item from a list or array

```csharp
string[] colors = { "red", "green", "blue", "yellow" };
string randomColor = colors[Random.Shared.Next(colors.Length)];
Console.WriteLine(randomColor);  // One of the four colors

// Also works with List<T>
List<int> numbers = new List<int> { 10, 20, 30, 40, 50 };
int randomNum = numbers[Random.Shared.Next(numbers.Count)];
Console.WriteLine(randomNum);  // One of the five numbers
```

### Dice roll example

```csharp
public static int RollDice()
{
    // Roll a 6-sided die (1 to 6)
    return Random.Shared.Next(1, 7);
}

int roll1 = RollDice();
int roll2 = RollDice();
Console.WriteLine($"Rolled: {roll1} and {roll2}");  // e.g., "Rolled: 3 and 5"
```

### Shuffle an array (Fisher-Yates shuffle)

```csharp
public static void Shuffle<T>(T[] array)
{
    for (int i = array.Length - 1; i > 0; i--)
    {
        int randomIndex = Random.Shared.Next(0, i + 1);
        // Swap
        (array[i], array[randomIndex]) = (array[randomIndex], array[i]);
    }
}

int[] numbers = { 1, 2, 3, 4, 5 };
Shuffle(numbers);
Console.WriteLine(string.Join(", ", numbers));  // e.g., "3, 1, 5, 2, 4"
```

## About random number generation

- `Random` is **not cryptographically secure**. For sensitive operations (tokens, keys), use `System.Security.Cryptography.RandomNumberGenerator` or `System.Random.Secure` (in newer .NET versions).
- Creating `new Random()` in a tight loop can produce duplicate values on older .NET versions (the constructor is seeded based on system time, which may not change fast enough). Use `Random.Shared` (modern .NET) or create one `Random` instance and reuse it.

## Common mistakes

- **Forgetting that the max is exclusive in `Next(min, max)`** – `Next(1, 7)` gives 1–6, not 1–7.
- **Using degrees instead of radians for trig functions** – Convert first: `degrees * Math.PI / 180`.
- **Creating a new `Random()` each time** – Use `Random.Shared` or reuse a single instance to avoid duplicate values.

## Quick recap

- **Trig functions** use radians; convert with `degrees * PI / 180`.
- **Logarithms**: `Log()` (base e), `Log10()` (base 10), `Exp()`, `Cbrt()`.
- **Distance formula**: √((x2−x1)² + (y2−y1)²).
- **Random integers**: `Random.Shared.Next(max)` (0 to max-1), `Next(min, max)` (min to max-1, exclusive).
- **Random doubles**: `NextDouble()` (0.0 to 1.0, exclusive).
- **Pick a random item**: `collection[Random.Shared.Next(collection.Length)]`.
- `Random` is not cryptographically secure; use it for games and simulations, not security.
