---
term: Authentication vs Authorization
fullName: Authentication and Authorization
category: Web & Security
tags: [security, auth, access-control]
date: 2026-10-29
---

## In short
Authentication answers “who are you?”, while authorization answers “what are you allowed to do?”.

## What it means for a .NET Full Stack developer
In ASP.NET Core, authentication middleware validates identity from cookies or tokens.  
Authorization policies then enforce roles, claims, or custom access rules.  
Mixing these concepts can lead to accidental permission bugs.

## Example
```csharp
[Authorize(Roles = "Admin")]
```

## Related terms
- [JWT](/glossary/jwt)
- [OAuth](/glossary/oauth)
- [CORS](/glossary/cors)

