---
term: Integration Test
fullName: Integration Test
category: Testing
tags: [testing, api, database]
date: 2026-10-29
---

## In short
An integration test verifies that multiple components work together correctly.

## What it means for a .NET Full Stack developer
You might test an ASP.NET Core endpoint with real middleware and a test database.  
These tests are slower than unit tests but catch wiring and configuration issues.  
They are valuable for API contracts, authentication flows, and data access behavior.

## Example
Scenario: Call `POST /api/orders` in a test host and assert database changes.

## Related terms
- [Unit Test](/glossary/unit-test)
- [xUnit](/glossary/xunit)
- [CI/CD](/glossary/ci-cd)

