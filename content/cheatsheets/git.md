---
title: Git Quick Reference
topic: Git
tags: [git, cli, version-control]
date: 2026-10-01
---

# Git Quick Reference

## Common commands

| Command | Purpose |
| --- | --- |
| `git status` | Check working tree state |
| `git add .` | Stage all changes |
| `git commit -m "msg"` | Save a snapshot |
| `git push` | Upload to remote |
| `git pull` | Sync with remote |

```bash
git checkout -b feature/my-task
git add .
git commit -m "Add new notes"
git push origin feature/my-task
```

## Branches and merging

| Command | Purpose |
| --- | --- |
| `git branch` | List branches |
| `git branch feature/name` | Create a new branch |
| `git checkout branch-name` | Switch branches |
| `git checkout -b feature/name` | Create and switch to new branch |
| `git branch -d branch-name` | Delete branch |
| `git merge feature/name` | Merge a branch into current branch |
| `git push origin branch-name` | Push branch to remote |
| `git pull origin branch-name` | Pull branch from remote |

## Where to read more

Learn more about Git and GitHub concepts in these notes:

- **Concepts & fundamentals:** git-what-and-why, git-commits-and-history
- **Branching & merging:** git-branches, git-merging-and-conflicts
- **Remote work:** git-remotes-and-sync
- **GitHub workflows:** github-pull-requests, github-workflow-for-solo-projects
- **Recovery & safety:** git-undoing-things, git-gitignore-and-repo-hygiene
- **Portfolio:** github-profile-and-readme
