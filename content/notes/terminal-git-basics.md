---
title: Terminal Git Basics
topic: Terminal
tags: [terminal, cli, git, version-control, commit, push, pull, branch]
date: 2026-10-16
---

# Terminal Git Basics

Git is a version-control system that tracks changes to your code. Most workflows happen in the terminal. Learn these core commands to clone projects, save your work, and collaborate with others.

## Core Git commands

| Command | Purpose |
|---------|---------|
| `git clone <url>` | Copy a remote repository to your computer |
| `git status` | Show which files changed and what's staged |
| `git add <file>` | Stage a file to be committed |
| `git add .` | Stage all changes |
| `git commit -m "message"` | Save a snapshot of staged changes |
| `git push` | Upload commits to the remote repository |
| `git pull` | Download and merge changes from remote |
| `git log` | Show commit history |
| `git branch` | List branches or create a new one |
| `git checkout <branch>` | Switch to a different branch |
| `git switch <branch>` | Modern alternative to checkout |

## Everyday workflow

Here's how a typical day looks:

```bash
# 1. Get the latest code
git pull

# 2. Create a new branch for your feature
git checkout -b feature/add-login

# 3. Make some changes to files
# (edit files in your editor)

# 4. Check what changed
git status

# 5. Stage your changes
git add .

# 6. Save a snapshot
git commit -m "Add login form component"

# 7. Upload to remote
git push origin feature/add-login

# 8. Later, review changes
git log
git status
```

## Branching basics

Think of branches as parallel versions of your code. `main` (or `master`) is usually the production branch.

```bash
# List all branches
git branch

# Create and switch to a new branch
git checkout -b feature/new-thing

# Switch to an existing branch
git switch main

# Delete a branch locally (after merging)
git branch -d feature/new-thing

# Push a new branch to remote
git push origin feature/new-thing
```

## Common mistakes

- Forgetting to pull before starting work, then having merge conflicts later. Always `git pull` first.
- Committing to `main` directly instead of creating a feature branch. Use branches to keep work organized.
- Writing unhelpful commit messages like "fix stuff" instead of "Fix authentication timeout in login modal". Be specific so others (and future you) understand what changed.

## Quick recap

- `git clone` downloads a repository.
- `git status` shows what's changed.
- `git add .` stages all changes; `git commit -m "msg"` saves a snapshot.
- `git push` uploads commits; `git pull` downloads them.
- Use branches (`git checkout -b`) to work on features in parallel.
- Always pull before you start, and write clear commit messages.
- `git log` shows your project's history.
