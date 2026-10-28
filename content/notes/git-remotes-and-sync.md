---
title: Remotes and Syncing with GitHub
topic: Git
tags: [git, github, remote, clone, fetch, pull, push]
date: 2026-10-28
---

# Remotes and Syncing with GitHub

A remote is a reference to a repository hosted elsewhere, usually on GitHub. Most projects have one primary remote called `origin`, which points to your GitHub repository.

## What is origin?

`origin` is the default name for your primary remote repository on GitHub. When you clone a repository, Git automatically creates an `origin` remote pointing to the GitHub URL.

```bash
# See your remotes
git remote -v

# Output example:
# origin  https://github.com/alice/my-project.git (fetch)
# origin  https://github.com/alice/my-project.git (push)
```

## Clone: Getting a repository

`git clone` downloads an entire repository from GitHub to your computer, including all history and branches.

```bash
# Clone a repository
git clone https://github.com/alice/my-project.git

# Clone into a specific folder
git clone https://github.com/alice/my-project.git my-project-folder
```

After cloning:
- You have a full local copy
- `origin` is automatically set to the GitHub URL
- You're on the default branch (usually `main`)
- All commit history is available locally

## Fetch vs. Pull

**`git fetch`** downloads changes but doesn't merge them.

**`git pull`** fetches and automatically merges into your current branch.

`git pull` is equivalent to `git fetch` followed by `git merge origin/<branch>`.

## Push: Uploading your changes

`git push` uploads your commits to GitHub.

```bash
# Push current branch
git push

# Push and set upstream
git push -u origin feature/new-ui

# Push a specific branch
git push origin main

# Push all branches
git push --all
```

## Upstream branches

An upstream branch is the remote branch your local branch tracks. When you create a new branch, use `git push -u origin <branch>` to set the upstream.

## Why you should pull before you start working

Always pull before creating a new branch or starting work:

```bash
# 1. Pull the latest main
git checkout main
git pull

# 2. Create a new branch from the latest main
git checkout -b feature/notifications
```

If you don't pull first, you might base your branch on old code and face merge conflicts later.

## Typical daily workflow

```bash
# Start of day: pull the latest
git checkout main
git pull

# Create a feature branch
git checkout -b feature/user-profile

# Make commits
git add .
git commit -m "Add user profile page"

# Push to GitHub
git push -u origin feature/user-profile

# Later: open a pull request in GitHub
# After review and tests pass: merge in GitHub

# Back to main and update
git checkout main
git pull

# Delete the local branch
git branch -d feature/user-profile
```

## Common mistakes

- Forgetting to pull before starting work, creating merge conflicts later.
- Pushing directly to `main` instead of using a pull request.
- Not setting upstream when pushing a new branch. Use `git push -u origin <branch>`.

## Quick recap

- `origin` is your primary remote pointing to GitHub.
- `git clone` downloads the entire repository.
- `git fetch` downloads; `git pull` fetches and merges.
- `git push` uploads your commits.
- Always `git pull` before starting work to avoid merge conflicts.
- Workflow: pull main, create branch, commit, push, pull request, review, merge.
