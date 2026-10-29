---
term: CORS
fullName: Cross-Origin Resource Sharing
category: Web & Security
tags: [security, api, browser]
date: 2026-10-29
---

## In short
CORS is a browser security mechanism that controls which origins can call your API.

## What it means for a .NET Full Stack developer
When frontend and backend run on different domains, CORS policy must be configured correctly.  
In ASP.NET Core, policies define allowed origins, methods, and headers.  
Overly broad CORS rules can expose your API unnecessarily.

## Example
```csharp
builder.Services.AddCors();
```

## Related terms
- [HTTP/HTTPS](/glossary/http-https)
- [JWT](/glossary/jwt)
- [Authentication vs Authorization](/glossary/authentication-vs-authorization)

