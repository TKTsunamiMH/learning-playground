---
title: Common Built-in Interfaces in C#
topic: C#
tags: [csharp, interface, builtin, framework, icomparable, idisposable, ienum]
date: 2026-11-17
---

# Common Built-in Interfaces in C#

The .NET Framework provides many interfaces that your classes can implement to integrate with common operations like sorting, looping, resource cleanup, and comparisons. Here are the most important ones and how to use them.

## IComparable\<T\>

Allows instances of your class to be sorted. When you implement `IComparable<T>`, define the `CompareTo()` method to return:
- Negative number: this < other
- Zero: this == other
- Positive number: this > other

```csharp
public class Person : IComparable<Person>
{
    public string Name { get; set; }
    public int Age { get; set; }

    public Person(string name, int age)
    {
        Name = name;
        Age = age;
    }

    // Implement CompareTo to sort by age
    public int CompareTo(Person? other)
    {
        if (other == null) return 1;
        return this.Age.CompareTo(other.Age);
    }

    public override string ToString() => $"{Name} ({Age})";
}

// Usage: sorting works automatically
var people = new List<Person>
{
    new Person("Alice", 30),
    new Person("Bob", 25),
    new Person("Charlie", 35)
};

people.Sort();  // Uses CompareTo
foreach (var person in people)
    Console.WriteLine(person);
// Output:
// Bob (25)
// Alice (30)
// Charlie (35)
```

