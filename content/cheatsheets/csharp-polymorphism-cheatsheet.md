---
title: C# Polymorphism Cheatsheet
topic: C#
tags: [csharp, cheatsheet, polymorphism, reference]
date: 2026-11-19
---

# C# Polymorphism Cheatsheet

Quick reference for polymorphism types, syntax, and common errors.

## Kinds of polymorphism at a glance

| Kind | Type | How | Decided | Example |
|------|------|-----|---------|---------|
| **Subtype (Runtime)** | Inheritance | `virtual`/`override` | Runtime | `Shape s = new Circle(); s.Area();` → Circle's implementation |
| **Interface** | Implementation | `class : IInterface` | Runtime | `ILogger log = new ConsoleLogger(); log.Log("msg");` |
| **Overloading** | Same name, different params | Multiple methods, same name | Compile time | `Add(int, int)` and `Add(double, double)` |
| **Operator Overloading** | Redefine operators | `operator +`, `operator ==` | Compile time | `Vector a + Vector b` |
| **Generics** | Type variable | `<T>`, `List<T>`, `Max<T>()` | Compile time | `List<int>`, `Max<T>(T a, T b)` |

## Inheritance with virtual/override

```csharp
// Base class
public class Animal
{
    public virtual void Speak() => Console.WriteLine("Sound");
}

// Derived class
public class Dog : Animal
{
    public override void Speak() => Console.WriteLine("Woof");
}

// Polymorphism
Animal a = new Dog();
a.Speak();  // Calls Dog.Speak() → "Woof" (runtime dispatch)
```

## Interfaces

```csharp
public interface ILogger
{
    void Log(string message);
}

public class ConsoleLogger : ILogger
{
    public void Log(string message) => Console.WriteLine(message);
}

// Polymorphism
ILogger logger = new ConsoleLogger();
logger.Log("Error");  // Runtime dispatch to ConsoleLogger
```

## Overloading vs overriding

| Feature | Overloading | Overriding |
|---------|-------------|-----------|
| **In same class or inheritance?** | Same class | Inheritance |
| **Method name** | Same | Same |
| **Parameters** | Different | Same |
| **Keyword** | None | `virtual`/`override` |
| **Resolved** | Compile time | Runtime |
| **Example** | `Print(int)` and `Print(string)` | `override void Speak()` |

## Keywords quick ref

| Keyword | Use | Example |
|---------|-----|---------|
| `virtual` | Mark method in base class as overridable | `public virtual void Method() { }` |
| `override` | Override a virtual method in derived class | `public override void Method() { }` |
| `abstract` | Force derived classes to override | `public abstract void Method();` |
| `sealed` | Prevent overriding of a method | `public sealed override void Method() { }` |
| `new` | Hide base method (not recommended) | `public new void Method() { }` |
| `base` | Call base class implementation | `base.Method();` |

## When to use polymorphism: quick checklist

✓ **Use if:**
- You have multiple types sharing similar behavior
- Behavior differs by type (each type does it its own way)
- You'll store these types in a collection
- You'll add new types in the future
- You're doing a lot of `if (type is X) { ... }` else if...`

✗ **Don't use if:**
- Only 1–2 simple cases (keep it simple)
- No shared behavior between types
- Building a deep inheritance tree just to avoid an if/else
- The types don't have a natural "is-a" or "can-do" relationship

## Common compiler errors and fixes

### CS0111: Member with the same name and parameters already defined

**Problem:** Trying to overload based only on return type.

```csharp
// ❌ CS0111: Return type alone is not enough
public int Calculate(int x) { return x; }
public double Calculate(int x) { return x * 1.5; }

// ✓ Fix: Different parameters
public int Calculate(int x) { return x; }
public double Calculate(double x) { return x * 1.5; }
```

### CS0121: The call is ambiguous

**Problem:** Compiler can't decide which overload to use.

```csharp
public void Method(int x) { }
public void Method(double x) { }

// ❌ CS0121: Ambiguous between Method(int) and Method(double)
Method(1.5);  // Could convert 1.5 to int or use it as double?

// ✓ Fix: Be explicit
Method((double)1.5);
```

### CS0506: Cannot override non-virtual method

**Problem:** Base method is not marked `virtual`.

