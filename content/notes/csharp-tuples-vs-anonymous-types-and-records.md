---
title: C# Tuples vs Anonymous Types and Records
topic: C#
tags: [csharp, tuples, anonymous types, records, comparison]
date: 2026-11-16
---

# C# Tuples vs Anonymous Types and Records

Tuples, anonymous types, and records all allow you to group data without defining a class. This note clarifies the differences, when to use each, and how they relate to the broader ecosystem of C# types.

## Tuples vs anonymous types

### Anonymous types (keyword: `new`)

```csharp
// Anonymous type: reference type, no name, read-only
var person = new { Name = "Alice", Age = 30 };

Console.WriteLine(person.Name);   // Alice
Console.WriteLine(person.Age);    // 30

// Cannot return from methods (type is internal to the method)
public void ShowPerson()
{
    var p = new { Name = "Bob", Age = 28 };
    Console.WriteLine(p.Name);  // ✓ Works here only
}

// public var GetPerson() { return new { ... }; }  // ❌ Compiler error: var not allowed as return type
```

### Tuples (syntax: `(type, type)`)

```csharp
// Tuple: value type, lightweight, can be returned
(string Name, int Age) person = ("Alice", 30);

Console.WriteLine(person.Name);   // Alice
Console.WriteLine(person.Age);    // 30

// Can return from methods
public (string Name, int Age) GetPerson()
{
    return ("Bob", 28);  // ✓
}
```

### Key differences

| Feature | Anonymous Type | Tuple |
|---------|---|---|
| **Type** | Reference type (class) | Value type (struct) |
| **Memory** | Heap | Stack |
| **Mutable** | Read-only (compile-time) | Mutable |
| **Return from method** | ❌ No (type unknown) | ✓ Yes |
| **Heap allocation** | Yes | No |
| **Speed** | Slower | Faster |
| **Comparable** | ✓ Equality works | ✓ Equality works |
| **Use case** | LINQ within a single method | Return values, swaps, temporary groups |

### Example comparison

```csharp
var employees = new List<Employee>
{
    new Employee { Id = 1, Name = "Alice", Salary = 50000 },
    new Employee { Id = 2, Name = "Bob", Salary = 60000 }
};

// Anonymous type: great for LINQ projections inside one method
var anonResult = employees
    .Select(e => new { e.Name, e.Salary })  // Anonymous type
    .Where(x => x.Salary > 55000)
    .ToList();

foreach (var item in anonResult)
{
    Console.WriteLine($"{item.Name}: ${item.Salary}");
}

// Tuple: also works; can return the collection
public List<(string Name, decimal Salary)> GetHighEarners(List<Employee> employees)
{
    return employees
        .Select(e => (e.Name, e.Salary))  // Tuple
        .Where(x => x.Salary > 55000)
        .ToList();
}
```

## Tuples vs records

### Records (keyword: `record`)

```csharp
// Record: named type, immutable by default, reference type
public record Person(string Name, int Age);

var person = new Person("Alice", 30);
Console.WriteLine(person.Name);   // Alice

// Can return from methods (named type)
public Person GetPerson()
{
    return new Person("Bob", 28);  // ✓
}

// Records can have methods and validation
public record Product(string Name, decimal Price)
{
    public decimal TaxedPrice => Price * 1.1m;

    // Validation in constructor
    public Product(string name, decimal price) : this(name, price >= 0 ? price : throw new ArgumentException("Price must be non-negative"))
    {
    }
}
```

### Key differences

| Feature | Tuple | Record |
|---------|-------|--------|
| **Type** | Value type (struct) | Reference type (class) |
| **Memory** | Stack | Heap |
| **Named** | Named elements (compile-time) | Named type |
| **Mutable** | ✓ Yes (by default) | ✗ No (immutable by default) |
| **Methods** | ✗ No | ✓ Yes |
| **Inheritance** | ✗ No | ✓ Yes (limited) |
| **ToString** | Generic | ✓ Auto-generated |
| **Equality** | By value | By value |
| **Use case** | Temporary groupings, return values | Domain data, immutable values |

