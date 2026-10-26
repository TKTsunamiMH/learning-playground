---
title: Mermaid Flowcharts
topic: Markdown & Mermaid
tags: [mermaid, flowcharts, diagrams]
date: 2026-10-26
---

# Mermaid Flowcharts

Flowcharts visualize processes, workflows, and decision trees. They show how actions flow from one step to the next, with branches for different outcomes. Mermaid makes it easy to draw flowcharts with a few lines of text.

## Basic nodes and shapes

Nodes represent steps or decisions. Different shapes convey different meanings:

```markdown
graph TD
    A[Rectangle]
    B(Rounded)
    C{Diamond}
    D([Stadium])
    E[[Subroutine]]
    F[/Parallelogram/]
```

Rendered:

```mermaid
graph TD
    A[Rectangle]
    B(Rounded)
    C{Diamond}
    D([Stadium])
    E[[Subroutine]]
    F[/Parallelogram/]
```

## Arrows and labels

Connect nodes with arrows. Add labels on arrows with pipes or square brackets.

```mermaid
graph TD
    A[Start] --> B[Process]
    B --> C{Decision}
    C -->|Yes| D[End]
    C -->|No| E[Retry]
```

## Subgraphs

Group related nodes in subgraphs to organize complex diagrams.

```mermaid
graph TD
    subgraph Input["User Input"]
        A[Form]
        B[Submit]
    end
    subgraph Processing["Process"]
        C[Validate]
        D[Save]
    end
    A --> B --> C --> D
```

## A complete workflow example

Here's a real-world example: a user registration flow.

```mermaid
graph TD
    Start([User visits page]) --> SignUp[Sign up form]
    SignUp --> EnterEmail[Enter email]
    EnterEmail --> Validate{Email valid?}
    Validate -->|No| Error[Show error]
    Error --> EnterEmail
    Validate -->|Yes| CreateAccount[Create account]
    CreateAccount --> SendEmail[Send verification]
    SendEmail --> CheckEmail{Email confirmed?}
    CheckEmail -->|No| Resend[Offer resend]
    Resend --> CheckEmail
    CheckEmail -->|Yes| Success([Registration complete])
```

## Styling nodes

Use `style` to customize node appearance (background, text color, stroke).

```mermaid
graph TD
    A[Start] --> B[Process]
    B --> C{Success?}
    C -->|Yes| D[End]
    C -->|No| E[Error]
    
    style A fill:#90EE90
    style D fill:#90EE90
    style E fill:#FFB6C6
```

## Common mistakes

- Using invalid node IDs (spaces, special characters); use underscores or numbers.
- Forgetting arrow syntax; `A B` won't connect, but `A --> B` will.
- Mixing node shapes in ways that confuse the diagram's purpose; use consistent shapes for similar steps.

## Quick recap

- Rectangles `[]`, rounded `()`, diamonds `{}` for decisions
- Connect with `-->`, `<-->`, or `---`
- Add labels with `-->|label|` syntax
- Group with `subgraph`
- Style nodes with `style nodeId fill:#color`
