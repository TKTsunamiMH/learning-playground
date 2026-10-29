---
term: Index
fullName: Database Index
category: Databases
tags: [database, performance, sql]
date: 2026-10-29
---

## In short
An index is a database structure that speeds up lookups on selected columns.

## What it means for a .NET Full Stack developer
Indexes can greatly improve API response time for common filters and joins.  
They also have tradeoffs, such as extra storage and slower writes.  
You should profile real query patterns before adding many indexes.

## Example
```sql
CREATE INDEX IX_Users_Email ON Users (Email);
```

## Related terms
- [SQL](/glossary/sql)
- [Primary Key / Foreign Key](/glossary/primary-key-foreign-key)
- [EF Core](/glossary/ef-core)

