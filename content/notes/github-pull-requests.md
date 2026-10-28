---
title: Pull Requests and Code Review
topic: Git
tags: [github, pull-request, code-review, merge, collaboration]
date: 2026-10-28
---

# Pull Requests and Code Review

A pull request (PR) is a GitHub feature that lets you propose changes, discuss them, and review them before merging into the main branch. It's the foundation of collaborative development.

## What is a pull request?

A pull request is a request to merge one branch into another (usually a feature branch into `main`). It includes:
- All commits from your branch
- A description of what changed and why
- A discussion thread for comments
- Automated checks and tests
- An option to merge once approved

## Why use pull requests?

- **Code review**: Catch bugs and problems before merging
- **Knowledge sharing**: Team members learn about changes
- **Discussion**: Ask questions and collaborate
- **Tests**: Automated checks run before merge
- **History**: Changes are documented with review comments
- **Quality gate**: Require approvals before merging

## The typical pull request flow

1. **Create a branch** from the latest `main`
2. **Make commits** with clear messages
3. **Push to GitHub** with `git push -u origin feature/...`
4. **Open a PR** in GitHub UI
5. **Automated checks run** (tests, linters)
6. **Review and discuss** - make fixes if needed
7. **Merge** once approved and tests pass
8. **Delete the branch** locally and on GitHub

## Writing a good PR description

Explain:
- **What**: What feature or fix did you make?
- **Why**: Why was this needed?
- **How**: How does it work?
- **Testing**: How did you test it?

Example:

```
## Description
Add dark mode toggle to settings page

## Why
Users requested dark mode for reduced eye strain at night.

## Changes
- Add DarkModeToggle component
- Update Settings page to include toggle
- Add localStorage persistence
- Add CSS variables for theme colors

## Testing
- Tested toggle in Chrome, Firefox, Safari
- Verified dark mode applies correctly
- Verified preference persists on reload

Closes #123
```

The `Closes #123` automatically links the PR to issue #123 and closes it when merged.

## Draft pull requests

A draft PR signals work-in-progress. Useful for:
- Getting early feedback
- Sharing work-in-progress
- Waiting for dependencies

Draft PRs typically don't require approvals but automated checks still run.

## Merge options

GitHub offers three strategies:

1. **Merge commit**: Creates a merge commit (keeps full history)
2. **Squash and merge**: Combines all commits into one (cleaner main history)
3. **Rebase and merge**: Replays commits on top of main (linear history)

Most projects choose squash and merge or merge commit.

## Common mistakes

- Writing vague PR descriptions. Be specific so reviewers understand.
- Pushing fixes without re-running tests. Always test before pushing.
- Merging without waiting for automated checks. Checks catch bugs.
- Creating huge PRs. Keep PRs focused on one feature or bug.

## Quick recap

- A PR proposes changes and enables code review before merging.
- Flow: create branch, commit, push, open PR, review, approve, merge, delete branch.
- Write clear descriptions explaining what, why, and how.
- Automated checks run; fix failures and push again.
- Draft PRs mark work-in-progress and don't require approvals.
- Choose a merge strategy: merge commit, squash, or rebase.
