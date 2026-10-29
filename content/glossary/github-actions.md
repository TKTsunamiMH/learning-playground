---
term: GitHub Actions
fullName: GitHub Actions Workflow Automation
category: Workflow & DevOps
tags: [github, ci, cd]
date: 2026-10-29
---

## In short
GitHub Actions is GitHub’s built-in automation system for running workflows on events like push and pull request.

## What it means for a .NET Full Stack developer
You can define a YAML workflow to build, test, and deploy your .NET and frontend projects.  
It works well for `dotnet` commands, npm tasks, and Azure deployment steps.  
This keeps quality checks consistent for every contributor.

## Example
```yaml
on: [push, pull_request]
```

## Related terms
- [CI/CD](/glossary/ci-cd)
- [Pipeline](/glossary/pipeline)
- [Pull Request](/glossary/pull-request)

