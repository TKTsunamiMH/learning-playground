---
title: Compile-Time Polymorphism in C#
topic: C#
tags: [csharp, overloading, generics, compile-time, polymorphism]
date: 2026-11-19
---

# Compile-Time Polymorphism in C#

Compile-time (static) polymorphism is when the compiler decides which method or operator to use at compile time, before the program runs. No runtime lookup is needed. The main forms are method overloading, operator overloading, and generics.

## Method overloading

**Overloading** means multiple methods with the same name but different parameter lists. The compiler picks the best match based on the arguments you pass.

```csharp
public class Calculator
{
    // Overload 1: two ints
    public int Add(int a, int b)
    {
        return a + b;
    }

    // Overload 2: two doubles
    public double Add(double a, double b)
    {
        return a + b;
    }

    // Overload 3: three ints
    public int Add(int a, int b, int c)
    {
        return a + b + c;
    }

    // Overload 4: variadic
    public int Add(params int[] numbers)
    {
        int sum = 0;
        foreach (var n in numbers)
            sum += n;
        return sum;
    }
}

// Compiler picks the right overload
Calculator calc = new();
Console.WriteLine(calc.Add(2, 3));            // Calls Add(int, int) → 5
Console.WriteLine(calc.Add(2.5, 3.7));       // Calls Add(double, double) → 6.2
Console.WriteLine(calc.Add(1, 2, 3));        // Calls Add(int, int, int) → 6
Console.WriteLine(calc.Add(1, 2, 3, 4, 5));  // Calls Add(params int[]) → 15
```

**Rules for overloading:**
- **Same method name, different parameter list** – Differ by number, order, or type of parameters.
- **Return type alone is not enough** – You cannot overload based only on return type. Error **CS0111**.
  ```csharp
  // ❌ Error CS0111: A member with the same name and parameter types already defined
  public int Calculate(int x) { return x; }
  public double Calculate(int x) { return x * 1.5; }  // ❌ Same params, different return type
  ```
- **Compiler picks the best match** – Exact matches first; then implicit conversions (e.g., `int` → `double`).

## Optional parameters and named arguments

An alternative to overloading for similar method signatures:

```csharp
public class Logger
{
    // Single method with optional parameters
    public void Log(string message, LogLevel level = LogLevel.Info, bool timestamp = true)
    {
        string logEntry = timestamp ? $"[{DateTime.Now}] " : "";
        logEntry += $"[{level}] {message}";
        Console.WriteLine(logEntry);
    }
}

// Different calls, same method
Logger logger = new();
logger.Log("App started");                                      // Uses defaults
logger.Log("Error!", LogLevel.Error);                          // Override level
logger.Log("Debug info", LogLevel.Debug, false);               // All custom
logger.Log("test", timestamp: false, level: LogLevel.Warning); // Named args
```

This avoids creating multiple overloads for small variations.

## Operator overloading

Redefine how operators work for custom types:

```csharp
public class Vector2
{
    public double X { get; set; }
    public double Y { get; set; }

    public Vector2(double x, double y)
    {
        X = x;
        Y = y;
    }

    // Overload + operator
    public static Vector2 operator +(Vector2 a, Vector2 b)
    {
        return new Vector2(a.X + b.X, a.Y + b.Y);
    }

    // Overload == operator
    public static bool operator ==(Vector2 a, Vector2 b)
    {
        return a.X == b.X && a.Y == b.Y;
    }

    public override string ToString() => $"({X}, {Y})";
}

Vector2 v1 = new(1, 2);
Vector2 v2 = new(3, 4);
Vector2 v3 = v1 + v2;  // Calls operator+(v1, v2)
Console.WriteLine(v3); // (4, 6)

if (v1 == v2) { }      // Uses operator==
```

Operator overloading keeps code readable for mathematical or domain-specific types.

## Parametric polymorphism: generics

Generics let you write type-agnostic code that works with any type:

