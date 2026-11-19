---
title: Runtime Polymorphism: How It Works in C#
topic: C#
tags: [csharp, polymorphism, virtual, runtime, dispatch]
date: 2026-11-19
---

# Runtime Polymorphism: How It Works in C#

Runtime polymorphism is the most common kind in C#. It happens when you call a method on a base type (or interface) and the actual object's override runs instead. The runtime (not the compiler) decides which method to run. Understanding the difference between static type (variable type) and dynamic type (actual object) is key.

## Static type vs dynamic type

Every reference has two types:

- **Static type (compile time)** – The type the variable is declared as. Known when you write the code.
- **Dynamic type (runtime)** – The actual type of the object it points to. Known when the program runs.

```csharp
public class Animal
{
    public virtual void MakeSound()
    {
        Console.WriteLine("Generic animal sound");
    }
}

public class Dog : Animal
{
    public override void MakeSound()
    {
        Console.WriteLine("Woof!");
    }
}

public class Cat : Animal
{
    public override void MakeSound()
    {
        Console.WriteLine("Meow!");
    }
}

// Declare a variable with static type Animal
Animal myPet = new Dog();  // Dynamic type is Dog
myPet.MakeSound();         // Calls Dog.MakeSound() (dynamic type wins)
// Output: "Woof!"

// Same variable, different object
myPet = new Cat();         // Dynamic type is now Cat
myPet.MakeSound();         // Calls Cat.MakeSound()
// Output: "Meow!"

// The rule: The actual object decides which method runs
```

**Key rule:** When you call a `virtual` method, the actual object (dynamic type) decides which override runs, not the variable type (static type).

## Early binding vs late binding

**Compile-time (Early) Binding:**  
The compiler knows exactly which method to call. Happens with non-virtual methods, static methods, and constructors.

```csharp
public class Animal
{
    public void Sleep()  // Not virtual
    {
        Console.WriteLine("Animal sleeping");
    }
}

public class Dog : Animal
{
    public void Sleep()  // Hides base method (not an override)
    {
        Console.WriteLine("Dog sleeping");
    }
}

Animal dog = new Dog();
dog.Sleep();  // Compile time says "Animal.Sleep()" → Output: "Animal sleeping"
              // ✓ Even though object is Dog, base method runs (no virtual)
```

**Runtime (Late) Binding:**  
The runtime looks up which method to call based on the actual object type. Happens with `virtual` methods and interface methods.

```csharp
public class Animal
{
    public virtual void MakeSound()
    {
        Console.WriteLine("Generic sound");
    }
}

public class Dog : Animal
{
    public override void MakeSound()
    {
        Console.WriteLine("Woof!");
    }
}

Animal dog = new Dog();
dog.MakeSound();  // Runtime says "Dog.MakeSound()" → Output: "Woof!"
                  // ✓ Virtual method: actual type wins
```

**Summary:**

| | Compile Time (Early Binding) | Runtime (Late Binding) |
|---|---|---|
| **Decided** | Compiler, before program runs | Runtime, as program executes |
| **Used for** | Non-virtual methods, static methods | Virtual methods, interface methods |
| **Looks at** | Variable type (static type) | Actual object type (dynamic type) |
| **Example** | `Animal.Sleep()` when field is `Animal` | `Dog.MakeSound()` when object is `Dog` |

## The virtual method table (vtable)

When a class has `virtual` methods, the runtime maintains a hidden lookup table (vtable). Each instance holds a reference to its type's vtable. When you call a virtual method, the runtime:

1. Looks at the actual object type.
2. Finds that type's vtable.
3. Looks up the method name in the vtable.
4. Calls the right implementation.

**You don't write this code**, but it's what enables polymorphism under the hood:

```csharp
// Behind the scenes, C# maintains something like:
// Dog's vtable:
//   MakeSound -> Dog.MakeSound()
// Cat's vtable:
//   MakeSound -> Cat.MakeSound()

Animal dog = new Dog();
dog.MakeSound();  // Runtime: "What type are you?" → "Dog" → Lookup vtable → Dog.MakeSound()
```

For details on the `virtual` keyword, see [Virtual/Override/New Syntax](/content/notes/csharp-virtual-override-new.md).

## Step-by-step example with output

```csharp
public class Base
{
    public virtual void Method()
    {
        Console.WriteLine("1. Base.Method() called");
    }
}

public class Derived : Base
{
    public override void Method()
    {
        Console.WriteLine("2. Derived.Method() called");
        base.Method();  // Call base implementation
    }
}

Base obj = new Derived();
obj.Method();

// Output:
// 2. Derived.Method() called
// 1. Base.Method() called
```

**What happens:**
1. `obj` is static type `Base`, but actual object is `Derived`.
2. `obj.Method()` triggers runtime lookup.
3. Runtime finds `Derived.Method()` (actual type wins).
4. `Derived.Method()` runs first (output: "2. Derived.Method() called").
5. Inside, `base.Method()` explicitly calls `Base.Method()`.
6. `Base.Method()` runs (output: "1. Base.Method() called").

## Another example: list of different types

```csharp
public class Shape
{
    public virtual void Describe()
    {
        Console.WriteLine("I am a shape");
    }
}

public class Circle : Shape
{
    public override void Describe()
    {
        Console.WriteLine("I am a circle");
    }
}

public class Rectangle : Shape
{
    public override void Describe()
    {
        Console.WriteLine("I am a rectangle");
    }
}

List<Shape> shapes = new()
{
    new Circle(),
    new Rectangle(),
    new Circle()
};

foreach (var shape in shapes)
{
    shape.Describe();  // Runtime polymorphism: right method for each type
}

// Output:
// I am a circle
// I am a rectangle
// I am a circle
```

Each `shape` is static type `Shape`, but the actual object type determines which `Describe()` runs.

## Common mistakes

- **Forgetting `virtual` in the base class** – Without `virtual`, the base method runs even if the object is a derived type. See [Virtual/Override/New Syntax](/content/notes/csharp-virtual-override-new.md).
  ```csharp
  public class Base
  {
      public void Method() { Console.WriteLine("Base"); }  // ❌ Not virtual
  }
  
  public class Derived : Base
  {
      public override void Method() { Console.WriteLine("Derived"); }  // ❌ Error: no virtual to override
  }
  ```

- **Confusing the variable type and object type** – The variable type is static (known at compile time); the object type is dynamic (known at runtime). Polymorphism uses the object type.
  ```csharp
  Animal a = new Dog();
  // a's static type is Animal (compile time)
  // a's dynamic type is Dog (runtime, actual object)
  // a.MakeSound() calls Dog.MakeSound() (dynamic type wins)
  ```

## Quick recap

- **Static type** – The declared type of the variable (compile time).
- **Dynamic type** – The actual type of the object (runtime).
- **Virtual method** – Declared with `virtual` in base; `override` in derived.
- **Late binding** – Runtime uses dynamic type to pick the right override.
- **vtable** – Hidden lookup table the runtime uses; you don't write it, but it enables polymorphism.
- One method call, different behaviors depending on the actual object type.
- For override syntax and rules, see [Virtual/Override/New Syntax](/content/notes/csharp-virtual-override-new.md).
