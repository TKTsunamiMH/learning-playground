---
term: Code Coverage
fullName: Code Coverage
category: Testing & Metrics
tags: [testing, metrics, quality-assurance, measurement]
date: 2026-11-27
---

## In short
Code coverage measures what percentage of your code is executed by tests—a useful indicator, not a goal.

## What it means for a .NET Full Stack developer
Coverage tools show which lines, branches, and methods are run during testing.  
80% coverage is a reasonable target for most projects; 100% coverage is unnecessary and can even encourage bad tests.  
Coverage reveals gaps, but high coverage doesn't guarantee quality tests. Focus on testing important logic and edge cases, not on hitting a percentage.  
Measure coverage with `dotnet test /p:CollectCoverage=true` or tools like OpenCover.  
Don't sacrifice test quality for coverage numbers.

## Example
Scenario: A project has 1000 lines of code. Coverage shows 850 lines executed by tests = 85% coverage.  
This is good, but you should check that the untested 150 lines aren't critical business logic.

## Related terms
- [Unit Test](/glossary/unit-test)
- [TDD](/glossary/tdd)
- [CI/CD](/glossary/ci-cd)