### Example: when to use each

```csharp
// Tuple: simple, temporary, return multiple values
public (int Min, int Max) GetRange(int[] numbers)
{
    // ...
    return (min, max);
}

// Record: domain data with meaning and immutability
public record Customer(int Id, string Name, string Email)
{
    public string DisplayName => $"{Name} ({Email})";
}

// Anonymous type: LINQ projection, confined to one method
var result = customers
    .Select(c => new { c.Name, c.Email })
    .ToList();
```

## Summary table: tuple vs anonymous type vs record

| | Tuple | Anonymous Type | Record |
|---|-------|---|--------|
| **Syntax** | `(type1, type2)` | `new { prop1, prop2 }` | `record Type(prop1, prop2)` |
| **Type system** | Value type | Reference type | Reference type |
| **Named** | Elements named (compile-time) | Properties named | Type name + properties |
| **Mutable** | Yes | No (read-only) | No (immutable by default) |
| **Can return** | ✓ Yes | ❌ No (type is anon) | ✓ Yes |
| **Methods** | ✗ | ✗ | ✓ |
| **Heap cost** | None | Yes | Yes |
| **Best for** | Quick returns (2–3 values), swaps, dict keys | LINQ projections (local scope) | Domain data, API contracts |
| **Example** | `(string Name, int Age)` | `new { Name = "Alice", Age = 30 }` | `record Person(string Name, int Age)` |

## How these relate to other C# notes

- [C# Tuples Basics](/content/notes/csharp-tuples-basics.md) – Detailed syntax and mechanics.
- [C# Tuple Deconstruction and Discards](/content/notes/csharp-tuple-deconstruction-and-discards.md) – Unpacking tuples.
- [C# Tuples as Return Values](/content/notes/csharp-tuples-as-return-values.md) – Real-world uses.
- [C# Where to Use Tuples](/content/notes/csharp-where-to-use-tuples.md) – Design guidance.
- [Classes and Members Overview](/content/notes/csharp-classes-and-members-overview.md) – Class fundamentals.

## Common mistakes

- **Confusing anonymous types and tuples** – Anonymous types are reference types; tuples are value types. Use tuples for returns, anonymous types for LINQ in one method.

```csharp
// ❌ Can't return anonymous type directly
// public var GetData() { return new { A = 1, B = 2 }; }

// ✓ Use tuple instead
public (int A, int B) GetData()
{
    return (1, 2);
}

// ✓ Anonymous type: confined to LINQ
var result = data.Select(x => new { x.Id, x.Name }).ToList();
```

- **Using records when tuples suffice** – Records are heavier (reference types) and best for domain data. For simple temporary groupings, use tuples.

```csharp
// ✓ Tuple: lightweight, perfect for this
public (int Min, int Max) GetRange(int[] arr) { ... }

// ✗ Overkill: record for simple data
public record Range(int Min, int Max);
public Range GetRange(int[] arr) { ... }
```

- **Forgetting that anonymous types are read-only** – You cannot modify properties after creation.

```csharp
var person = new { Name = "Alice", Age = 30 };
// person.Age = 31;  // ❌ Compiler error: read-only

// ✓ Use tuple if you need mutability
var p = (Name: "Alice", Age: 30);
p.Age = 31;  // ✓ Works
```

## Quick recap

- **Tuples** are value types ideal for returning 2–3 values; lightweight and fast.
- **Anonymous types** are reference types for LINQ projections confined to one method; read-only.
- **Records** are reference types for immutable domain data with a type name; best for public APIs and long-lived data.
- Tuples can be returned from methods; anonymous types cannot (the type is internal).
- Anonymous types are read-only; tuples are mutable.
- Records have methods and behavior; tuples and anonymous types do not.
- For temporary data: tuple or anonymous type. For domain data: record or class.
