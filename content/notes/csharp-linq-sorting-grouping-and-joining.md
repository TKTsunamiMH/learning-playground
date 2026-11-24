---
title: C# LINQ – Sorting, Grouping, and Joining
topic: C#
tags: [csharp, linq, orderby, groupby, join, groupjoin, zip, union]
date: 2026-11-24
---

# C# LINQ – Sorting, Grouping, and Joining

Sorting arranges data in order. Grouping organizes data by a key. Joining combines data from multiple sources. These operations enable complex data transformations with elegant syntax. See [Sorting](/content/notes/csharp-sorting.md) for details on OrderBy, OrderByDescending, ThenBy, and ThenByDescending—this note builds on that.

## Sorting with OrderBy, OrderByDescending, ThenBy, ThenByDescending

For a refresher on LINQ sorting, see [Sorting Arrays and Lists](/content/notes/csharp-sorting.md). Here's a quick example:

```csharp
using System.Linq;

List<Player> players = new List<Player>
{
    new Player { Name = "Alice", Team = "Red", Score = 100 },
    new Player { Name = "Bob", Team = "Blue", Score = 85 },
    new Player { Name = "Charlie", Team = "Red", Score = 100 }
};

// Sort by score descending, then by name ascending (tiebreaker)
var sorted = players
    .OrderByDescending(p => p.Score)
    .ThenBy(p => p.Name)
    .ToList();

// Alice (100), Charlie (100), Bob (85)
```

## GroupBy: organize by key

Group items by a key, producing an `IGrouping<TKey, TElement>`:

```csharp
// Group players by team
var byTeam = players.GroupBy(p => p.Team).ToList();

foreach (var group in byTeam)
{
    Console.WriteLine($"Team: {group.Key}");
    foreach (var player in group)
    {
        Console.WriteLine($"  {player.Name}: {player.Score}");
    }
}

// Output:
// Team: Red
//   Alice: 100
//   Charlie: 100
// Team: Blue
//   Bob: 85
```

### Counting per group

```csharp
var countPerTeam = players
    .GroupBy(p => p.Team)
    .Select(g => new { Team = g.Key, Count = g.Count() })
    .ToList();

foreach (var item in countPerTeam)
{
    Console.WriteLine($"{item.Team}: {item.Count} players");
}
// Output:
// Red: 2 players
// Blue: 1 player
```

### Group and aggregate

```csharp
var teamStats = players
    .GroupBy(p => p.Team)
    .Select(g => new 
    { 
        Team = g.Key, 
        AverageScore = g.Average(p => p.Score),
        MaxScore = g.Max(p => p.Score)
    })
    .ToList();

foreach (var stat in teamStats)
{
    Console.WriteLine($"{stat.Team}: avg {stat.AverageScore}, max {stat.MaxScore}");
}
// Output:
// Red: avg 100, max 100
// Blue: avg 85, max 85
```

### Grouping by multiple keys

```csharp
// Group by team, then by level
var byTeamAndLevel = players
    .GroupBy(p => new { p.Team, p.Level })
    .ToList();

foreach (var group in byTeamAndLevel)
{
    Console.WriteLine($"Team: {group.Key.Team}, Level: {group.Key.Level}");
    foreach (var player in group)
    {
        Console.WriteLine($"  {player.Name}");
    }
}
```

## ToLookup: fast grouping with index

`ToLookup` is like `GroupBy`, but it creates a dictionary-like structure for fast lookups:

```csharp
var lookup = players.ToLookup(p => p.Team);

// Fast lookup by key
var redTeam = lookup["Red"];  // All red players
Console.WriteLine(redTeam.Count());  // 2
```

Use `ToLookup` when you need repeated fast lookups by key. Use `GroupBy` when you need a grouped sequence.

## ToDictionary: build a dictionary

Convert a sequence into a dictionary:

```csharp
// Key = Name, Value = Score
var byName = players.ToDictionary(p => p.Name, p => p.Score);

Console.WriteLine(byName["Alice"]);  // 100
Console.WriteLine(byName["Bob"]);    // 85
```

### Duplicate key error

If keys are not unique, `ToDictionary` throws `ArgumentException`:

```csharp
// Error: two players named "Alice"
var byName = players.ToDictionary(p => p.Name);  // ❌ ArgumentException

// Fix 1: Group first, then pick one (e.g., the first)
var byName = players
    .GroupBy(p => p.Name)
    .ToDictionary(g => g.Key, g => g.First())
    .ToList();

// Fix 2: Use a different key (e.g., with index)
var byNameAndId = players
    .Select((p, index) => (Id: index, Name: p.Name, Score: p.Score))
    .ToDictionary(x => x.Name, x => x.Score)  // Still may fail if names duplicate

// Better: use a unique identifier
var byId = players.ToDictionary(p => p.Id, p => p);
```

## Join: combine two sequences

`Join` combines items from two sequences based on a key:

