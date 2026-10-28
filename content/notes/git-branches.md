---
title: Branches and Why They Matter
topic: Git
tags: [git, branches, features, workflow, parallel]
date: 2026-10-28
---

# Branches and Why They Matter

A branch is an independent line of development within your repository. It allows you to work on features, fix bugs, or experiment without affecting the main version of your code.

## What is a branch?

Think of a branch as a pointer to a commit. By default, your repository has a `main` branch (previously called `master`). When you create a new branch, you create a parallel line where commits don't affect other branches until you merge.

## Why branches are useful

- Work on features without breaking main
- Collaborate safely with multiple people
- Organize work by feature or bug
- Enable code review through pull requests

## Branch naming conventions

Use descriptive, hierarchical names:

- `feature/user-authentication` - new feature
- `fix/login-timeout` - bug fix
- `docs/api-reference` - documentation
- `refactor/database-queries` - refactoring
- `experimental/new-ui` - experimental work

## Main branch

The `main` branch is your primary, stable branch. Most projects protect `main` to require pull requests before merging.

## Creating and switching branches

```bash
# Create and switch to a new branch
git checkout -b feature/login-form

# Modern alternative
git switch -c feature/login-form

# Switch to an existing branch
git checkout main
git switch main

# List local branches
git branch

# List all branches
git branch -a

# Delete a branch
git branch -d feature/login-form
```

## Typical workflow with branches

```bash
# 1. Make sure you're on main and up to date
git checkout main
git pull

# 2. Create a new branch for your feature
git checkout -b feature/notification-bell

# 3. Make changes and commit
git add .
git commit -m "Add notification bell component"

# 4. Push your branch to GitHub
git push origin feature/notification-bell

# 5. Open a pull request in GitHub UI

# 6. Once approved and tests pass, merge the PR in GitHub UI

# 7. Delete the branch locally
git branch -d feature/notification-bell

# 8. Delete the branch on GitHub
git push origin --delete feature/notification-bell
```

## Common mistakes

- Creating a branch but forgetting to switch to it before committing. You commit to main instead.
- Naming branches too generically. Use specific names like `fix/button-alignment`.
- Not deleting old branches. Delete branches after they merge to keep things tidy.

## Quick recap

- A branch is an independent line of development.
- Use branches to work on features without affecting main.
- Branch naming: `feature/`, `fix/`, `docs/`, `refactor/` prefixes are conventional.
- `main` is your primary, stable branch.
- Workflow: create branch, commit, push, pull request, review, merge, delete.
- Always pull main before creating a new branch to start from the latest code.
