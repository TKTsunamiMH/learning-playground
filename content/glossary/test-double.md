---
term: Test Double
fullName: Test Double
category: Testing
tags: [testing, test-double, mock, fake, stub]
date: 2026-11-27
---

## In short
A test double is a replacement for a real dependency (like a database or service) that makes tests fast, isolated, and repeatable.

## What it means for a .NET Full Stack developer
Test doubles include fakes (working but simplified implementations), stubs (hardcoded responses), mocks (verify calls), spies, and dummies.  
They allow you to test business logic without slow I/O, external services, or configuration overhead.  
Hand-written fakes are simple; mocking libraries like Moq automate their creation.  
Use test doubles to isolate the code you're testing and make unit tests run in milliseconds.

## Example
Scenario: Use a fake `IEmailSender` that records emails in memory instead of actually sending them.  
Use an in-memory list instead of a real database for fast repository tests.

## Related terms
- [Mocking](/glossary/mocking)
- [Unit Test](/glossary/unit-test)
- [Dependency Injection (DI)](/glossary/dependency-injection-di)
