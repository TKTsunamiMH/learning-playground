---
term: IaC
fullName: Infrastructure as Code
category: Workflow & DevOps
tags: [azure, deployment, automation]
date: 2026-10-29
---

## In short
IaC means defining infrastructure in code files instead of setting it up manually in a portal.

## What it means for a .NET Full Stack developer
You can version-control your Azure resources the same way as your ASP.NET Core project.  
Templates for app services, databases, and secrets can be reviewed in pull requests.  
This makes environments repeatable for local, test, and production setups.

## Example
```bash
az deployment group create --template-file main.bicep
```

## Related terms
- [Azure](/glossary/azure)
- [DevOps](/glossary/devops)
- [Pipeline](/glossary/pipeline)

