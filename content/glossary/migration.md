---
term: Migration
fullName: Database Migration
category: Databases
tags: [database, ef-core, schema]
date: 2026-10-29
---

## In short
A migration is a versioned change to a database schema tracked in source control.

## What it means for a .NET Full Stack developer
With EF Core, migrations add or modify tables and columns as your models evolve.  
Migrations should be reviewed like code to prevent production data issues.  
They are often applied automatically in deployment pipelines.

## Example
```bash
dotnet ef migrations add AddOrdersTable
```

## Related terms
- [EF Core](/glossary/ef-core)
- [CI/CD](/glossary/ci-cd)
- [SQL](/glossary/sql)

