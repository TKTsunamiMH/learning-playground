---
title: Terminal Cheat Sheet
topic: Terminal
tags: [terminal, cli, cheatsheet, reference, quick]
date: 2026-10-16
---

# Terminal Cheat Sheet

A quick reference for the most important terminal commands grouped by category.

## Navigation

| Command | Windows (PowerShell) | macOS/Linux |
|---------|----------------------|-------------|
| Current location | `cd` | `pwd` |
| List folder | `dir` | `ls` |
| List with details | `dir /s` | `ls -la` |
| Go to folder | `cd path` | `cd path` |
| Go up one level | `cd ..` | `cd ..` |
| Go to root | `cd /d C:\` | `cd /` |
| Go home | `cd ~` | `cd ~` |
| Clear screen | `cls` | `clear` |

## Files and Folders

| Task | Windows (PowerShell) | macOS/Linux |
|------|----------------------|-------------|
| Create folder | `mkdir name` | `mkdir name` |
| Create file | `New-Item -Name file.txt -ItemType File` | `touch file.txt` |
| Copy file | `copy src dest` | `cp src dest` |
| Copy folder | `copy folder\ new\ -Recurse` | `cp -r folder new` |
| Move/rename | `move old new` | `mv old new` |
| Delete file | `del file.txt` | `rm file.txt` |
| Delete folder | `rmdir folder /s` | `rm -r folder` |
| Show contents | `type file.txt` | `cat file.txt` |

## Git

| Command | Purpose |
|---------|---------|
| `git clone <url>` | Clone a repository |
| `git status` | Show changes |
| `git add .` | Stage all changes |
| `git commit -m "msg"` | Commit changes |
| `git push` | Upload commits |
| `git pull` | Download commits |
| `git log` | View history |
| `git branch` | List branches |
| `git checkout -b <branch>` | Create and switch branch |
| `git switch <branch>` | Switch branch |

## npm

| Command | Purpose |
|---------|---------|
| `npm init -y` | Create new project |
| `npm install` | Install dependencies |
| `npm install <pkg>` | Install a package |
| `npm install -D <pkg>` | Install dev dependency |
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run <script>` | Run any script |
| `npx <command>` | Run without installing |

## .NET CLI

| Command | Purpose |
|---------|---------|
| `dotnet --version` | Check version |
| `dotnet new console` | Create console app |
| `dotnet new web` | Create web API |
| `dotnet run` | Run app |
| `dotnet build` | Build project |
| `dotnet add package <pkg>` | Install package |
| `dotnet restore` | Download dependencies |
| `dotnet test` | Run tests |

## Shortcuts (all shells)

| Shortcut | Purpose |
|----------|---------|
| `Ctrl+C` | Stop current command |
| `Ctrl+L` | Clear screen (bash/zsh) |
| `↑` / `↓` | Navigate history |
| `Tab` | Autocomplete |
| `Ctrl+A` | Jump to line start |
| `Ctrl+E` | Jump to line end |
| `Ctrl+R` | Search history (bash/zsh) |

## Quick examples

### Start a new web project

```bash
# Create folder and enter it
mkdir my-app
cd my-app

# Initialize npm
npm init -y

# Install React
npm install react react-dom

# Start development
npm run dev
```

### Clone and work on an existing project

```bash
# Clone
git clone https://github.com/user/repo.git
cd repo

# Install and start
npm install
npm run dev

# Make changes and commit
git add .
git commit -m "Add feature"
git push
```

### Create and build a .NET project

```bash
# Create web API
dotnet new web -n MyApi
cd MyApi

# Run it
dotnet run

# Build for production
dotnet build -c Release
```
