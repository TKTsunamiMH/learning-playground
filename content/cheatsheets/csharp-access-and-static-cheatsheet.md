---
title: C# Access and Static Cheatsheet
topic: C#
tags: [csharp, cheatsheet, access, static, scope, reference]
date: 2026-11-04
---

# C# Access and Static Cheatsheet

Quick reference for access modifiers, static vs instance, scope vs accessibility, and common compiler errors.

## Access modifiers at a glance

| Modifier | Same class | Derived class | Same assembly | Other assembly | Use case |
|----------|-----------|---------------|---------------|-----------------|----------|
| `public` | ✓ | ✓ | ✓ | ✓ | Public API |
| `private` | ✓ | ✗ | ✗ | ✗ | Implementation details |
| `protected` | ✓ | ✓ | ✗ | ✗ | For derived classes |
| `internal` | ✓ | ✗ | ✓ | ✗ | Same project only |
| `protected internal` | ✓ | ✓ | ✓ | ✗ | Derived + same assembly |
| `private protected` | ✓ | ✓* | ✗ | ✗ | Derived in same assembly |
| `file` | ✓ | ✓* | ✗ | ✗ | Same file only (C# 11+) |

\* Only when derived class is in same assembly.

## Default accessibility

| What | Default | Why |
|-----|---------|-----|
| Class/struct members | `private` | Hide implementation |
| Top-level types (class, interface, struct) | `internal` | Visible in project, hidden from other assemblies |
| Interface members | `public` | Meant to be implemented and used |
| Enum members | `public` | Values are always accessible |
| Nested types | `private` | Hide nested classes from outside |

## Static vs instance

| | Instance | Static |
|---|----------|--------|
| **Access** | `object.Member` | `ClassName.Member` |
| **Exists per** | Object | Class |
| **Created** | With `new` | At class load time |
| **When to use** | Object state and behavior | Utilities, constants, factories |
| **Can access** | Instance and static members | Only static members |
| **Error if mixed** | CS0120 | (see below) |

## Scope vs accessibility: the difference

| | Scope | Accessibility |
|---|-------|----------------|
| **Question** | Is this name defined here? | Am I allowed to use it? |
| **Decided by** | Code structure | Access modifiers |
| **Error** | CS0103 | CS0122 |

## Common compiler errors

### CS0103: Name does not exist in current context

**Problem:** Variable is out of scope.

```csharp
{
    int x = 5;
}
Console.WriteLine(x);  // ❌ CS0103: x is out of scope
```

**Fix:** Declare at a broader scope.

```csharp
int x = 5;
{
    Console.WriteLine(x);  // ✓
}
```

### CS0122: Inaccessible due to protection level

**Problem:** Access modifier blocks access.

```csharp
public class MyClass
{
    private int _value = 10;
}
var obj = new MyClass();
Console.WriteLine(obj._value);  // ❌ CS0122: _value is private
```

**Fix:** Use the public interface.

```csharp
public class MyClass
{
    private int _value = 10;
    public int Value => _value;
}
var obj = new MyClass();
Console.WriteLine(obj.Value);  // ✓
```

### CS0120: An object reference is required for non-static member

**Problem:** Trying to access instance member via class name (or vice versa).

```csharp
public class MathHelper
{
    public int Add(int a, int b) => a + b;  // Instance method
}
MathHelper.Add(2, 3);  // ❌ CS0120: not static
```

**Fix 1:** Make it static if it doesn't need state.

```csharp
public static int Add(int a, int b) => a + b;
MathHelper.Add(2, 3);  // ✓
```

**Fix 2:** Create an instance first.

```csharp
var helper = new MathHelper();
helper.Add(2, 3);  // ✓
```

## Scope nesting (outer to inner)

```
Namespace
  ↓
Class
  ↓
Method
  ↓
Block (if, for, while, etc.)
```

Inner scopes can see outer, but outer scopes cannot see inner.

## Quick rules

- **Start everything private, make public only when needed.**
- **Use properties, not public fields.**
- **Static for utilities, constants, factories; instance for state.**
- **CS0103 = name missing; CS0122 = access denied; CS0120 = instance/static mismatch.**

## Links to detailed notes

- [Access Modifiers in C#](/content/notes/csharp-access-modifiers.md)
- [Private vs Public in C#](/content/notes/csharp-private-vs-public.md)
- [Static Members in C#](/content/notes/csharp-static.md)
- [Scope vs Accessibility in C#](/content/notes/csharp-scope-vs-accessibility.md)
- [Classes and Members Overview](/content/notes/csharp-classes-and-members-overview.md)
