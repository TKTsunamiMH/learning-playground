---
title: .NET CLI Cheatsheet
topic: .NET
tags: [.net, cli, csharp]
date: 2026-10-04
---

# .NET CLI Cheatsheet

## Useful commands

| Command | Purpose |
| --- | --- |
| `dotnet new webapi` | Create a new API project |
| `dotnet restore` | Restore NuGet packages |
| `dotnet build` | Build the project |
| `dotnet run` | Start the app |
| `dotnet test` | Run tests |

```bash
dotnet new sln -n LearningApp
dotnet new webapi -n ApiDemo
dotnet sln add ApiDemo/ApiDemo.csproj
dotnet build
```
