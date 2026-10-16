---
title: Terminal npm Basics
topic: Terminal
tags: [terminal, cli, npm, node, package, dependencies, build]
date: 2026-10-16
---

# Terminal npm Basics

npm (Node Package Manager) is how you install libraries, manage dependencies, and run build scripts in Node.js and JavaScript projects. Most modern web projects start with `npm` commands in the terminal.

## Core npm commands

| Command | Purpose |
|---------|---------|
| `npm init` | Create a new `package.json` file |
| `npm install` (or `npm i`) | Install dependencies listed in `package.json` |
| `npm install <package>` | Install a specific package |
| `npm install -D <package>` | Install as a dev dependency (tools, not runtime) |
| `npm run <script>` | Run a script defined in `package.json` |
| `npm run dev` | Start a development server (if configured) |
| `npm run build` | Build your project for production (if configured) |
| `npx <command>` | Run a package without installing it globally |

## What are `package.json` and `node_modules`?

- **`package.json`**: A manifest that lists your project's dependencies and build scripts. It's like a recipe for your project.
- **`node_modules`**: A folder that contains all installed packages. It's usually large and should be ignored in version control (add to `.gitignore`).

### Example `package.json`

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "vitest"
  },
  "dependencies": {
    "react": "^18.0.0"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```

## Common workflows

**Starting a new project:**
```bash
# Create a new folder
mkdir my-app
cd my-app

# Initialize npm
npm init -y

# Install a package
npm install react
```

**Working on an existing project:**
```bash
# Clone the repo
git clone <url>
cd project-name

# Install all dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

**Installing packages:**
```bash
# Install as a runtime dependency (your app needs it)
npm install express

# Install as a dev dependency (only for development)
npm install -D prettier

# Install a specific version
npm install react@18.0.0
```

## `npx`: Run without installing

`npx` runs a package without installing it globally or adding it to your project:

```bash
# Create a React app with Create React App (doesn't install it)
npx create-react-app my-app

# Run a utility
npx prettier src/App.jsx --write
```

## Common mistakes

- Deleting `node_modules` without understanding that `npm install` recreates it. Use `npm install` to restore it, not by copying it.
- Committing `node_modules` to Git. Always add it to `.gitignore`.
- Running `npm run build` before installing dependencies, or forgetting to run it before deploying.

## Quick recap

- `npm init` creates a new project.
- `npm install` installs dependencies listed in `package.json`.
- `npm run <script>` runs build or dev scripts.
- `npm run dev` starts development; `npm run build` builds for production.
- `npx` runs a package without installing it.
- `package.json` lists your dependencies; `node_modules` stores them.
- Never commit `node_modules` to Git.
