---
title: Terminal Tips and Shortcuts
topic: Terminal
tags: [terminal, cli, shortcuts, tips, tricks, history, powershell, bash]
date: 2026-10-16
---

# Terminal Tips and Shortcuts

Master these shortcuts and tricks to work faster in the terminal and understand the different shells available on your system.

## Essential shortcuts

| Shortcut | Purpose |
|----------|---------|
| `Ctrl+C` | Stop the currently running command |
| `Ctrl+L` (bash/zsh) or `cls` (PowerShell) | Clear the screen |
| `↑` / `↓` Arrow keys | Navigate through command history |
| `Ctrl+R` | Search through history (bash/zsh) |
| `Tab` | Autocomplete file/folder names |
| `Ctrl+A` | Jump to the start of the line |
| `Ctrl+E` | Jump to the end of the line |
| `Ctrl+U` | Delete from cursor to start of line |

### Examples

**Stop a running server:**
```bash
# Start a dev server
npm run dev

# Press Ctrl+C to stop it
(Ctrl+C)
```

**Use arrow keys to repeat commands:**
```bash
# Run a command
npm run build

# Press ↑ to go back and re-run it
(press ↑)
# npm run build (appears again)
```

**Search history (bash/zsh):**
```bash
# Start reverse history search
Ctrl+R

# Type part of a previous command
git push

# Press Enter to run the matched command
```

## VS Code integrated terminal

You can run terminal commands directly inside VS Code:

- **Open terminal**: `Ctrl+`` (backtick) or `Ctrl+Shift+`` for a new one.
- **Split terminal**: `Ctrl+Shift+5`.
- **Close terminal**: `Ctrl+Shift+X` or click the X.
- **Focus terminal**: `Ctrl+J` toggles the panel.

Run commands like `npm run dev` or `dotnet run` without leaving your editor.

## Opening a folder with "code ."

The `code` command opens VS Code from the terminal:

```bash
# Open current folder in VS Code
code .

# Open a specific folder
code ~/Projects/my-app

# Open the current folder and go to a file at a line
code -g src/App.tsx:42
```

This is super useful for jumping between terminal and editor.

## Shells: PowerShell vs. bash vs. Git Bash

**Windows PowerShell:**
- Built into Windows, uses `ps1` syntax.
- Modern features: objects, pipelines, strong scripting.
- Use `cls` to clear, `del` to delete, `dir` to list.
- Recommended for .NET and Windows work.

**bash (macOS/Linux default):**
- Industry standard on Unix-like systems.
- Simple, text-based, very portable.
- Use `clear` to clear, `rm` to delete, `ls` to list.
- Default on macOS and most Linux distros.

**Git Bash (Windows):**
- A bash emulation for Windows (comes with Git for Windows).
- Lets you use bash commands on Windows.
- Great if you're comfortable with bash and work cross-platform.
- Slower than native PowerShell on Windows.

### Comparing command differences

| Task | PowerShell | bash | Git Bash |
|------|-----------|------|----------|
| Clear screen | `cls` | `clear` | `clear` |
| List files | `dir` | `ls` | `ls` |
| Delete file | `del file.txt` | `rm file.txt` | `rm file.txt` |
| Show path | `$PWD` | `pwd` | `pwd` |
| Go home | `cd ~` | `cd ~` | `cd ~` |

## Running background commands

Sometimes you want a command to keep running while you do something else:

```bash
# Start a dev server in the background (bash/macOS/Linux)
npm run dev &

# Then run other commands
git status

# Bring it back to foreground
fg
```

In VS Code's integrated terminal, just open a new split instead of using background mode.

## Common mistakes

- Forgetting that `Ctrl+C` stops the current process—you can't undo it easily.
- Not clearing the screen often, making it hard to see what's new vs. old output.
- Mixing PowerShell and bash commands on Windows (e.g., using `ls` in PowerShell when `dir` is the native command).
- Closing the terminal without saving important output (copy-paste to a text file if needed).

## Quick recap

- **Ctrl+C** stops a command; **Ctrl+L** / **cls** clears the screen.
- Use **↑** / **↓** to navigate history; **Tab** for autocomplete.
- `code .` opens VS Code from the terminal.
- Use **VS Code's integrated terminal** to run commands without leaving your editor.
- Pick a shell: **PowerShell** for Windows/.NET, **bash** for macOS/Linux, **Git Bash** for cross-platform on Windows.
- **Split the terminal** (`Ctrl+Shift+5` in VS Code) instead of backgrounding jobs.
