---
title: Terminal Files and Folders
topic: Terminal
tags: [terminal, cli, files, folders, mkdir, cp, mv, rm, cat, type]
date: 2026-10-16
---

# Terminal Files and Folders

Creating, moving, copying, and deleting files and folders is one of the most common terminal tasks. Learn these commands to manage your project files and data without leaving the command line.

## Core file and folder commands

| Task | Windows (PowerShell) | macOS/Linux |
|------|----------------------|-------------|
| Create folder | `mkdir folder-name` | `mkdir folder-name` |
| Create empty file | `New-Item -Name file.txt -ItemType File` | `touch file.txt` |
| Copy file | `copy source.txt dest.txt` | `cp source.txt dest.txt` |
| Copy folder | `copy folder\ newfolder\ -Recurse` | `cp -r folder newfolder` |
| Move/rename | `move old.txt new.txt` | `mv old.txt new.txt` |
| Delete file | `del file.txt` | `rm file.txt` |
| Delete folder (empty) | `rmdir folder` | `rmdir folder` |
| Delete folder (with contents) | `rmdir folder /s` | `rm -r folder` |
| Show file contents | `type file.txt` | `cat file.txt` |

### Examples

**Windows (PowerShell):**
```powershell
# Create a new folder
mkdir my-project

# Create an empty file
New-Item -Name notes.txt -ItemType File

# Copy a file
copy original.txt backup.txt

# Move/rename a file
move notes.txt my-notes.txt

# Delete a file
del notes.txt

# Show file contents
type readme.md

# Delete an empty folder
rmdir my-old-folder

# Delete a folder with stuff in it
rmdir my-project /s
```

**macOS/Linux:**
```bash
# Create a new folder
mkdir my-project

# Create an empty file
touch notes.txt

# Copy a file
cp original.txt backup.txt

# Copy a folder
cp -r my-project my-project-backup

# Move/rename a file
mv notes.txt my-notes.txt

# Delete a file
rm notes.txt

# Show file contents
cat readme.md

# Delete an empty folder
rmdir my-old-folder

# Delete a folder with stuff in it
rm -r my-project
```

## File paths with spaces

If a file or folder name has spaces, wrap it in quotes:

```bash
mkdir "My Documents"
touch "my file.txt"
cat "My Documents/notes.txt"
```

## ⚠️ **Warning: Deletion is permanent**

- When you delete with `rm` or `del` from the terminal, the file does **not** go to Trash—it's gone for good.
- Always double-check your command before pressing Enter.
- Consider using `rm -i` (interactive) to confirm each deletion, or `rm -v` (verbose) to see what you're deleting.

```bash
# Safer: asks before deleting
rm -i file.txt

# Shows what it's deleting
rm -v file.txt
```

## Common mistakes

- Typing `rm -r /` or `rm -r C:\` with admin privileges—this can destroy your entire system. **Always** be precise with paths.
- Forgetting to quote file names with spaces, which can delete the wrong file.
- Using `rmdir` on a folder with files in it. Use `rm -r` (bash) or `rmdir /s` (PowerShell) if you want to delete everything inside.

## Quick recap

- `mkdir` creates folders; `touch` / `New-Item` creates empty files.
- `cp` / `copy` copies files; `cp -r` / `copy -Recurse` copies folders.
- `mv` / `move` renames or moves files.
- `rm` / `del` deletes files; `rm -r` / `rmdir /s` deletes folders.
- `cat` / `type` shows file contents.
- **Always be careful with deletion**—use `rm -i` to confirm before deleting.
- Quote names with spaces: `"My Documents"`.
