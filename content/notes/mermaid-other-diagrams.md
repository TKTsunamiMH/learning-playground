---
title: Mermaid Other Diagrams
topic: Markdown & Mermaid
tags: [mermaid, state, er, gantt, pie, diagrams]
date: 2026-10-26
---

# Mermaid Other Diagrams

Beyond flowcharts and sequences, Mermaid supports entity-relationship diagrams for databases, state diagrams for machines and workflows, Gantt charts for project planning, and pie charts for data visualization. Each diagram type excels at communicating a specific kind of information.

## Entity-Relationship (ER) diagrams

Show database tables, columns, and relationships.

```mermaid
erDiagram
    USERS ||--o{ POSTS : creates
    USERS ||--o{ COMMENTS : makes
    POSTS ||--o{ COMMENTS : receives
    
    USERS {
        int id PK
        string email UK
        string username
        datetime created_at
    }
    
    POSTS {
        int id PK
        int user_id FK
        string title
        string content
        datetime published_at
    }
    
    COMMENTS {
        int id PK
        int post_id FK
        int user_id FK
        string text
        datetime created_at
    }
```

Relationship symbols:
- `|o` one (optional)
- `||` one (required)
- `o{` many (optional)
- `|{` many (required)

## State diagrams

Visualize states and transitions in systems or workflows.

```mermaid
stateDiagram-v2
    [*] --> Idle
    
    Idle --> Loading: request sent
    Loading --> Success: data received
    Loading --> Error: timeout or failure
    
    Success --> Idle: user navigates
    Error --> Idle: user retries
    
    Success --> [*]
    Error --> [*]
```

## Gantt charts

Display project timelines with tasks and milestones.

```mermaid
gantt
    title Project Timeline
    dateFormat YYYY-MM-DD
    
    section Planning
    Requirements :req, 2026-10-01, 14d
    Design :des, after req, 21d
    
    section Development
    Backend :back, 2026-10-22, 30d
    Frontend :front, after back, 25d
    
    section Testing
    QA :qa, after front, 14d
    
    section Deployment
    Release :rel, after qa, 7d
    Milestone :milestone, rel, 1d
```

## Pie charts

Show proportions of a whole.

```mermaid
pie title Project Time Distribution
    "Development" : 40
    "Testing" : 25
    "Documentation" : 20
    "Planning" : 15
```

## Common mistakes

- Using the wrong relationship symbols in ER diagrams; `||--o{` means one-to-many, not many-to-one.
- Gantt chart dates without the correct format; specify `dateFormat` clearly.
- Pie chart values that don't represent proportions meaningfully; consider what totals 100%.

## Quick recap

- ER diagrams: define entities, attributes, and relationships (PK = primary key, FK = foreign key)
- State diagrams: states and transitions, `[*]` for start/end
- Gantt: tasks with dates, dependencies, and milestones
- Pie charts: simple key-value pairs for proportions
