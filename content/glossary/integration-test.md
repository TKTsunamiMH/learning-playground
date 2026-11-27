---
term: Integration Test
fullName: Integration Test
category: Testing
tags: [testing, api, database, components]
date: 2026-11-27
---

## In short
An integration test verifies that multiple components (like an API endpoint, database, and business logic) work together correctly.

## What it means for a .NET Full Stack developer
You might test an ASP.NET Core endpoint with real middleware, actual database queries, or real HTTP calls.  
Integration tests are slower than unit tests (seconds vs milliseconds) but catch configuration, wiring, and data-flow issues.  
They are valuable for API contracts, authentication flows, and database schema changes.  
Use fewer integration tests than unit tests; focus on critical paths and boundaries.  
Test with `WebApplicationFactory` and an in-memory test database for reproducibility.

## Example
Scenario: Call `POST /api/orders` with test data, verify the endpoint returns 201 Created and the database was updated.

## Related terms
- [Unit Test](/glossary/unit-test)
- [xUnit](/glossary/xunit)
- [CI/CD](/glossary/ci-cd)
- [Testing Pyramid](/glossary/test-pyramid) (if it exists, otherwise omit)

