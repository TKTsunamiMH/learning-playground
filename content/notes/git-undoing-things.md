---
title: Undoing Changes in Git
topic: Git
tags: [git, undo, revert, reset, amend, discard]
date: 2026-10-28
---

# Undoing Changes in Git

Everyone makes mistakes. Git gives you several ways to undo changes safely.

## Discard changes in working directory

If you edited a file but haven't staged it:

```bash
# Discard changes in a single file
git restore path/to/file.js

# Discard changes in all files (careful!)
git restore .

# Old syntax (still works)
git checkout -- path/to/file.js
```

## Unstage a file

If you staged a file but don't want to commit it:

```bash
# Unstage a file
git restore --staged path/to/file.js

# Unstage all files
git restore --staged .

# Old syntax
git reset HEAD path/to/file.js
```

## Amend the last commit

If you made a commit but forgot to include a file or made a typo:

```bash
# Add another file and amend the last commit
git add path/to/forgotten-file.js
git commit --amend

# Edit the message in your editor

# Or provide a new message directly
git commit --amend -m "New commit message"

# Don't change author or timestamp
git commit --amend --no-edit
```

Don't amend if you've already pushed—use `git revert` instead.

## Revert vs. Reset

### Revert (safe, adds a new commit)

`git revert` creates a new commit that undoes a previous commit. The original commit stays in history.

```bash
# Revert a specific commit
git revert a1b2c3d
```

**Use when:**
- You want to undo a change but keep it in history
- The commit has already been pushed
- Working with a team

### Reset (dangerous, rewrites history)

`git reset` moves your branch pointer backward.

```bash
# Soft reset: undo commit but keep changes staged
git reset --soft HEAD~1

# Mixed reset: undo commit and unstage changes
git reset HEAD~1

# Hard reset: discard everything (dangerous!)
git reset --hard HEAD~1
```

**Use only when:**
- You haven't pushed yet
- You're sure you want to undo it

## Recovering from git reset --hard

If you accidentally ran `git reset --hard`:

```bash
# Find your commits in the reflog
git reflog

# Restore your work
git reset --hard e5f6g7h
```

The reflog keeps records for about 30 days.

## Undo methods comparison

| Situation | Command | Safe |
|-----------|---------|------|
| Discard unsaved edits | `git restore` | Yes |
| Remove staged files | `git restore --staged` | Yes |
| Fix last commit message | `git commit --amend` | Yes (before push) |
| Undo a pushed commit | `git revert` | Yes |
| Undo unpushed commits | `git reset --soft` | Yes |
| Remove unpushed commits | `git reset --hard` | No |

## Safe practices

- Always pull before starting work
- Never force-push to `main`
- Commit frequently for checkpoints
- Test before committing
- Ask for help before forcing anything to GitHub

## Common mistakes

- Using `git reset --hard` without understanding it's destructive.
- Force-pushing to main. Use `git revert` for pushed commits instead.
- Amending after pushing and struggling to sync.

## Quick recap

- `git restore` discards unsaved changes.
- `git restore --staged` unstages files.
- `git commit --amend` fixes the last commit (before pushing).
- `git revert` undoes a commit safely (safe for pushed commits).
- `git reset --soft` undoes a commit but keeps changes.
- `git reset --hard` discards commits and changes (dangerous).
- Use `git reflog` to recover from `reset --hard`.
