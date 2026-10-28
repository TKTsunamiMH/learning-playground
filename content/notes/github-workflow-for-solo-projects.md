---
title: GitHub Workflow for Solo Projects
topic: Git
tags: [github, workflow, personal-projects, commits, issues, pages]
date: 2026-10-28
---

# GitHub Workflow for Solo Projects

When building a personal project, you have freedom to choose a simpler workflow than a team project. This note outlines a practical workflow that balances speed with good practices.

## When to commit directly vs. when to use a branch

**Commit directly to `main`:**
- Small bug fixes (typo, minor styling)
- Documentation updates
- Non-breaking dependency updates

**Use a branch:**
- New features (even small ones)
- Major changes or refactors
- Experimental work you might revert
- Anything that touches core logic

## Small, frequent commits

Commit often with clear messages. Small commits make it easy to find where bugs were introduced.

```bash
git commit -m "Add notification component"
git commit -m "Style notification with CSS"
git commit -m "Add close button to notification"
```

Avoid committing everything at once after days of work.

## Using issues to track work

Issues are a lightweight way to track features and bugs. You can:
- Write issues for features you want to build
- Link PRs to issues automatically
- Organize work by labeling issues

```bash
# In GitHub, create an issue and use "Closes #42" in PR description
# This auto-closes the issue when the PR merges
```

## Typical solo workflow

```bash
# 1. Start of day: pull main
git checkout main
git pull

# 2. Small fix? Commit to main
git add .
git commit -m "Fix alignment in header"
git push

# 3. New feature? Create a branch
git checkout -b feature/search-box

# 4. Make commits
git add .
git commit -m "Add search input component"
git push -u origin feature/search-box

# 5. Open a PR to review your changes

# 6. After review: merge in GitHub UI

# 7. Delete the branch
git branch -d feature/search-box
```

## Deploying with GitHub Pages

For a static site on GitHub Pages:

1. Configure GitHub Pages in repository settings
2. Add a GitHub Actions workflow to auto-deploy on push

Example workflow (`.github/workflows/deploy.yml`):

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Meaningful commit history

A clean commit history helps you understand what changed and why.

Bad commits:
```
Update
Fix
wip
typo
```

Good commits:
```
Add search component with debouncing
Fix search results styling for mobile
Update search to highlight matching terms
```

## Reviewing your own work

Before merging to main:

1. Review the diff in your PR
2. Run tests locally: `npm run test`
3. Run linters: `npm run lint`
4. Test the feature manually in your browser

## Keeping main deployable

Always ensure `main` is stable:
- Test code locally before pushing
- Don't merge incomplete features
- Use feature flags if a feature isn't ready
- Fix deploy failures immediately

## Common mistakes

- Committing huge changes instead of small, focused commits.
- Using branches for tiny changes and committing huge things to main. Be balanced.
- Forgetting to link issues to PRs. Use "Closes #42" to auto-close issues.
- Not testing before pushing to main. Run tests locally first.

## Quick recap

- Commit directly to main for small fixes; use branches for features.
- Make small, focused commits with clear messages.
- Use issues to track features and bugs.
- Workflow: pull main, fix/branch, commit, push, review, merge, delete branch.
- Set up GitHub Actions to auto-deploy on push.
- Keep main stable and deployable.
