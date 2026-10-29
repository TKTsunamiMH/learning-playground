---
term: Pipeline
fullName: Build and Release Pipeline
category: Workflow & DevOps
tags: [automation, deployment, testing]
date: 2026-10-29
---

## In short
A pipeline is a sequence of automated steps that validates and releases software.

## What it means for a .NET Full Stack developer
A typical .NET pipeline restores packages, builds, runs tests, and publishes artifacts.  
It can also run frontend checks and database migration checks before deployment.  
Clear pipeline stages make failures visible and easier to troubleshoot.

## Example
Scenario: Build API, run xUnit tests, run `npm run build`, then deploy.

## Related terms
- [CI/CD](/glossary/ci-cd)
- [GitHub Actions](/glossary/github-actions)
- [Unit Test](/glossary/unit-test)

