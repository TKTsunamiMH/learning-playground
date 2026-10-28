---
title: .gitignore and Repository Hygiene
topic: Git
tags: [git, gitignore, secrets, dependencies, node_modules]
date: 2026-10-28
---

# .gitignore and Repository Hygiene

A `.gitignore` file tells Git which files to ignore. It keeps your repository clean by excluding build artifacts, dependencies, secrets, and other files that shouldn't be committed.

## What is .gitignore?

`.gitignore` is a plain-text file in your repository root that lists patterns for files Git should ignore.

```bash
# Example .gitignore
node_modules/
.env
dist/
.DS_Store
*.log
.vscode/
```

## Why certain files must not be committed

### Dependencies (node_modules, packages)

Never commit dependencies. They're large and can be regenerated:

```bash
# .gitignore
node_modules/
vendor/           # PHP Composer
target/           # Java Maven
.venv/            # Python virtual environment
```

Instead, commit dependency specifications:
- JavaScript: `package.json` and `package-lock.json`
- Python: `requirements.txt`
- Java: `pom.xml`

### Secrets (.env, API keys, credentials)

Never commit files with secrets—API keys, passwords, database credentials.

```bash
# .gitignore
.env
.env.local
.env.*.local
*.key
secrets/
```

**If you accidentally commit a secret:**

1. **Immediately rotate the secret** (regenerate API key, reset password, revoke token)
2. **Remove it from history** (advanced):
   ```bash
   git rm --cached .env
   echo ".env" >> .gitignore
   git commit -m "Remove .env from tracking"
   git push
   ```
3. **Add a `.env.example`** so others know what variables to set

### Build and cache files

Commit source files, not generated output:

```bash
# .gitignore
dist/           # Build output
build/          # Compiler output
.next/          # Next.js output
coverage/       # Test coverage
*.o             # Compiled object files
*.pyc           # Python bytecode
```

## README and LICENSE

**Do commit** these files:

### README.md

Explains your project:
- What it does
- How to set it up
- How to run it
- License information

### LICENSE

Include a license so others know how they can use your code.

## .gitignore patterns

```bash
# Ignore a specific file
.env

# Ignore a directory
node_modules/

# Ignore all .log files
*.log

# Ignore in all directories
**/.DS_Store

# Exception: don't ignore this file
!important.log
```

## Typical .gitignore by project type

**Node.js:**
```
node_modules/
.env*
dist/
build/
*.log
.DS_Store
.vscode/
```

**Python:**
```
venv/
.venv/
__pycache__/
*.pyc
.env
dist/
build/
```

## Checking what Git is ignoring

```bash
# See what Git is ignoring
git status

# Check why a specific file is ignored
git check-ignore -v path/to/file.js

# Force-add a normally-ignored file (careful!)
git add -f .env
```

## Repository hygiene checklist

- `.gitignore` includes dependencies, secrets, and build output
- No `.env` files or API keys in the repository
- `README.md` explains the project
- `LICENSE` file included
- `.gitignore` committed so teammates use the same rules
- Build output and caches ignored
- Large OS-generated files not committed

## Common mistakes

- Committing `.env` files. Add to `.gitignore` before committing.
- Not committing `package-lock.json`. This should be committed.
- Using global `.gitignore` instead of per-repo.
- Ignoring source files you actually need.

## Quick recap

- `.gitignore` tells Git which files to ignore.
- Never commit `node_modules`, `.env`, API keys, or build output.
- If you accidentally commit a secret, rotate it immediately.
- Commit `package.json`, `package-lock.json`, `README.md`, and `LICENSE`.
- Use `.env.example` to show what variables teammates need.
- Good `.gitignore` keeps your repo clean and secure.
