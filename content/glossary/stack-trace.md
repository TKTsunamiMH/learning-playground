---
term: stack trace
fullName: Stack Trace
category: Backend & .NET
tags: [debugging, error-handling, runtime]
date: 2026-11-23
---

## In short
A stack trace is a list of method calls showing where an exception was thrown and how the program got there.

## What it means for a .NET Full Stack developer
When an exception occurs, the stack trace shows the chain of method calls from bottom (where it started) to top (where it was thrown).  
Read it bottom-to-top to find where YOUR code triggered the error, not where a framework caught it.  
Preserving the stack trace is important: use `throw;` not `throw ex;` when rethrowing.

## Example
```
at MyApp.Database.ReadFile() in C:\app\Database.cs:line 50
at MyApp.UserService.GetUser() in C:\app\UserService.cs:line 20
at MyApp.Program.Main() in C:\app\Program.cs:line 5
```
Read bottom-to-top: Main called GetUser, which called ReadFile, where the error occurred.

## Related terms
- [exception](/glossary/exception)
- [try-catch](/glossary/try-catch)