```csharp
public class Base
{
    public void Method() { }  // ❌ Not virtual
}

public class Derived : Base
{
    public override void Method() { }  // ❌ CS0506: Nothing to override
}

// ✓ Fix: Mark base method virtual
public class Base
{
    public virtual void Method() { }  // ✓ Now overridable
}

public class Derived : Base
{
    public override void Method() { }  // ✓ OK
}
```

### CS0239: Member already implements interface member

**Problem:** Explicit and implicit implementation conflict.

```csharp
public interface IFoo { void Bar(); }

// ❌ CS0239: Can't have both
public class MyClass : IFoo
{
    public void Bar() { }           // Implicit
    void IFoo.Bar() { }             // Explicit (conflict)
}

// ✓ Use one or the other
public class MyClass : IFoo
{
    public void Bar() { }           // ✓ Implicit implementation
}
```

## Calling non-virtual method through base type

**Problem:** Method is not virtual; base implementation runs even if object is derived.

```csharp
public class Base
{
    public void Method() => Console.WriteLine("Base");  // Not virtual
}

public class Derived : Base
{
    public new void Method() => Console.WriteLine("Derived");  // Hides base (not override)
}

Base obj = new Derived();
obj.Method();  // Prints "Base" ❌ (no polymorphism without virtual)

// ✓ Fix: Make base method virtual and use override
public class Base
{
    public virtual void Method() => Console.WriteLine("Base");  // virtual
}

public class Derived : Base
{
    public override void Method() => Console.WriteLine("Derived");  // override
}

Base obj = new Derived();
obj.Method();  // Prints "Derived" ✓
```

## Static type vs dynamic type

```csharp
Animal a = new Dog();  // static type = Animal, dynamic type = Dog
a.MakeSound();         // Runtime uses dynamic type (Dog) to pick method
```

**Rule:** With `virtual` methods, the **dynamic type** (actual object) wins. The runtime looks up which override to call based on what the object really is, not what variable type holds it.

## Method overloading resolution

The compiler picks the best-matching overload:

```csharp
public int Add(int a, int b) { }
public double Add(double a, double b) { }
public int Add(int a, int b, int c) { }

Add(2, 3);        // Add(int, int) ✓ exact match
Add(2.5, 3.1);    // Add(double, double) ✓ exact match
Add(1, 2, 3);     // Add(int, int, int) ✓ exact match
Add(2, 3, 4.0);   // Add(double, double) ✓ best implicit conversion
```

If multiple implicit conversions are equally close, the compiler gives CS0121 (ambiguous).

## Generics for type-safe polymorphism

```csharp
// Generic method
public static T Max<T>(T a, T b) where T : IComparable<T>
{
    return a.CompareTo(b) > 0 ? a : b;
}

Max(5, 10);            // Max<int>(5, 10) → 10
Max("a", "b");         // Max<string>("a", "b") → "b"

// Generic class
public class Stack<T>
{
    private T[] _items;
    public void Push(T item) { }  // Type-safe, no casting
}

new Stack<int>();      // Type-safe int stack
new Stack<string>();   // Type-safe string stack
```

## Common polymorphism patterns

**Strategy** – Swappable behavior:
```csharp
public interface IStrategy { void Execute(); }
public class MyClass { public MyClass(IStrategy s) => _strategy = s; }
```

**Factory** – Create the right type:
```csharp
public static ILogger CreateLogger(LogType type) => type switch
{
    LogType.Console => new ConsoleLogger(),
    LogType.File => new FileLogger(),
    _ => throw new NotSupportedException()
};
```

**Decorator** – Add behavior to an object:
```csharp
public class LoggerDecorator : ILogger
{
    private ILogger _inner;
    public void Log(string msg) => _inner.Log($"[{DateTime.Now}] {msg}");
}
```

## Links to detailed notes

- [Polymorphism Explained](/content/notes/csharp-polymorphism-explained.md)
- [Runtime Polymorphism: How It Works](/content/notes/csharp-runtime-polymorphism-how-it-works.md)
- [Compile-Time Polymorphism](/content/notes/csharp-compile-time-polymorphism.md)
- [Polymorphism in Practice](/content/notes/csharp-polymorphism-in-practice.md)
- [Interfaces Basics](/content/notes/csharp-interfaces-basics.md)
- [Programming to an Interface](/content/notes/csharp-programming-to-an-interface.md)
