---
term: exception
fullName: Exception
category: Backend & .NET
tags: [csharp, error-handling, runtime]
date: 2026-11-23
---

## In short
An exception is an object representing a runtime error that interrupts normal program flow.

## What it means for a .NET Full Stack developer
Exceptions signal unexpected situations (null reference, file not found, division by zero).  
You handle them with `try-catch-finally` to prevent crashes and return helpful errors to users.  
Good exception handling logs the full error, doesn't hide bugs, and cleans up resources.

## Example
```csharp
try
{
    int result = int.Parse(userInput);
}
catch (FormatException ex)
{
    logger.LogError(ex, "Invalid number format");
}
```

## Related terms
- [try-catch](/glossary/try-catch)
- [stack trace](/glossary/stack-trace)
