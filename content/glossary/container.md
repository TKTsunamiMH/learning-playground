---
term: Container
fullName: Application Container
category: Workflow & DevOps
tags: [runtime, deployment, docker]
date: 2026-10-29
---

## In short
A container is a lightweight package that runs your app with everything it needs.

## What it means for a .NET Full Stack developer
Your .NET API can run the same way on your laptop, CI runner, and cloud host.  
Containers isolate dependencies, so project versions are less likely to conflict.  
They are commonly used for ASP.NET Core apps, Redis, SQL edge services, and frontend builds.

## Example
```bash
docker run -p 8080:8080 my-api-image
```

## Related terms
- [Docker](/glossary/docker)
- [Kubernetes](/glossary/kubernetes)
- [CI/CD](/glossary/ci-cd)

