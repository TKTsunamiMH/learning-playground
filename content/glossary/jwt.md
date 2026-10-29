---
term: JWT
fullName: JSON Web Token
category: Web & Security
tags: [security, auth, api]
date: 2026-10-29
---

## In short
A JWT is a signed token that carries claims about a user or client.

## What it means for a .NET Full Stack developer
JWTs are often used by SPAs and mobile apps to call secured ASP.NET Core APIs.  
You validate signature, issuer, audience, and expiration on the server.  
Token handling in the frontend should avoid unsafe storage patterns.

## Example
Scenario: API returns access token after login, then client sends `Authorization: Bearer ...`.

## Related terms
- [OAuth](/glossary/oauth)
- [Authentication vs Authorization](/glossary/authentication-vs-authorization)
- [HTTP/HTTPS](/glossary/http-https)

