---
title: Terminal .NET CLI Basics
topic: Terminal
tags: [terminal, cli, dotnet, csharp, console, web, build, test]
date: 2026-10-16
---

# Terminal .NET CLI Basics

The .NET CLI (`dotnet` command) is how you create, build, test, and run .NET applications from the terminal. It's powerful for C# projects, from console apps to web APIs.

## Core dotnet commands

| Command | Purpose |
|---------|---------|
| `dotnet --version` | Check .NET version |
| `dotnet new <template>` | Create a new project |
| `dotnet new console` | Create a console app |
| `dotnet new web` | Create a web API project |
| `dotnet run` | Compile and run your app |
| `dotnet build` | Compile your project |
| `dotnet add package <name>` | Install a NuGet package |
| `dotnet restore` | Download all dependencies |
| `dotnet test` | Run unit tests |

## Creating and running projects

**Create and run a console app:**
```bash
# Check .NET version
dotnet --version

# Create a new console app
dotnet new console -n HelloWorld
cd HelloWorld

# Run it
dotnet run
```

**Create and run a web API:**
```bash
# Create a web API project
dotnet new web -n MyApi
cd MyApi

# Run it (listens on http://localhost:5000)
dotnet run
```

## Managing dependencies

**Add a package:**
```bash
# Add a NuGet package
dotnet add package Newtonsoft.Json

# Add a specific version
dotnet add package Newtonsoft.Json --version 13.0.0
```

**Restore dependencies:**
```bash
# Download all dependencies listed in your .csproj file
dotnet restore
```

## Building and testing

**Build your project:**
```bash
# Compile your project
dotnet build

# Build in release mode (optimized)
dotnet build -c Release
```

**Run tests:**
```bash
# Run unit tests (requires a test project)
dotnet test

# Run tests with verbose output
dotnet test -v normal
```

## Project structure

A typical .NET project has:

- `Program.cs`: Entry point for your app.
- `*.csproj`: Project file that lists dependencies and settings.
- `bin/`: Compiled output (ignore in Git).
- `obj/`: Build artifacts (ignore in Git).

### Example `Program.cs` (console app)

```csharp
Console.WriteLine("Hello, World!");
```

### Example `Program.cs` (minimal web API)

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello, World!");
app.Run();
```

## Common mistakes

- Forgetting `dotnet restore` after cloning a project with a new `.csproj` file.
- Running `dotnet run` without compiling first (it compiles automatically, but errors are confusing).
- Committing `bin/` and `obj/` folders to Git. Add them to `.gitignore`.

## Quick recap

- `dotnet --version` checks your .NET version.
- `dotnet new console` / `dotnet new web` creates new projects.
- `dotnet run` compiles and runs your app.
- `dotnet add package <name>` installs dependencies.
- `dotnet build` compiles; `dotnet test` runs tests.
- `dotnet restore` downloads dependencies.
- Ignore `bin/` and `obj/` in Git.
