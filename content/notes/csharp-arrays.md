---
title: C# Arrays
topic: C#
tags: [csharp, arrays, collections, fixed-size, indexing, multidimensional]
date: 2026-11-09
---

# C# Arrays

An array is a collection of elements of the **same type**, stored **contiguously in memory**. Arrays have a **fixed size** determined at creation and use **zero-based indexing**. Arrays are a **reference type**—the array object is stored on the heap, but the variable holds a reference to it.

## What makes an array

- **Fixed size**: Once created, the number of elements cannot change.
- **Same type**: All elements must be of the same data type.
- **Zero-based indexing**: First element is at index 0.
- **Reference type**: The array reference lives on the heap.
- **Contiguous memory**: Elements are stored one after another, enabling fast access by index.

## Declaring and initializing arrays

### Traditional syntax with `new`

```csharp
// Declare and initialize with size
int[] numbers = new int[5];     // [0, 0, 0, 0, 0] (default int value is 0)
string[] names = new string[3]; // [null, null, null]
bool[] flags = new bool[2];     // [false, false]

Console.WriteLine(numbers.Length);  // 5
Console.WriteLine(names[0]);        // null
```

### Initialize with values using array initializer

```csharp
int[] scores = new int[] { 85, 90, 78, 92 };
Console.WriteLine(scores.Length);   // 4
Console.WriteLine(scores[0]);       // 85
Console.WriteLine(scores[3]);       // 92
```

### Modern syntax: collection expression (C# 12+)

```csharp
int[] numbers = [1, 2, 3, 4, 5];
string[] colors = ["red", "green", "blue"];
double[] temps = [98.6, 100.1, 99.5];

Console.WriteLine(numbers[2]);      // 3
```

### Default values by type

When an array is created without explicit initialization, elements take default values:

```csharp
int[] ints = new int[3];           // [0, 0, 0]
double[] doubles = new double[2];  // [0.0, 0.0]
bool[] bools = new bool[2];        // [false, false]
string[] strings = new string[2];  // [null, null]
char[] chars = new char[1];        // ['\0'] (null character)
```

## Accessing elements

Use zero-based indexing with square brackets:

```csharp
int[] arr = [10, 20, 30, 40, 50];

Console.WriteLine(arr[0]);      // 10 (first element)
Console.WriteLine(arr[4]);      // 50 (last element)

// Modify an element
arr[2] = 99;
Console.WriteLine(arr[2]);      // 99
```

## Looping through arrays

### for loop

```csharp
int[] numbers = [10, 20, 30, 40];

for (int i = 0; i < numbers.Length; i++)
{
    Console.WriteLine($"Index {i}: {numbers[i]}");
}
// Index 0: 10
// Index 1: 20
// Index 2: 30
// Index 3: 40
```

### foreach loop

```csharp
string[] fruits = ["apple", "banana", "cherry"];

foreach (string fruit in fruits)
{
    Console.WriteLine(fruit);
}
// apple
// banana
// cherry
```

## Multidimensional arrays

A **rectangular array** (jagged in structure, but rectangular data) uses multiple indexes:

```csharp
// 2D array: 3 rows × 2 columns
int[,] matrix = new int[3, 2]
{
    { 1, 2 },
    { 3, 4 },
    { 5, 6 }
};

Console.WriteLine(matrix[0, 0]);  // 1
Console.WriteLine(matrix[2, 1]);  // 6
Console.WriteLine(matrix.Length);  // 6 (total elements)

// Looping 2D arrays
for (int row = 0; row < matrix.GetLength(0); row++)
{
    for (int col = 0; col < matrix.GetLength(1); col++)
    {
        Console.WriteLine(matrix[row, col]);
    }
}
```

## Jagged arrays

A **jagged array** is an array of arrays; each row can have a different length:

```csharp
// Array of arrays
int[][] jagged = new int[3][];
jagged[0] = [1, 2, 3];
jagged[1] = [4, 5];
jagged[2] = [6, 7, 8, 9];

Console.WriteLine(jagged[0][0]);  // 1
Console.WriteLine(jagged[1].Length);  // 2 (second row has 2 elements)
Console.WriteLine(jagged[2][3]);  // 9

// Looping jagged arrays
foreach (int[] row in jagged)
{
    foreach (int num in row)
    {
        Console.WriteLine(num);
    }
}
```

## Why array size cannot change

Arrays have a **fixed size set at creation time**. To change the number of elements, you must create a new array:

```csharp
int[] original = [1, 2, 3];
Console.WriteLine(original.Length);  // 3

// ❌ This is NOT how to add elements
// original.Length = 5;  // Error: Length is read-only

// ✓ Create a new array and copy values
int[] expanded = new int[5];
Array.Copy(original, expanded, original.Length);
expanded[3] = 4;
expanded[4] = 5;

Console.WriteLine(expanded.Length);  // 5
Console.WriteLine(expanded[0]);      // 1 (copied from original)
```

### Array.Resize helper

`Array.Resize` creates a new array, copies elements, and updates the reference:

```csharp
int[] numbers = [1, 2, 3];
Array.Resize(ref numbers, 5);

Console.WriteLine(numbers.Length);  // 5
Console.WriteLine(numbers[3]);      // 0 (default int value)
```

## Common mistakes

- **IndexOutOfRangeException**: Accessing an index outside the valid range.

```csharp
int[] arr = [1, 2, 3];
Console.WriteLine(arr[5]);  // ❌ IndexOutOfRangeException: index 5 is out of range
Console.WriteLine(arr[2]);  // ✓ index 2 is valid (0, 1, 2)
```

**Fix:** Always check that the index is >= 0 and < Length.

```csharp
if (index >= 0 && index < arr.Length)
{
    Console.WriteLine(arr[index]);  // ✓
}
```

- **Forgetting that arrays are fixed-size** – Creating an array doesn't automatically make it grow. Use `Array.Resize()` or migrate to `List<T>`.

- **Assuming default values are sensible** – Uninitialized elements are 0, false, null, etc. Initialize explicitly if you need specific values.

## Quick recap

- Arrays have a **fixed size** set at creation; elements must be the **same type**.
- Declare with `new int[5]`, initialize with `new int[] { 1, 2, 3 }`, or use collection expression `[1, 2, 3]`.
- Use `.Length` to get the number of elements; zero-based indexing starts at 0.
- Loop with `for` or `foreach`; use `GetLength(dimension)` for multidimensional arrays.
- Multidimensional arrays are rectangular `int[,]`; jagged arrays are ragged `int[][]`.
- Arrays cannot be resized; use `Array.Resize()` or switch to `List<T>` if you need to add/remove items.
- `IndexOutOfRangeException` occurs when accessing an invalid index; always validate.
