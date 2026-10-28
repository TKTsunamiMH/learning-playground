---
title: Commits and Git History
topic: Git
tags: [git, commit, history, log, diff, messages]
date: 2026-10-28
---

# Commits and Git History

A commit is a snapshot of your code at a specific moment. Understanding how to write clear commits, review history, and examine changes is essential to working with Git effectively.

## What makes a good commit message?

A commit message should be concise yet descriptive. The first line is the summary (50 characters or less); if you need more detail, leave a blank line and add a body.

**Good commit messages:**
```
Fix authentication timeout in login modal

The login modal was timing out after 30 seconds due to a race condition
in the async validation. Increased timeout to 60 seconds and added retry logic.
```

**Bad commit messages:**
```
fix stuff
updated files
work in progress
```

Aim for messages that answer "what changed and why," not just "what."

## Small commits vs. large commits

Prefer small, focused commits over one giant commit.

**Small commits (good):**
- Easier to review
- Easier to understand the history
- Easier to revert if something goes wrong
- Make `git bisect` (finding where a bug was introduced) faster

```bash
git commit -m "Add password validation component"
git commit -m "Update login form to use new validator"
git commit -m "Fix validation error message layout"
```

**Large commits (avoid):**
- Hard to review
- Mixes unrelated changes
- If you need to revert one part, you revert everything

If you find yourself committing "multiple things," split them into separate commits.

## Viewing history with git log

`git log` shows your commit history in reverse chronological order (newest first).

```bash
# Show commit history
git log

# Show last 5 commits
git log -5

# Show one-line summary per commit
git log --oneline

# Show commits with their changes
git log -p

# Show commits by a specific author
git log --author="Alice"

# Show commits since a certain date
git log --since="2024-01-01"
```

## Viewing changes with git diff

`git diff` shows the differences between versions of files.

```bash
# Show unstaged changes
git diff

# Show staged changes
git diff --staged

# Show changes in a specific commit
git diff <commit-hash>~1 <commit-hash>

# Show changes between two commits
git diff <old-commit> <new-commit>

# Show changes in a specific file
git diff path/to/file.js
```

## The commit workflow

Here's the typical flow:

1. Edit files in your working directory
2. Run `git status` to see what changed
3. Run `git diff` to review your changes
4. Run `git add <file>` to stage changes
5. Run `git commit -m "message"` to save a snapshot

## Common mistakes

- Writing commit messages in the past tense ("Fixed bug") instead of imperative ("Fix bug"). Most projects use imperative for consistency.
- Committing unrelated changes together. If you do this by accident, use `git reset HEAD~1` to undo the commit and re-stage files selectively.
- Not reviewing changes before committing. Always run `git diff` or use your editor's Git integration to check what you're about to commit.

## Quick recap

- Commit messages should be clear and concise: summary line, then (optionally) a blank line and body.
- Small, focused commits are easier to review and understand.
- `git log` shows your project's history; `git log --oneline` for a quick overview.
- `git diff` shows changes before you commit; `git diff --staged` shows what's staged.
- Use `git log` and `git diff` to understand what changed and why before reviewing or merging.
