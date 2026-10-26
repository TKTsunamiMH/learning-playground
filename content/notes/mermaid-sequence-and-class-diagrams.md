---
title: Mermaid Sequence and Class Diagrams
topic: Markdown & Mermaid
tags: [mermaid, sequence, class, diagrams]
date: 2026-10-26
---

# Mermaid Sequence and Class Diagrams

Sequence diagrams show interactions between participants over time, perfect for documenting APIs or multi-actor workflows. Class diagrams visualize object-oriented structures, including classes, properties, and relationships. Both diagram types help communicate system design clearly.

## Sequence diagrams

Show how different actors exchange messages in order.

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server
    
    User->>Browser: Click button
    Browser->>Server: Send request
    Server->>Server: Process data
    Server-->>Browser: Return response
    Browser->>User: Display result
```

### Sequence diagram elements

- **Participants**: the actors in the sequence (user, service, database, etc.)
- **Messages**: interactions between participants
  - `->` solid arrow (call)
  - `-->` dashed arrow (return)
  - `>>` self-call (message to self)
- **Notes**: explanatory text

### Adding notes and actors

```mermaid
sequenceDiagram
    actor User
    participant API
    participant DB
    
    User->>API: Login request
    activate API
    API->>DB: Query user
    activate DB
    DB-->>API: User record
    deactivate DB
    API-->>User: JWT token
    deactivate API
    
    Note over User,API: User is now authenticated
```

## Class diagrams

Show the structure of classes and their relationships.

```mermaid
classDiagram
    class Animal {
        +name: String
        +age: int
        +makeSound()
    }
    
    class Dog {
        +breed: String
        +bark()
    }
    
    class Cat {
        +color: String
        +meow()
    }
    
    Animal <|-- Dog
    Animal <|-- Cat
```

### Class relationships

- `<|--` inheritance (is-a)
- `*--` composition (has-a, owns)
- `o--` aggregation (has-a, shared)
- `-->` association (uses)

### Complete class example

```mermaid
classDiagram
    class Person {
        -name: String
        -email: String
        +getName() String
        +setEmail(email: String)
    }
    
    class Employee {
        -employeeId: int
        -salary: float
        +getEmployeeId() int
        +calculateBonus() float
    }
    
    class Manager {
        -department: String
        -team: Employee[]
        +manageDepartment()
        +reviewEmployee()
    }
    
    Person <|-- Employee
    Employee <|-- Manager
    Manager "1" *-- "many" Employee
```

Symbols:
- `+` public
- `-` private
- `#` protected
- `~` package

## Common mistakes

- Forgetting to list participants in sequence diagrams; they must be declared first.
- Confusing relationship arrows; `<|--` means inheritance, not composition.
- Placing long class names or methods without line breaks, making the diagram hard to read.

## Quick recap

- Sequence: participants, messages, interactions over time
- Messages: `->` solid, `-->` dashed, `>>` self
- Activation: `activate` and `deactivate` show process duration
- Class relationships: `<|--` inherit, `*--` compose, `o--` aggregate
- Visibility: `+` public, `-` private, `#` protected
