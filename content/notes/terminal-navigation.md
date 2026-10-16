---
title: Terminal Navigation
topic: Terminal
tags: [terminal, cli, navigation, pwd, cd, ls, dir]
date: 2026-10-16
---

# Terminal Navigation

The command line is how you move around your computer's file system using text commands. Every time you open a terminal, you're "in" some folder (directory). Learn these basic commands to navigate like a pro and understand the difference between absolute and relative paths.

## Core navigation commands

| Task | Windows (PowerShell) | macOS/Linux |
|------|----------------------|-------------|
| Show current folder | `cd` or `pwd` | `pwd` |
| List folder contents | `dir` | `ls` |
| Go to home folder | `cd $PROFILE` or `cd ~` | `cd ~` |
| Go back one level | `cd ..` | `cd ..` |
| Go to specific folder | `cd path\to\folder` | `cd path/to/folder` |
| Go to root (Windows drive) | `cd /d C:\` | `cd /` |
| Clear screen | `cls` | `clear` or `Ctrl+L` |

### Examples

**Windows (PowerShell):**
```powershell
# Show where you are
cd

# Go to the Documents folder
cd Documents

# Go up one level
cd ..

# Go back to root of C: drive
cd /d C:\

# List everything in current folder
dir

# Clear the screen
cls
```

**macOS/Linux:**
```bash
# Show where you are
pwd

# Go to the Documents folder
cd Documents

# Go up one level
cd ..

# Go back to root
cd /

# List everything in current folder
ls

# Clear the screen
clear
```

## Paths: Absolute vs. Relative

- **Absolute path**: starts from the root (e.g., `/Users/alice/Documents` or `C:\Users\alice\Documents`). It works no matter where you are.
- **Relative path**: starts from your current folder (e.g., `Documents/notes` if you're in `/Users/alice`). Use `..` to go up one level.

```powershell
# Absolute: always works from anywhere
cd C:\Users\alice\Projects

# Relative: only works if you're in the right place
cd Projects
cd ../Documents
```

## Tab completion

Press **Tab** while typing a file or folder name to autocomplete. If multiple matches exist, press Tab again to cycle through them. This saves typing and prevents mistakes.

```bash
# Type this:
cd Doc

# Press Tab, and it becomes:
cd Documents/
```

## Common mistakes

- Forgetting that paths are case-sensitive on macOS and Linux (but not Windows).
- Using forward slashes (`/`) on Windows when you need backslashes (`\`), though modern PowerShell accepts both.
- Typing `cd` into a subfolder without using the right path separator or relative prefix (e.g., writing `cd Documents` when you're somewhere else entirely).

## Quick recap

- `pwd` / `cd` shows your current location.
- `ls` / `dir` lists folder contents.
- `cd folder-name` enters a folder; `cd ..` goes up one level.
- Absolute paths start from the root; relative paths start from where you are now.
- Use Tab to autocomplete file and folder names.
- `clear` / `cls` clears the screen clutter.
