---
term: CI/CD
fullName: Continuous Integration / Continuous Delivery
category: Workflow & DevOps
tags: [devops, github, automation]
date: 2026-10-29
---

## In short
CI/CD is an automated workflow that builds, tests, and ships code changes quickly and safely.

## What it means for a .NET Full Stack developer
In a .NET project, CI usually runs `dotnet restore`, `dotnet build`, and tests on each push or pull request.  
CD then deploys your ASP.NET Core app, frontend, and database changes to environments like Azure App Service.  
It helps you catch issues early and release small updates with confidence.

## Example
```yaml
- run: dotnet test
```

## Related terms
- [DevOps](/glossary/devops)
- [GitHub Actions](/glossary/github-actions)
- [Pipeline](/glossary/pipeline)
