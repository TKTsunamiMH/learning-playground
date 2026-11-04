---
title: Access Modifiers in C#
topic: C#
tags: [csharp, access, encapsulation, public, private]
date: 2026-11-04
---

# Access Modifiers in C#

Access modifiers control who can access a class member or top-level type. They enforce encapsulation, a core principle of object-oriented programming: hide internal details and expose only what other code needs. This protects your code from accidental misuse and makes changes easier later.

## The seven modifiers

| Modifier | Same class | Derived class | Same assembly | Other assembly |
|----------|-----------|---------------|---------------|-----------------|
| `public` | ✓ | ✓ | ✓ | ✓ |
| `private` | ✓ | ✗ | ✗ | ✗ |
| `protected` | ✓ | ✓ | ✗ | ✗ |
| `internal` | ✓ | ✗ | ✓ | ✗ |
| `protected internal` | ✓ | ✓ | ✓ | ✗ |
| `private protected` | ✓ | ✓ (only in same assembly) | ✗ | ✗ |
| `file` | ✓ | ✓ (only in same file) | ✗ | ✗ |

**Note:** `file` is new in C# 11; it restricts a type to the current file only.

## Default accessibility

When you omit an access modifier, these defaults apply:

- **Class or struct members** (fields, methods, properties): `private`
- **Top-level types** (classes, structs, interfaces defined outside any class): `internal`
- **Interface members**: `public` (members are meant to be implemented by others)
- **Enum members**: `public` (values are always accessible)
- **Nested types** (classes/structs inside another class): `private`

## Real-world example

```csharp
public class BankAccount
{
    // Private field: only this class can access it
    private decimal _balance = 0;

    // Public method: any code can call it
    public void Deposit(decimal amount)
    {
        if (amount <= 0)
            throw new ArgumentException("Amount must be positive");
        _balance += amount;
    }

    // Public property: read-only access for external code
    public decimal Balance => _balance;

    // Protected method: only this class and derived classes can call it
    protected void ResetBalance()
    {
        _balance = 0;
    }

    // Internal: accessible anywhere in this assembly
    internal void AuditLog()
    {
        Console.WriteLine($"Balance is {_balance}");
    }
}
```

## Common mistakes

- **Exposing all fields as public** – Use properties instead. This lets you add validation later without breaking the API.
- **Over-protecting members** – If something should be accessible to derived classes, use `protected`, not `private`.
- **Confusing `internal` with `private`** – `internal` means "anyone in this project," not "private within a class." Use `private` for class members.

## Quick recap

- Use `public` for the intended interface; use `private` for everything else by default.
- `protected` is for derived classes; `internal` is for the same assembly.
- Classes and their members are `private` by default; top-level types are `internal`.
- Encapsulation: expose properties/methods, hide fields and implementation details.
