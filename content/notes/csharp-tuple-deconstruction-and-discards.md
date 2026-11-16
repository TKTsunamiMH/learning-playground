---
title: C# Tuple Deconstruction and Discards
topic: C#
tags: [csharp, tuples, deconstruction, discards, unpacking]
date: 2026-11-16
---

# C# Tuple Deconstruction and Discards

**Deconstruction** is the inverse of creating a tuple: it unpacks a tuple into separate variables. Use the underscore `_` (discard) to ignore values you don't need. Deconstruction makes code cleaner when you're working with multiple values from a tuple.

## Deconstructing into variables

### Basic deconstruction

```csharp
var person = (Name: "Alice", Age: 30, Email: "alice@example.com");

// Deconstruct into separate variables
var (name, age, email) = person;
Console.WriteLine(name);   // Alice
Console.WriteLine(age);    // 30
Console.WriteLine(email);  // alice@example.com
```

### With type declarations

```csharp
var point = (10, 20);

// Specify types explicitly
(int x, int y) = point;
Console.WriteLine(x);  // 10
Console.WriteLine(y);  // 20

// Mix var and types (unusual)
(var a, int b) = point;  // a is int, b is int
```

### Inline deconstruction

```csharp
var (name, age) = GetPerson();

public static (string, int) GetPerson()
{
    return ("Bob", 28);
}
```

## Discards with `_` — ignoring values

Use `_` to skip values you don't need:

```csharp
var person = (Name: "Alice", Age: 30, Email: "alice@example.com");

// Only extract name and age, ignore email
var (name, age, _) = person;
Console.WriteLine(name);  // Alice
Console.WriteLine(age);   // 30

// Ignore multiple values
var (first, _, _) = person;
Console.WriteLine(first);  // Alice
```

### Why use discards?

- **Clarity:** Shows intent that you intentionally don't need a value.
- **No unused variable warnings:** Unlike assigning to a dummy variable, `_` doesn't trigger compiler warnings.

```csharp
// ❌ Bad: compiler may warn about unused variable
var (name, age, unused) = person;

// ✓ Good: clear intent to ignore
var (name, age, _) = person;
```

## Swapping two variables with a tuple

Tuples provide a clean way to swap values:

```csharp
int a = 10;
int b = 20;

// Swap using deconstruction
(a, b) = (b, a);

Console.WriteLine(a);  // 20
Console.WriteLine(b);  // 10
```

This is much cleaner than using a temporary variable:

```csharp
// Old way: requires a temp variable
int temp = a;
a = b;
b = temp;

// Tuple way: one line
(a, b) = (b, a);  // ✓
```

## Deconstructing in `foreach`

When iterating over a collection of tuples, deconstruct inline:

```csharp
var people = new List<(string Name, int Age)>
{
    ("Alice", 30),
    ("Bob", 25),
    ("Charlie", 35)
};

// Without deconstruction
foreach (var person in people)
{
    Console.WriteLine($"{person.Name} is {person.Age}");
}

// With deconstruction (cleaner)
foreach (var (name, age) in people)
{
    Console.WriteLine($"{name} is {age}");
}
// Alice is 30
// Bob is 25
// Charlie is 35

// Deconstruct with discards
foreach (var (name, _) in people)
{
    Console.WriteLine(name);  // Just names, ignore ages
}
```

## Deconstruct methods for your own classes

You can add a `Deconstruct` method to any class or struct to support deconstruction. The method must be `public void`, return nothing, and use `out` parameters:

```csharp
public class Rectangle
{
    public double Width { get; set; }
    public double Height { get; set; }

    public Rectangle(double width, double height)
    {
        Width = width;
        Height = height;
    }

    // Enable deconstruction
    public void Deconstruct(out double width, out double height)
    {
        width = Width;
        height = Height;
    }
}

// Usage
var rect = new Rectangle(5, 10);
var (w, h) = rect;
Console.WriteLine($"Width: {w}, Height: {h}");  // Width: 5, Height: 10
```

You can define multiple `Deconstruct` overloads:

```csharp
public class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
    public string Email { get; set; }

    // Deconstruct into name and age
    public void Deconstruct(out string name, out int age)
    {
        name = Name;
        age = Age;
    }

    // Deconstruct into all three
    public void Deconstruct(out string name, out int age, out string email)
    {
        name = Name;
        age = Age;
        email = Email;
    }
}

var person = new Person { Name = "Alice", Age = 30, Email = "alice@example.com" };

var (name, age) = person;  // Uses first overload
Console.WriteLine($"{name}, {age}");  // Alice, 30

var (n, a, e) = person;  // Uses second overload
Console.WriteLine($"{n}, {a}, {e}");  // Alice, 30, alice@example.com
```

## Common mistakes

- **Wrong number of elements** – The number of variables must match the tuple.

```csharp
var person = (Name: "Alice", Age: 30);

// ❌ Too few variables
var (name) = person;  // Compiler error: expected 2 elements

// ✓ Correct
var (name, age) = person;

// ✓ Also correct: ignore one
var (name, _) = person;
```

- **Using names instead of positions in deconstruction** – Element names don't matter during deconstruction; the tuple unpacks by position.

```csharp
var person = (Name: "Alice", Age: 30);

// ❌ Names are ignored; this gets the first and second values
var (firstName, firstName) = person;  // Compiler error: duplicate names

// ✓ Positional unpacking
var (name, age) = person;

// ✓ Names can be different from the tuple's names
var (personName, personAge) = person;
```

- **Forgetting that `_` is a discard** – Each `_` is a separate discard; you can use multiple.

```csharp
var data = (1, 2, 3, 4);

// ✓ Valid: multiple discards
var (a, _, _, d) = data;
Console.WriteLine(a);  // 1
Console.WriteLine(d);  // 4
```

## Quick recap

- Deconstruction unpacks a tuple into separate variables using `var (a, b, c) = tuple;`.
- Use `_` (discard) to ignore values: `var (name, _) = person;` ignores the second element.
- Swap variables cleanly: `(a, b) = (b, a);`.
- Deconstruct in `foreach` loops for cleaner iteration: `foreach (var (name, age) in list)`.
- Add a `Deconstruct` method to your classes/structs to enable deconstruction.
- Element names don't matter during deconstruction; unpacking is positional.
- Discard variable `_` can be used multiple times.
