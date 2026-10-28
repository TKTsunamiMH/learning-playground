---
title: Merging and Handling Conflicts
topic: Git
tags: [git, merge, conflicts, resolution, rebase]
date: 2026-10-28
---

# Merging and Handling Conflicts

Merging integrates changes from one branch into another. Most of the time, Git handles merges automatically. But when both branches change the same lines, you get a merge conflict that you must resolve manually.

## Merge vs. Fast-forward merge

When you merge a branch into main, Git tries to combine the changes. There are two common scenarios:

**Fast-forward merge:** If main hasn't changed since you created your branch, Git simply moves the main pointer forward.

**Three-way merge:** If main and your branch both have new commits, Git creates a merge commit combining both lines.

## What is a merge conflict?

A merge conflict occurs when Git can't automatically combine changes because both branches modified the same lines. Git marks conflicts with markers:

```javascript
function greet() {
<<<<<<< HEAD
  return "Hello from main branch";
=======
  return "Hi from feature branch";
>>>>>>> feature/greeting
}
```

- `<<<<<<< HEAD` marks your current branch's version
- `=======` separates the two versions
- `>>>>>>> feature/greeting` marks the incoming branch

## Step-by-step conflict resolution

1. **Identify conflicting files**: Run `git status` to see conflicts
2. **Open the file** and examine conflicts
3. **Decide which version to keep**: Your version, theirs, both, or a combination
4. **Remove the conflict markers**: Delete the `<<<<<<<`, `=======`, and `>>>>>>>` lines
5. **Stage the resolved file**: `git add path/to/file.js`
6. **Complete the merge**: `git commit -m "Merge feature/greeting into main"`

## Resolving conflicts in VS Code

VS Code provides visual conflict resolution:

1. Open the conflicted file
2. Look for code lens buttons: "Accept Current Change", "Accept Incoming Change", "Accept Both Changes"
3. Click one to resolve
4. Save the file
5. Run `git add .` and `git commit` in the terminal

## How to avoid conflicts

- **Pull before you start** - Always run `git pull` at the start of your day
- **Keep branches short-lived** - Merge and delete branches quickly
- **Communicate with your team** - If working on the same file, coordinate
- **Keep changes focused** - Large branches touching many files are more likely to conflict
- **Use feature flags** - Hide incomplete features behind flags

## Aborting a merge

If something goes wrong, abort the merge:

```bash
git merge --abort
```

This cancels the merge and returns to your branch's previous state.

## Common mistakes

- Resolving conflicts incorrectly (keeping broken code). Always review resolved code.
- Not testing after resolving conflicts. Run tests before committing.
- Deleting one person's changes accidentally. Take time to merge thoughtfully.

## Quick recap

- A merge integrates one branch into another.
- Conflicts happen when both branches modify the same lines.
- Git marks conflicts with `<<<<<<<`, `=======`, `>>>>>>>`.
- To resolve: open file, keep desired version, remove markers, stage, commit.
- VS Code provides visual conflict resolution.
- Avoid conflicts by pulling frequently and keeping branches short-lived.
