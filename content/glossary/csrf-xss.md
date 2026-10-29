---
term: CSRF/XSS
fullName: Cross-Site Request Forgery / Cross-Site Scripting
category: Web & Security
tags: [security, web, vulnerabilities]
date: 2026-10-29
---

## In short
CSRF tricks users into unwanted actions, while XSS injects malicious scripts into pages.

## What it means for a .NET Full Stack developer
Use anti-forgery protections, safe cookie settings, and input/output encoding.  
ASP.NET Core and modern frontend frameworks provide helpers, but correct usage is still required.  
Security reviews should include these risks in forms, API, and rendering flows.

## Example
Scenario: Validate anti-forgery token on state-changing form posts.

## Related terms
- [HTTP/HTTPS](/glossary/http-https)
- [Authentication vs Authorization](/glossary/authentication-vs-authorization)
- [Code Review](/glossary/code-review)
