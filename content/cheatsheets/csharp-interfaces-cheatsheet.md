---
title: C# Interfaces Cheatsheet
topic: C#
tags: [csharp, cheatsheet, interface, reference]
date: 2026-11-17
---

# C# Interfaces Cheatsheet

Quick reference for declaring, implementing, and using interfaces in C#.

## Declaring and implementing

| Task | Syntax | Example |
|------|--------|---------|
| **Declare interface** | `public interface IName { }` | `public interface IFlyable { void Fly(); }` |
| **Implement one interface** | `public class Name : IInterface { }` | `public class Bird : IFlyable { public void Fly() { } }` |
| **Implement multiple interfaces** | `public class Name : I1, I2, I3 { }` | `public class Duck : IFlyable, ISwimmable { }` |
| **Inherit from base + interfaces** | `public class Name : BaseClass, I1, I2 { }` | `public class Duck : Animal, IFlyable, ISwimmable { }` |
| **Interface inherits interface** | `public interface I2 : I1 { }` | `public interface IFlyable : IMovable { }` |
| **Explicit implementation** | `returnType InterfaceName.Member()` | `void IFlyable.Fly() { }` (only callable via interface) |

## Interface members

| Member | Can have | Example |
|--------|----------|---------|
| **Method** | ✓ | `void Fly();` |
| **Property** | ✓ | `string Name { get; set; }` |
| **Indexer** | ✓ | `int this[int index] { get; set; }` |
| **Event** | ✓ | `event EventHandler? Changed;` |
| **Field** | ✗ | (not allowed) |
| **Constructor** | ✗ | (not allowed) |
| **Static members** | ✓ | `static int Count { get; }` (C# 11+) |
| **Default method (C# 8+)** | ✓ | `public void Log() => Console.WriteLine("default");` |

## Accessing interface members

```csharp
IFlyable flyer = new Bird();
flyer.Fly();  // ✓ Call via interface type

Bird bird = new Bird();
bird.Fly();   // ✓ Call via concrete type

// Explicit implementation: only via interface
ISerializable obj = new MyClass();
obj.Serialize();  // ✓

// MyClass objConcrete = new MyClass();
// objConcrete.Serialize();  // ❌ Error: not visible
```

## Interface vs abstract class

| Feature | Interface | Abstract class |
|---------|-----------|-----------------|
| **Can instantiate** | No | No |
| **Can have fields** | No | Yes |
| **Can have constructors** | No | Yes |
| **Can have implemented methods** | Yes (C# 8+) | Yes |
| **Multiple inheritance** | Yes | No |
| **Access modifiers on members** | Public by default | Full range (public, private, protected, internal) |
| **When to add members later** | Breaking change (or use default method) | Can add with implementation |
| **Typical use** | "What can it do?" (behavior/capability) | "What is it?" (type/category) |

**Decision:**
- Use **interface** for capabilities and contracts; multiple inheritance of behavior.
- Use **abstract class** for type hierarchies and shared implementation.
- Use **both** together: abstract base class + interfaces for capabilities.

## Common built-in interfaces

| Interface | Purpose | Example |
|-----------|---------|---------|
| `IComparable<T>` | Sortable | `CompareTo(T other)` returns -1, 0, or 1 |
| `IEquatable<T>` | Equality comparison | `Equals(T other)` for efficient comparison |
| `IEnumerable<T>` | Foreach-able | `GetEnumerator()` for `foreach` loops |
| `IEnumerator<T>` | Iteration state | `MoveNext()` and `Current` property |
| `IDisposable` | Resource cleanup | `Dispose()` for files, connections, etc. |
| `ICollection<T>` | Modifiable collection | `Add()`, `Remove()`, `Count` |
| `IList<T>` | Indexable list | `[index]`, `IndexOf()`, `Insert()` |
| `IReadOnlyList<T>` | Read-only list | `[index]`, `Count` (no modification) |

## Dependency injection registration

```csharp
// In Program.cs
var builder = WebApplicationBuilder.CreateBuilder(args);

// Scoped: one instance per HTTP request
builder.Services.AddScoped<IProductRepository, ProductRepository>();

// Singleton: one instance for entire app
builder.Services.AddSingleton<ILoggerService, ConsoleLoggerService>();

// Transient: new instance every time
builder.Services.AddTransient<IEmailService, EmailService>();

// Factory: custom creation
builder.Services.AddScoped<IPaymentProcessor>(provider =>
    new StripeProcessor(provider.GetRequiredService<IConfiguration>()["ApiKey"]));

var app = builder.Build();
```

**Usage in controller:**
```csharp
[ApiController]
public class UsersController : ControllerBase
{
    private IUserRepository _repo;

    // Container injects the registered implementation
    public UsersController(IUserRepository repo)
    {
        _repo = repo;
    }
}
```

## Implicit vs explicit implementation

```csharp
public interface ISerializable { void Serialize(); }

// Implicit: visible on the class
public class Document : ISerializable
{
    public void Serialize() { }  // Can call: doc.Serialize()
}

// Explicit: only visible via interface
public class Document : ISerializable
{
    void ISerializable.Serialize() { }  // Can only call: ((ISerializable)doc).Serialize()
}
```

## Common compiler errors

### CS0535: Does not implement interface member

**Problem:** Missing implementation or not all members implemented.

```csharp
public interface IVehicle
{
    void Start();
    void Stop();
}

// ❌ Error CS0535: 'Car' does not implement 'IVehicle.Stop'
public class Car : IVehicle
{
    public void Start() { }
    // Missing Stop()
}

// ✓ Fix: Implement all members
public class Car : IVehicle
{
    public void Start() { }
    public void Stop() { }
}
```

### CS0737: Implementation member must be public

**Problem:** Interface member implemented as non-public.

```csharp
public interface IWalkable { void Walk(); }

// ❌ Error CS0737: 'Dog.Walk' cannot implement 'Walk' as private
public class Dog : IWalkable
{
    private void Walk() { }  // ❌ Not public
}

// ✓ Fix: Make it public
public class Dog : IWalkable
{
    public void Walk() { }
}
```

### CS0144: Cannot create instance of abstract type

**Problem:** Trying to instantiate an interface.

```csharp
// ❌ Error CS0144: Cannot create an instance of the abstract type 'IFlyable'
var flyer = new IFlyable();

// ✓ Fix: Use as a type, instantiate concrete class
IFlyable flyer = new Bird();
```

### CS0539: Explicit interface member in non-interface declaration

**Problem:** Using explicit implementation syntax outside an interface context.

```csharp
// ❌ Not implementing an interface, can't use explicit syntax
public class MyClass
{
    void SomeInterface.Method() { }  // ❌ Error CS0539
}

// ✓ Explicit syntax only when implementing an interface
public class MyClass : IInterface
{
    void IInterface.Method() { }  // ✓ Correct
}
```

## Pattern matching with interfaces

```csharp
public void CheckType(object obj)
{
    // Pattern match: check if obj implements an interface
    if (obj is ISerializable serializable)
    {
        serializable.Serialize();
    }

    // Try-cast
    IComparable comparable = obj as IComparable;
    if (comparable != null)
    {
        // obj implements IComparable
    }
}
```

## Quick reference

```csharp
// Declare and implement
public interface ILogger { void Log(string msg); }
public class ConsoleLogger : ILogger
{
    public void Log(string msg) => Console.WriteLine(msg);
}

// Use as type
ILogger logger = new ConsoleLogger();
logger.Log("Hello");

// Multiple interfaces
public class MyService : ILogger, IDisposable
{
    public void Log(string msg) { }
    public void Dispose() { }
}

// Default method (C# 8+)
public interface IAdvancedLogger
{
    void Log(string msg);
    public void LogWarning(string msg) => Console.WriteLine($"WARNING: {msg}");
}

// Explicit implementation
public class MyClass : IInterface
{
    void IInterface.SecretMethod() { }  // Not visible on MyClass
}
```

## Links to detailed notes

- [Interfaces Basics](/content/notes/csharp-interfaces-basics.md)
- [Implementing Multiple Interfaces](/content/notes/csharp-implementing-multiple-interfaces.md)
- [Programming to an Interface](/content/notes/csharp-programming-to-an-interface.md)
- [Common Built-in Interfaces](/content/notes/csharp-common-built-in-interfaces.md)
- [Interfaces vs Abstract Classes](/content/notes/csharp-interface-vs-abstract-class.md)
- [Interfaces in .NET Projects](/content/notes/csharp-interfaces-in-dotnet-projects.md)
