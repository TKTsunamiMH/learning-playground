---
term: Mocking
fullName: Mocking Test Dependencies
category: Testing
tags: [testing, isolation, di, test-doubles]
date: 2026-11-27
---

## In short
Mocking replaces real dependencies (database, HTTP, file system) with controlled test doubles so tests run fast and don't depend on external systems.

## What it means for a .NET Full Stack developer
You mock repositories, HTTP clients, email senders, or any external service to test logic without I/O.  
This makes unit tests deterministic (same input always gives same output), fast (milliseconds), and reliable.  
Mocking works best when classes depend on interfaces via [Dependency Injection (DI)](/glossary/dependency-injection-di).  
Libraries like Moq, NSubstitute, or FakeItEasy automate mock generation; you can also hand-write simple fakes.  
Avoid over-mocking; mock only real external dependencies, not your own simple business logic.

## Example
Scenario: Mock `IEmailSender` so tests verify that an email was sent without actually sending it.  
Mock `IProductRepository` so tests use an in-memory list instead of a database.

## Related terms
- [Unit Test](/glossary/unit-test)
- [Test Double](/glossary/test-double)
- [Dependency Injection (DI)](/glossary/dependency-injection-di)
- [xUnit](/glossary/xunit)
- [Integration Test](/glossary/integration-test)