For more on sorting, see [Sorting in C#](/content/notes/csharp-sorting.md).

## IEquatable\<T\>

Defines a method for comparing instances for equality. Improves performance for collections and comparisons:

```csharp
public class Product : IEquatable<Product>
{
    public int Id { get; set; }
    public string Name { get; set; }

    public Product(int id, string name)
    {
        Id = id;
        Name = name;
    }

    public bool Equals(Product? other)
    {
        return other != null && this.Id == other.Id;
    }

    public override bool Equals(object? obj) => Equals(obj as Product);
    public override int GetHashCode() => Id.GetHashCode();
}

var p1 = new Product(1, "Laptop");
var p2 = new Product(1, "Laptop");
Console.WriteLine(p1.Equals(p2));  // true (same ID)
```

## IEnumerable\<T\> and IEnumerator\<T\>

Required for `foreach` loops. `IEnumerable<T>` provides a way to iterate over items:

```csharp
public class SimpleCollection : IEnumerable<int>
{
    private int[] _items = { 1, 2, 3, 4, 5 };

    public IEnumerator<int> GetEnumerator()
    {
        return new SimpleEnumerator(_items);
    }

    System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator()
    {
        return GetEnumerator();
    }

    private class SimpleEnumerator : IEnumerator<int>
    {
        private int[] _items;
        private int _index = -1;

        public SimpleEnumerator(int[] items)
        {
            _items = items;
        }

        public int Current => _items[_index];
        object? System.Collections.IEnumerator.Current => Current;

        public bool MoveNext()
        {
            _index++;
            return _index < _items.Length;
        }

        public void Reset() => _index = -1;
        public void Dispose() { }
    }
}

// Usage: works with foreach
var collection = new SimpleCollection();
foreach (int item in collection)
    Console.WriteLine(item);
// Output: 1, 2, 3, 4, 5
```

For details on loops and `foreach`, see [The foreach Loop in C#](/content/notes/csharp-foreach-loop.md).

## IDisposable

Marks a class that holds unmanaged resources (files, database connections, network sockets) that need explicit cleanup. Implement `Dispose()` to release them:

```csharp
public class FileWriter : IDisposable
{
    private StreamWriter? _writer;

    public FileWriter(string filePath)
    {
        _writer = new StreamWriter(filePath);
    }

    public void WriteLine(string line)
    {
        _writer?.WriteLine(line);
    }

    // Implement Dispose to clean up
    public void Dispose()
    {
        _writer?.Dispose();
        _writer = null;
    }
}

// Usage with 'using' statement
using (var writer = new FileWriter("output.txt"))
{
    writer.WriteLine("Hello");
    writer.WriteLine("World");
}  // Dispose() called automatically here

// Or C# 8+ using declaration
using var writer2 = new FileWriter("output2.txt");
writer2.WriteLine("Test");
// Dispose() called when writer2 goes out of scope
```

The `using` statement ensures `Dispose()` is called, even if an exception occurs.

## ICollection\<T\>, IList\<T\>, IReadOnlyList\<T\>

These interfaces represent collections:

- **`ICollection<T>`** – Can add, remove, and check count
- **`IList<T>`** – Can access by index, add, remove, and modify
- **`IReadOnlyList<T>`** – Can only read by index; no modifications

```csharp
public class example
{
    public List<int> numbers = new List<int> { 1, 2, 3 };

    // IList<T>: can read and write
    public void ProcessList(IList<int> list)
    {
        for (int i = 0; i < list.Count; i++)
        {
            list[i] = list[i] * 2;  // ✓ Can modify
        }
    }

    // IReadOnlyList<T>: read-only
    public void PrintList(IReadOnlyList<int> list)
    {
        for (int i = 0; i < list.Count; i++)
        {
            Console.WriteLine(list[i]);  // ✓ Can read
            // list[i] = 0;  // ❌ Cannot modify
        }
    }

    // IEnumerable<T>: iterating only
    public void SumItems(IEnumerable<int> items)
    {
        int sum = 0;
        foreach (int item in items)
            sum += item;
        Console.WriteLine($"Sum: {sum}");
    }
}
```

**Why use these interfaces?** Methods often accept `IEnumerable<T>` or `IReadOnlyList<T>` instead of `List<T>` to:
- Allow any collection type (arrays, linked lists, custom collections)
- Prevent accidental modification
- Make the method's intent clear

## Common built-in interfaces at a glance

| Interface | What it promises | Where you meet it |
|-----------|-----------------|-------------------|
| `IComparable<T>` | I can be sorted | Custom types that need sorting |
| `IEquatable<T>` | I can be compared for equality | Custom types used in dictionaries or sets |
| `IEnumerable<T>` | I can be looped with foreach | Collections, LINQ queries |
| `IEnumerator<T>` | I maintain iteration state | Implementing custom collections |
| `IDisposable` | I need cleanup (resources) | File streams, database connections |
| `ICollection<T>` | I can be iterated and modified | List<T>, Dictionary<T, U> |
| `IList<T>` | I support indexing and modification | List<T>, arrays (cast) |
| `IReadOnlyList<T>` | I support indexing (read-only) | Returned by many LINQ methods |

## Combining built-in interfaces

A class can implement multiple built-in interfaces:

```csharp
public class Item : IComparable<Item>, IEquatable<Item>, IDisposable
{
    public int Id { get; set; }
    public string Name { get; set; }

    public Item(int id, string name)
    {
        Id = id;
        Name = name;
    }

    public int CompareTo(Item? other)
    {
        return this.Id.CompareTo(other?.Id ?? 0);
    }

    public bool Equals(Item? other)
    {
        return other != null && this.Id == other.Id;
    }

    public override bool Equals(object? obj) => Equals(obj as Item);
    public override int GetHashCode() => Id.GetHashCode();

    public void Dispose()
    {
        Console.WriteLine("Item disposed");
    }
}
```

## Common mistakes

- **Forgetting `using` for `IDisposable`** – Always use `using` or `using var` with disposable objects, or manually call `Dispose()`. Otherwise, resources leak.
- **Returning `List<T>` when `IEnumerable<T>` is enough** – If a method only needs to iterate, accept or return `IEnumerable<T>` to allow any collection type.
- **Not implementing `GetEnumerator()` correctly** – If you implement `IEnumerable<T>`, make sure `GetEnumerator()` returns a valid enumerator.

## Quick recap

- `IComparable<T>`: implement to allow sorting via `CompareTo()`.
- `IEquatable<T>`: implement for efficient equality comparison.
- `IEnumerable<T>`: required for `foreach` loops.
- `IEnumerator<T>`: used to iterate through a collection.
- `IDisposable`: implement for cleanup; use `using` to call `Dispose()`.
- `ICollection<T>`, `IList<T>`, `IReadOnlyList<T>`: accept these in methods for flexibility.
