---
term: Mocking
fullName: Mocking Test Dependencies
category: Testing
tags: [testing, isolation, di]
date: 2026-10-29
---

## In short
Mocking replaces real dependencies with controlled test doubles.

## What it means for a .NET Full Stack developer
You mock repositories, HTTP clients, or services to test logic without external systems.  
This makes unit tests deterministic and faster.  
Mocking works best when classes depend on interfaces via DI.

## Example
Scenario: Mock `IEmailSender` so tests verify it was called without sending real emails.

## Related terms
- [Unit Test](/glossary/unit-test)
- [Dependency Injection (DI)](/glossary/dependency-injection-di)
- [xUnit](/glossary/xunit)