```csharp
public class Team
{
    public string Name { get; set; }
    public int Budget { get; set; }
}

List<Team> teams = new List<Team>
{
    new Team { Name = "Red", Budget = 1000 },
    new Team { Name = "Blue", Budget = 800 }
};

// Join players with teams by team name
var playerTeams = players
    .Join(teams,
          player => player.Team,      // Key from players
          team => team.Name,          // Key from teams
          (player, team) => new       // Result selector
          {
              player.Name,
              team.Name,
              player.Score,
              team.Budget
          })
    .ToList();

foreach (var item in playerTeams)
{
    Console.WriteLine($"{item.Name} ({item.Name}): score {item.Score}, budget {item.Budget}");
}
// Output:
// Alice (Red): score 100, budget 1000
// Bob (Blue): score 85, budget 800
// Charlie (Red): score 100, budget 1000
```

### Join vs Navigation Properties (EF Core)

With EF Core, you typically use **navigation properties** instead of `Join`:

```csharp
// EF Core: Player has Team navigation property
var playerTeams = players
    .Select(p => new { p.Name, p.Score, p.Team.Budget })
    .ToList();

// This is cleaner than Join when using EF Core
```

## GroupJoin: join with grouping

`GroupJoin` joins and groups, useful for one-to-many relationships:

```csharp
// Join teams with players (each team has many players)
var teamsWithPlayers = teams
    .GroupJoin(players,
               team => team.Name,
               player => player.Team,
               (team, teamPlayers) => new
               {
                   team.Name,
                   Players = teamPlayers.ToList()
               })
    .ToList();

foreach (var item in teamsWithPlayers)
{
    Console.WriteLine($"Team: {item.Name}");
    foreach (var player in item.Players)
    {
        Console.WriteLine($"  {player.Name}: {player.Score}");
    }
}
// Output:
// Team: Red
//   Alice: 100
//   Charlie: 100
// Team: Blue
//   Bob: 85
```

## Zip: combine parallel sequences

Pair items from two sequences by position:

```csharp
var names = new[] { "Alice", "Bob", "Charlie" };
var scores = new[] { 100, 85, 75 };

var pairs = names.Zip(scores, (name, score) => $"{name}: {score}").ToList();

foreach (var pair in pairs)
{
    Console.WriteLine(pair);
}
// Output:
// Alice: 100
// Bob: 85
// Charlie: 75
```

If sequences have different lengths, `Zip` stops at the shorter one.

## Set operations: Concat, Union, Intersect, Except

Combine or compare sequences:

| Operation | Purpose | Example |
|-----------|---------|---------|
| **Concat** | Combine; duplicates kept | `[1,2].Concat([2,3])` → `[1,2,2,3]` |
| **Union** | Combine; duplicates removed | `[1,2].Union([2,3])` → `[1,2,3]` |
| **Intersect** | Common items only | `[1,2,3].Intersect([2,3,4])` → `[2,3]` |
| **Except** | Items in first, not in second | `[1,2,3].Except([2,3,4])` → `[1]` |

```csharp
var list1 = new[] { 1, 2, 3 };
var list2 = new[] { 2, 3, 4 };

var concat = list1.Concat(list2).ToList();      // [1, 2, 3, 2, 3, 4]
var union = list1.Union(list2).ToList();        // [1, 2, 3, 4]
var common = list1.Intersect(list2).ToList();   // [2, 3]
var only1 = list1.Except(list2).ToList();       // [1]
```

## Common mistakes

- **Forgetting to call `ToList()` or `ToArray()` on `GroupBy` or `Join`** – The result is `IEnumerable`, not a materialized list. Without `.ToList()`, the query is deferred.

```csharp
// ❌ Not materialized
var groups = players.GroupBy(p => p.Team);

// ✓ Materialized
var groupList = players.GroupBy(p => p.Team).ToList();
```

- **Assuming `ToDictionary` handles duplicate keys** – It throws `ArgumentException`. Resolve with `GroupBy` first or use a unique key.

```csharp
// ❌ Throws if duplicate keys
var dict = players.ToDictionary(p => p.Team);

// ✓ Handle duplicates with GroupBy
var grouped = players.GroupBy(p => p.Team).ToDictionary(g => g.Key, g => g.ToList());
```

- **Using `Join` instead of navigation properties in EF Core** – EF Core navigation properties are simpler and more efficient. Use `Join` only when working with in-memory collections.

```csharp
// ❌ Unnecessary with EF Core
var result = dbContext.Players.Join(dbContext.Teams, ...);

// ✓ Better: use navigation properties
var result = dbContext.Players.Select(p => new { p.Name, p.Team.Budget });
```

## Quick recap

- **OrderBy/OrderByDescending**: Sort ascending/descending (see [Sorting](/content/notes/csharp-sorting.md)).
- **ThenBy/ThenByDescending**: Secondary sort (tiebreaker).
- **GroupBy**: Group by key; produces `IGrouping<TKey, TElement>`.
- **ToLookup**: Like GroupBy, but optimized for fast lookups.
- **ToDictionary**: Create a dictionary; throws if keys are not unique.
- **Join**: Combine two sequences by key (SQL INNER JOIN).
- **GroupJoin**: Join with grouping (SQL LEFT OUTER JOIN equivalent).
- **Zip**: Pair items by position from two sequences.
- **Set operations**: `Concat` (combine), `Union` (combine, deduplicate), `Intersect` (common), `Except` (difference).
- **Common error**: Forgetting `.ToList()` on GroupBy, Join, or not handling duplicate keys in ToDictionary.
- **EF Core tip**: Use navigation properties instead of `Join` for cleaner code.