```csharp
// Generic method
public static T Max<T>(T a, T b) where T : IComparable<T>
{
    return a.CompareTo(b) > 0 ? a : b;
}

// Use it
Console.WriteLine(Max(5, 10));        // Max<int>(5, 10) → 10
Console.WriteLine(Max(3.5, 2.1));    // Max<double>(3.5, 2.1) → 3.5
Console.WriteLine(Max("apple", "banana"));  // Max<string>("apple", "banana") → "banana"

// Generic class
public class Stack<T>
{
    private T[] _items = new T[10];
    private int _count = 0;

    public void Push(T item)
    {
        _items[_count++] = item;
    }

    public T Pop()
    {
        return _items[--_count];
    }
}

var intStack = new Stack<int>();
intStack.Push(42);
intStack.Push(100);
Console.WriteLine(intStack.Pop());  // 100

var stringStack = new Stack<string>();
stringStack.Push("hello");
Console.WriteLine(stringStack.Pop());  // "hello"
```

Generics provide type safety and avoid boxing/unboxing or casting.

## Overloading vs overriding

These are often confused but are different:

| Feature | Overloading | Overriding |
|---------|------------|-----------|
| **Same class or inheritance?** | Same class | Inheritance (base + derived) |
| **Method name** | Same | Same |
| **Parameters** | Different | Same |
| **Return type** | Varies; must differ in params | Same as base method |
| **Resolved** | Compile time (static) | Runtime (dynamic) |
| **Keyword** | None; just multiple methods | `virtual` (base), `override` (derived) |
| **Purpose** | Multiple behaviors with one name | Replace base behavior in derived class |
| **Example** | `Add(int, int)` and `Add(double, double)` | `virtual void Speak()` → `override void Speak()` |

```csharp
// Overloading: same class
public class Math
{
    public int Add(int a, int b) { return a + b; }
    public double Add(double a, double b) { return a + b; }  // ✓ Overload: same class, different params
}

// Overriding: inheritance
public class Animal
{
    public virtual void Speak() { Console.WriteLine("Sound"); }
}

public class Dog : Animal
{
    public override void Speak() { Console.WriteLine("Woof"); }  // ✓ Override: base + derived, virtual/override
}

// Can combine: overload in a derived class
public class Dog : Animal
{
    public override void Speak() { Console.WriteLine("Woof"); }  // Override
    public void Speak(int times) { for (int i = 0; i < times; i++) Speak(); }  // Overload
}

Dog dog = new();
dog.Speak();     // Calls override: "Woof"
dog.Speak(3);    // Calls overload: "Woof" × 3
```

## Common mistakes

- **Confusing overloading with overriding** – Overloading is same class, different parameters, compile time. Overriding is inheritance, same method, runtime. See [Virtual/Override/New Syntax](/content/notes/csharp-virtual-override-new.md).

- **Ambiguous overload resolution (CS0121)** – The compiler can't decide which overload to use.
  ```csharp
  public void Method(int x) { }
  public void Method(double x) { }

  // ❌ Error CS0121: The call is ambiguous between the following methods
  Method(1.5);  // Could be Method(int) with implicit conversion, or Method(double)?
  
  // ✓ Fix: Be explicit
  Method((double)1.5);
  ```

- **Overloading based only on return type** – Doesn't work. Error CS0111.
  ```csharp
  // ❌ CS0111: Cannot overload solely on return type
  public int Calculate(int x) { return x; }
  public double Calculate(int x) { return x * 1.5; }

  // ✓ Add parameter difference
  public int Calculate(int x) { return x; }
  public double Calculate(double x) { return x * 1.5; }
  ```

## Quick recap

- **Overloading** – Same name, different parameters, compile time.
- **Operator overloading** – Redefine operators like `+`, `==` for custom types.
- **Generics** – Type variable (e.g., `<T>`) works with any type, type-safe, no casting.
- **Compiler picks the best match** – At compile time, before the program runs.
- **Differs from overriding** – Overriding uses `virtual`/`override` and runtime dispatch.
- For runtime polymorphism, see [Runtime Polymorphism: How It Works](/content/notes/csharp-runtime-polymorphism-how-it-works.md).
