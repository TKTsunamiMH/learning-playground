---
title: Integer Types in C#
topic: C#
tags: [csharp, integers, int, long, signed, unsigned, overflow, casting]
date: 2026-11-06
---

# Integer Types in C#

Integer types store whole numbers without decimal places. C# offers several integer types, each with different sizes and ranges. The keyword `int` is an alias for `System.Int32`, `long` for `System.Int64`, `short` for `System.Int16`, and `byte` for `System.Byte`—they're the same types, just with shorter names.

## Size and range

| Type | Alias for | Bytes | Bits | Signed? | Min value | Max value | When to use |
|------|-----------|-------|------|---------|-----------|-----------|-------------|
| `byte` | Byte | 1 | 8 | No | 0 | 255 | Binary data, small counts, efficiency |
| `sbyte` | SByte | 1 | 8 | Yes | -128 | 127 | Rarely needed |
| `short` | Int16 | 2 | 16 | Yes | -32,768 | 32,767 | Memory-critical code, rarely needed |
| `ushort` | UInt16 | 2 | 16 | No | 0 | 65,535 | Rarely needed |
| `int` | Int32 | 4 | 32 | Yes | -2,147,483,648 | 2,147,483,647 | **Default choice** |
| `uint` | UInt32 | 4 | 32 | No | 0 | 4,294,967,295 | Large positive-only counts |
| `long` | Int64 | 8 | 64 | Yes | -9.2E18 | 9.2E18 | Large numbers, timestamps, file sizes |
| `ulong` | UInt64 | 8 | 64 | No | 0 | 1.8E19 | Very large positive-only numbers |

**Key insight:** `int` is the default; use it unless you have a specific reason to pick another type.

## Accessing min and max values

Use `Type.MinValue` and `Type.MaxValue` constants:

```csharp
Console.WriteLine(int.MinValue);      // -2147483648
Console.WriteLine(int.MaxValue);      // 2147483647
Console.WriteLine(long.MaxValue);     // 9223372036854775807
Console.WriteLine(byte.MaxValue);     // 255
```

## Signed vs unsigned

- **Signed types** (`int`, `short`, `long`, `sbyte`) hold negative and positive values.
- **Unsigned types** (`uint`, `ushort`, `ulong`, `byte`) hold only zero and positive values.

Signed types dedicate one bit to the sign, so they have a smaller positive range. **Use signed (`int`) by default** because:
- Most APIs expect signed integers
- Negative values are genuinely needed
- Unsigned arithmetic has subtle gotchas in C#

```csharp
int x = -100;      // ✓ Signed
uint y = 100;      // Works, but use int for consistency
uint z = -100;     // ❌ Compiler error: cannot implicitly convert int to uint
```

## When to use long

Use `long` (64-bit) when:
- **Large numbers beyond `int.MaxValue`** – e.g., 5 billion
- **Timestamps** – milliseconds since epoch are huge
- **File sizes** – files larger than 2 GB
- **IDs from external systems** – they often exceed 32-bit limits

```csharp
long fileSize = 3_000_000_000;    // 3 GB
long timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
long customerId = 999_999_999_999; // from a database
```

## When to use byte or short

These are rare in modern code but useful for:
- **Binary data:** audio samples, image pixels, protocol buffers
- **Memory-critical code:** arrays of millions of items where every byte counts

```csharp
// Storing raw bytes from a file
byte[] fileData = File.ReadAllBytes("image.png");

// Efficient large array
byte[] buffer = new byte[10_000_000];
```

## Integer division and modulo

Division and modulo with integers truncate toward zero (no rounding):

```csharp
int a = 7 / 2;      // 3 (not 3.5)
int b = 7 % 2;      // 1 (remainder)
int c = -7 / 2;     // -3
int d = -7 % 2;     // -1 (sign follows dividend)

Console.WriteLine($"7 / 2 = {a}, remainder {b}");  // 7 / 2 = 3, remainder 1
```

## Overflow: what happens and how to handle it

When an integer exceeds its range, it **overflows**. By default (unchecked), overflow wraps around silently:

```csharp
int max = int.MaxValue;      // 2147483647
int overflow = max + 1;      // Wraps to -2147483648 (silently!)
Console.WriteLine(overflow); // -2147483648

uint umax = uint.MaxValue;   // 4294967295
uint uoverflow = umax + 1;   // Wraps to 0
```

### The checked keyword

Use `checked` to throw an exception on overflow instead of wrapping silently:

```csharp
// ❌ Without checked: silent overflow
int x = int.MaxValue + 1;  // -2147483648 (wrong, no error!)

// ✓ With checked: throws OverflowException
try
{
    checked
    {
        int y = int.MaxValue + 1;  // Throws OverflowException
    }
}
catch (OverflowException)
{
    Console.WriteLine("Integer overflow detected!");
}
```

**Best practice:** Use `checked` in calculations where overflow is a real bug (financial, physics, validation). Most application code doesn't need it.

## Implicit vs explicit conversion

### Implicit conversion (safe, automatic)
Smaller types convert to larger types automatically—no data loss:

```csharp
int x = 100;
long y = x;              // ✓ Implicit: int → long
double z = 42;           // ✓ Implicit: int → double
```

### Explicit conversion (requires a cast)
Larger types require an explicit cast; data may be lost:

```csharp
long big = 1000;
int small = (int)big;         // ✓ Cast: long → int
int tooSmall = (int)big;      // ✓ Compiles, but overflows if big > int.MaxValue

byte b = 300;                 // ❌ CS0221: constant value out of range
byte b = (byte)300;           // ✓ Cast forces it, but becomes 44 (wraps)
```

### Common compiler errors and fixes

**CS0266: Cannot implicitly convert type 'X' to 'Y'**

```csharp
// ❌ Error: trying to assign long to int without cast
long value = 1000;
int x = value;  // CS0266

// ✓ Fix: add explicit cast
int x = (int)value;
```

**CS0221: Constant value out of range for 'Y'**

```csharp
// ❌ Error: literal 300 doesn't fit in byte (max 255)
byte b = 300;  // CS0221

// ✓ Fix 1: use a variable (runtime decision)
int temp = 300;
byte b = (byte)temp;

// ✓ Fix 2: use a value that fits
byte b = 255;
```

## Literal suffixes

Suffixes tell the compiler which type a numeric literal is:

| Suffix | Type | Example |
|--------|------|---------|
| `L` or `l` | long | `1000L` |
| `U` or `u` | uint | `1000U` |
| `UL` or `ul` | ulong | `1000UL` |
| None | int | `1000` |

```csharp
long x = 1000L;        // Suffix needed for clarity
uint y = 1000U;
ulong z = 1000UL;
int a = 1000;          // No suffix needed, inferred as int
```

**Note:** Without the suffix, a large literal might be inferred as `int` and cause CS0221 at compile time.

## Common mistakes

- **Assuming `int` handles arbitrarily large numbers** – Use `long` when needed; overflow is silently wrong by default.
- **Forgetting the cast operator when shrinking types** – `long → int` needs `(int)`.
- **Using unsigned types when signed is expected** – Most APIs expect `int` or `long`, not `uint`.

## Quick recap

- `int` is the default; use it for counts, IDs, and general integers.
- `long` for large numbers, timestamps, and file sizes.
- `byte` and `short` for binary data and memory-critical code.
- Integer division truncates: `7 / 2 = 3`.
- Overflow wraps silently by default; use `checked` to throw an exception.
- Smaller types convert to larger types implicitly; larger to smaller requires an explicit cast.
- Suffixes: `L` for long, `U` for uint, `UL` for ulong.
