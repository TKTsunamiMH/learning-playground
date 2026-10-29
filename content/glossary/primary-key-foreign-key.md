---
term: Primary Key / Foreign Key
fullName: Primary Key and Foreign Key
category: Databases
tags: [database, relationships, sql]
date: 2026-10-29
---

## In short
A primary key uniquely identifies a row, and a foreign key links rows between related tables.

## What it means for a .NET Full Stack developer
These keys define relationships that EF Core maps as navigation properties.  
They help enforce data integrity and prevent orphaned records.  
Good key design improves query clarity and relational consistency.

## Example
Scenario: `Orders.CustomerId` references `Customers.Id`.

## Related terms
- [SQL](/glossary/sql)
- [EF Core](/glossary/ef-core)
- [ORM](/glossary/orm)
