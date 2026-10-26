---
title: Markdown for GitHub
topic: Markdown & Mermaid
tags: [markdown, github, readme]
date: 2026-10-26
---

# Markdown for GitHub

GitHub renders Markdown everywhere: README files, issues, pull requests, discussions, and wikis. GitHub-flavored Markdown (GFM) extends standard Markdown with features like task lists, tables, strikethrough, and emoji support. Knowing these extras helps you write clear, structured documentation on the platform.

## README structure

A good README typically has these sections in order:

```markdown
# Project Name

Brief description of what the project does.

## Features

- Feature one
- Feature two
- Feature three

## Installation

\`\`\`bash
npm install project-name
\`\`\`

## Usage

Basic example of how to use the project.

\`\`\`javascript
const project = require('project-name');
project.doSomething();
\`\`\`

## API Reference

Document functions, parameters, and return values.

## Contributing

How others can contribute to the project.

## License

License information.
```

## GitHub-flavored extras

### Strikethrough

Use `~~text~~` to strike through text.

```markdown
~~Old approach~~ New and better approach
```

### Task lists

Create interactive task lists with `- [ ]` and `- [x]`.

```markdown
- [x] Complete task
- [ ] Pending task
- [ ] Future task
```

### Emoji

Add emoji directly: `:+1:`, `:tada:`, `:bug:`, etc.

```markdown
Great job! :tada:
Found a :bug: in the code.
```

### Mention users and reference issues

Use `@username` to mention someone, `#123` to link to an issue, and `owner/repo#456` for cross-repository references.

```markdown
@alice, can you review this?
Fixes #123
Related to owner/repo#456
```

## Relative links

Link to files relative to the current file for better navigation on GitHub.

```markdown
[See the guide](./docs/guide.md)
[View styles](../src/styles.css)
[Home](../../)
```

## Badge conventions

Use badges to show status, build results, license, etc. Many badge services exist (shields.io, badgen.net).

```markdown
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/user/repo)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-18%2B-blue.svg)](package.json)
```

## Code highlighting in issues and PRs

Use fenced code blocks with language names in GitHub issues and PR descriptions for proper syntax highlighting.

```markdown
Found an error in this code:

\`\`\`javascript
function buggy() {
  return undefined;
}
\`\`\`

Should be:

\`\`\`javascript
function fixed() {
  return 42;
}
\`\`\`
```

## Common mistakes

- Using full URLs for internal links instead of relative paths; GitHub won't navigate correctly.
- Forgetting to update the README when changing API or features.
- Using outdated or broken badge URLs.

## Quick recap

- README: Features, Installation, Usage, API, Contributing, License
- Task lists: `- [x]` checked, `- [ ]` unchecked
- Mentions: `@user`, issues: `#123`, cross-repo: `owner/repo#456`
- Relative links: `[text](./path/to/file.md)`
- Badges: use shields.io or similar services
- Code highlighting: add language after backticks
