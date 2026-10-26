---
title: Mermaid Cheatsheet
topic: Markdown & Mermaid
tags: [mermaid, cheatsheet, diagrams, reference]
date: 2026-10-26
---

# Mermaid Cheatsheet

Quick reference for Mermaid diagram syntax and common examples.

## Basic syntax

All Mermaid diagrams start with a diagram type in a code block:

```markdown
\`\`\`mermaid
graph TD
    A[Node]
\`\`\`
```

## Flowcharts

| Syntax | Node shape |
|--------|-----------|
| `[text]` | Rectangle |
| `(text)` | Rounded |
| `{text}` | Diamond |
| `([text])` | Stadium |
| `[[text]]` | Subroutine |
| `[/text/]` | Parallelogram |

Directions: `TD` (top-down), `LR` (left-right), `BT`, `RL`

Example:

```mermaid
graph LR
    A[Start] -->|Yes| B[Process]
    A -->|No| C[Skip]
    B --> D{Done?}
    D -->|Yes| E[End]
    D -->|No| B
```

## Sequence diagrams

```mermaid
sequenceDiagram
    participant A as User
    participant B as Server
    A->>B: Request
    activate B
    B-->>A: Response
    deactivate B
```

| Element | Purpose |
|---------|---------|
| `participant Name` | Define actor |
| `->` | Solid arrow (call) |
| `-->` | Dashed arrow (return) |
| `activate` / `deactivate` | Show processing |
| `Note over X,Y: text` | Add note |

## Class diagrams

```mermaid
classDiagram
    class Animal {
        +name: String
        +makeSound()
    }
    class Dog {
        +breed: String
    }
    Animal <|-- Dog
```

| Symbol | Meaning |
|--------|---------|
| `<\|--` | Inheritance |
| `*--` | Composition |
| `o--` | Aggregation |
| `-->` | Association |
| `+` | Public |
| `-` | Private |
| `#` | Protected |

## State diagrams

```mermaid
stateDiagram-v2
    [*] --> Active
    Active --> Paused: pause
    Paused --> Active: resume
    Active --> [*]: end
```

## ER diagrams (databases)

```mermaid
erDiagram
    USERS ||--o{ POSTS : creates
    USERS {
        int id PK
        string name
    }
    POSTS {
        int id PK
        int user_id FK
    }
```

| Symbol | Meaning |
|--------|---------|
| `\|\|` | One (required) |
| `o\|` | One (optional) |
| `\|\{` | Many (required) |
| `o{` | Many (optional) |
| `PK` | Primary key |
| `FK` | Foreign key |

## Gantt charts

```mermaid
gantt
    title Timeline
    dateFormat YYYY-MM-DD
    section Phase
    Task1 :t1, 2026-10-01, 7d
    Task2 :t2, after t1, 10d
```

## Pie charts

```mermaid
pie title Distribution
    "A" : 30
    "B" : 25
    "C" : 45
```

## Common connection types

| Syntax | Result |
|--------|--------|
| `A --> B` | Arrow |
| `A --- B` | Line |
| `A -.-> B` | Dotted |
| `A ==> B` | Thick |
| `A --|text\| B` | With label |

## Tips

- Keep node IDs short and use underscores (no spaces)
- Use `subgraph` to group related nodes
- Add `style nodeId fill:#color` to customize appearance
- Test complex diagrams incrementally
