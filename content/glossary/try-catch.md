---
term: try-catch
fullName: Try-Catch Exception Handling
category: Backend & .NET
tags: [csharp, error-handling, control-flow]
date: 2026-11-23
---

## In short
`try-catch` is a C# syntax for catching and handling exceptions that might occur during execution.

## What it means for a .NET Full Stack developer
Wrap potentially failing code in `try`; handle specific exceptions in `catch` blocks.  
Use `finally` for guaranteed cleanup (closing files, releasing connections).  
Catch only exceptions you can handle; let unexpected ones bubble up to alert you of bugs.

## Example
```csharp
try
{
    var user = await _database.GetUserAsync(id);
    Console.WriteLine(user.Name);
}
catch (TimeoutException ex)
{
    logger.LogError(ex, "Database timeout");
    return StatusCode(503, "Service temporarily unavailable");
}
finally
{
    // Cleanup always runs
}
```

## Related terms
- [exception](/glossary/exception)
- [stack trace](/glossary/stack-trace)
