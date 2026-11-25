---
title: Where Records Are Preferred in C#
topic: C#
tags: [csharp, record, design, patterns, best practices]
date: 2026-11-25
---

# Where Records Are Preferred in C#

Records are the right choice in many modern C# scenarios. This note covers where records shine and where they're not the best fit.

## Where records are the better choice

### DTOs and API models in ASP.NET Core

Records are perfect for data transfer objects (DTOs) and API request/response objects. Model binding works seamlessly with records, and `System.Text.Json` serializes them directly:

```csharp
// ASP.NET Core controller
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    public record CreateUserRequest(string Name, string Email);
    public record UserResponse(int Id, string Name, string Email);

    [HttpPost]
    public UserResponse CreateUser(CreateUserRequest request)
    {
        // request is automatically bound from JSON body
        // No need to manually map properties
        return new UserResponse(1, request.Name, request.Email);
    }

    [HttpGet("{id}")]
    public UserResponse GetUser(int id)
    {
        return new UserResponse(id, "Alice", "alice@example.com");
    }
}

// JSON serialization (automatic with System.Text.Json)
var user = new UserResponse(1, "Alice", "alice@example.com");
var json = JsonSerializer.Serialize(user);
// Output: {"id":1,"name":"Alice","email":"alice@example.com"}

var deserialized = JsonSerializer.Deserialize<UserResponse>(json);
Console.WriteLine(deserialized);  // UserResponse { Id = 1, Name = Alice, Email = alice@example.com }
```

**Why:** Records have clean syntax, auto-generated serializable properties, and value-based equality. Perfect for API contracts.

### Immutable data and value objects in domain-driven design

Domain-driven design (DDD) value objects are immutable and represent a single concept (e.g., email, money, coordinates). Records make them easy to define and use:

```csharp
using System.Collections.Immutable;

// Value objects: immutable domain data
public record EmailAddress(string Value)
{
    public EmailAddress(string value) : this(value)
    {
        if (!value.Contains("@"))
            throw new ArgumentException("Invalid email");
    }

    public override string ToString() => Value;
}

public record Money(decimal Amount, string Currency)
{
    public Money(decimal amount, string currency) : this(amount, currency)
    {
        if (amount < 0)
            throw new ArgumentException("Amount must be non-negative");
    }

    public Money Add(Money other)
    {
        if (Currency != other.Currency)
            throw new ArgumentException("Currencies don't match");
        return new Money(Amount + other.Amount, Currency);
    }
}

// Usage
var email = new EmailAddress("alice@example.com");
var price = new Money(19.99m, "USD");
var total = price.Add(new Money(5.00m, "USD"));

Console.WriteLine(total);  // Money { Amount = 24.99, Currency = USD }
```

**Why:** Records enforce immutability, prevent accidental mutations, and compare by value. Perfect for domain values.

### Messages and events in event-driven applications

Records model domain events, commands, and messages concisely and clearly:

```csharp
// Domain events
public abstract record DomainEvent(DateTime OccurredAt);

public record UserCreatedEvent(int UserId, string Name, DateTime OccurredAt) 
    : DomainEvent(OccurredAt);

public record UserEmailChangedEvent(int UserId, string OldEmail, string NewEmail, DateTime OccurredAt)
    : DomainEvent(OccurredAt);

// Commands
public record CreateUserCommand(string Name, string Email);
public record ChangePasswordCommand(int UserId, string OldPassword, string NewPassword);

// Usage: event sourcing
var userCreated = new UserCreatedEvent(1, "Alice", DateTime.UtcNow);
var emailChanged = new UserEmailChangedEvent(1, "alice@old.com", "alice@new.com", DateTime.UtcNow);

Console.WriteLine(userCreated);   // UserCreatedEvent { UserId = 1, Name = Alice, OccurredAt = ... }
Console.WriteLine(emailChanged);  // UserEmailChangedEvent { UserId = 1, OldEmail = alice@old.com, NewEmail = alice@new.com, OccurredAt = ... }
```

**Why:** Records are immutable and print beautifully, making event replay and debugging easy.

### Configuration and options objects

Configuration and options objects benefit from immutability and value-based equality:

```csharp
// Configuration records
public record DatabaseOptions(string ConnectionString, int CommandTimeout, bool EnableLogging);

public record ApiSettings(string BaseUrl, string ApiKey, int TimeoutSeconds)
{
    public ApiSettings(string baseUrl, string apiKey, int timeoutSeconds) 
        : this(baseUrl, apiKey, timeoutSeconds)
    {
        if (string.IsNullOrEmpty(baseUrl))
            throw new ArgumentException("BaseUrl cannot be empty");
    }
}

// Options pattern in Startup.cs
var dbOptions = new DatabaseOptions("Server=localhost;Database=mydb", 30, true);
var apiSettings = new ApiSettings("https://api.example.com", "secret-key", 10);

// Easy to log and inspect
Console.WriteLine(dbOptions);     // DatabaseOptions { ConnectionString = ..., CommandTimeout = 30, EnableLogging = True }
Console.WriteLine(apiSettings);   // ApiSettings { BaseUrl = https://api.example.com, ApiKey = ..., TimeoutSeconds = 10 }
```

**Why:** Records are immutable (safe for configuration), easy to log, and simple to validate.

### Results of operations

Records elegantly represent operation results (success/failure, data/error):

```csharp
// Result records
public record OperationResult(bool Success, string? ErrorMessage = null);

public record LoginResult(bool Success, int? UserId = null, string? ErrorMessage = null);

public record CreateProductResult(bool Success, int? ProductId = null, List<string> Errors = null);

// Usage
public LoginResult TryLogin(string username, string password)
{
    if (string.IsNullOrEmpty(username))
        return new LoginResult(false, null, "Username is required");

    if (password.Length < 6)
        return new LoginResult(false, null, "Password too short");

    int userId = AuthenticateUser(username, password);
    return userId > 0
        ? new LoginResult(true, userId, null)
        : new LoginResult(false, null, "Invalid credentials");
}

var result = TryLogin("alice", "pass123");
if (result.Success)
    Console.WriteLine($"Logged in as user {result.UserId}");
else
    Console.WriteLine($"Login failed: {result.ErrorMessage}");
```

**Why:** Records model results cleanly with named fields and value equality. Easy to pattern-match.

### Dictionary keys and HashSet items

Records have value-based equality and auto-generated `GetHashCode`, making them perfect for dictionary keys and set members:

```csharp
public record Point(int X, int Y);
public record Coordinate(int Latitude, int Longitude);

// Using records as dictionary keys
var distanceMap = new Dictionary<Point, double>();
distanceMap[new Point(0, 0)] = 0;
distanceMap[new Point(3, 4)] = 5.0;

var key = new Point(0, 0);
Console.WriteLine(distanceMap[key]);  // 0 (key lookup works because of value equality)

// Using records in HashSet
var visitedCoordinates = new HashSet<Coordinate>();
visitedCoordinates.Add(new Coordinate(40, -74));  // New York
visitedCoordinates.Add(new Coordinate(40, -74));  // Same coordinates

Console.WriteLine(visitedCoordinates.Count);  // 1 (duplicates removed via value equality)
```

**Why:** Records implement `Equals` and `GetHashCode` based on field values, so two records with the same values are considered equal. This is essential for hash-based collections.

### Tests: comparing expected and actual objects

In unit tests (xUnit, NUnit, etc.), comparing expected and actual objects is cleaner with records because of value-based equality:

```csharp
using Xunit;

public record User(int Id, string Name, string Email);

public class UserServiceTests
{
    [Fact]
    public void CreateUser_ReturnsUserWithCorrectData()
    {
        var service = new UserService();

        var actual = service.CreateUser("Alice", "alice@example.com");

        var expected = new User(1, "Alice", "alice@example.com");
        Assert.Equal(expected, actual);  // ✓ Works because User is a record (value equality)
    }
}

// Without records (class):
public class UserClass
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
}

[Fact]
public void Test_WithClass()
{
    var actual = new UserClass { Id = 1, Name = "Alice", Email = "alice@example.com" };
    var expected = new UserClass { Id = 1, Name = "Alice", Email = "alice@example.com" };

    // Assert.Equal(expected, actual);  // ❌ Fails: classes compare by identity
    // Must override Equals or use:
    Assert.True(expected.Id == actual.Id && expected.Name == actual.Name);
}
```

**Why:** Records compare by value, so test assertions are simpler and more readable.

### LINQ projections into named types

Instead of anonymous types or tuples, project into named record types for clarity and reusability:

```csharp
public record EmployeeView(int Id, string Name, decimal Salary);

public class Employee
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public decimal Salary { get; set; }
}

var employees = new List<Employee>
{
    new Employee { Id = 1, FirstName = "Alice", LastName = "Smith", Salary = 50000 },
    new Employee { Id = 2, FirstName = "Bob", LastName = "Jones", Salary = 60000 }
};

// Project into named record type (better than anonymous type)
var view = employees
    .Select(e => new EmployeeView(e.Id, $"{e.FirstName} {e.LastName}", e.Salary))
    .Where(v => v.Salary > 55000)
    .ToList();

foreach (var item in view)
    Console.WriteLine($"{item.Name}: {item.Salary}");

// Alternative: tuple (lightweight but no type name)
var tupleView = employees
    .Select(e => (e.Id, $"{e.FirstName} {e.LastName}", e.Salary))
    .ToList();
```

**Why:** Named record types are self-documenting and can be reused across methods. Better than anonymous types (confined to one method) or tuples (no type name).

### Pattern matching with records

Records enable elegant pattern matching, especially with positional patterns:

```csharp
public record Person(string Name, int Age);
public record Employee(string Name, int Age, string Department) : Person(Name, Age);
public record Manager(string Name, int Age, string Department, int ReportsCount) : Employee(Name, Age, Department);

public string Classify(Person person) => person switch
{
    Manager(_, _, _, > 5) => "Senior manager",
    Manager => "Manager",
    Employee(_, _, "Engineering") => "Engineer",
    Person(_, >= 65) => "Senior",
    Person(_, >= 18) => "Adult",
    _ => "Other"
};

Console.WriteLine(Classify(new Manager("Alice", 45, "Engineering", 10)));  // Senior manager
Console.WriteLine(Classify(new Employee("Bob", 30, "Sales")));             // Other
Console.WriteLine(Classify(new Person("Charlie", 70)));                    // Senior
```

**Why:** Positional patterns in records make switch expressions concise and readable.

## Where records are NOT the best choice

### EF Core entities

Records work with EF Core, but classes are better for entities because:
- Entities are mutable (properties change as the application runs).
- EF Core's change tracker expects mutable properties to detect modifications.
- Entities have identity (primary key), not just value equality.

```csharp
// ❌ Not ideal: record for EF Core entity
public record User(int Id, string Name, string Email);
// user.Name = "new";  // Error: init-only property

// ✓ Better: class for EF Core entity
public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public DateTime CreatedAt { get; set; }
}

// In DbContext:
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<User>()
        .HasKey(u => u.Id);
}
```

**Caveat:** You *can* use mutable records with EF Core (via init properties that allow setting, or plain `get; set;` properties), but it's unconventional and confusing. Stick with classes for entities.

### Types with complex behavior and mutable state

Records are data-focused and best for immutable types. Complex business logic and mutable state fit classes better:

```csharp
// ❌ Not ideal: record for a shopping cart (frequently changes)
public record ShoppingCart(List<CartItem> Items, decimal Total)
{
    public void AddItem(CartItem item) { /* ... */ }
    public void RemoveItem(CartItem item) { /* ... */ }
}

// ✓ Better: class for mutable, stateful objects
public class ShoppingCart
{
    public List<CartItem> Items { get; private set; } = new();
    public decimal Total => Items.Sum(i => i.Price);

    public void AddItem(CartItem item) { Items.Add(item); }
    public void RemoveItem(CartItem item) { Items.Remove(item); }
}
```

### Types that rely on reference identity

If object identity (reference equality) matters, use a class:

```csharp
// ❌ Not ideal: record for a Player (identity matters in a game)
public record Player(int Id, string Name);

// Player A
var p1 = new Player(1, "Alice");
var p2 = new Player(1, "Alice");

Console.WriteLine(p1 == p2);  // true (value equality, but we want identity!)
// In a game, p1 and p2 should be treated as different instances

// ✓ Better: class with reference identity
public class Player
{
    public int Id { get; set; }
    public string Name { get; set; }
}

var p1 = new Player { Id = 1, Name = "Alice" };
var p2 = new Player { Id = 1, Name = "Alice" };

Console.WriteLine(p1 == p2);  // false (each player is unique)
Console.WriteLine(ReferenceEquals(p1, p2)); // false
```

### Large hierarchies

Records support inheritance, but deep hierarchies can become complex. For large domain models, consider a mix of records and classes, or use classes throughout:

```csharp
// ❌ Getting complex: deep record hierarchy
public record Vehicle(string Make, string Model);
public record Car(string Make, string Model, int Doors) : Vehicle(Make, Model);
public record SportsCar(string Make, string Model, int Doors, int MaxSpeed) : Car(Make, Model, Doors);
public record Formula1Car(string Make, string Model, int Doors, int MaxSpeed, string Team) : SportsCar(Make, Model, Doors, MaxSpeed);

// ✓ Better for complex hierarchies: classes
public class Vehicle { public string Make { get; set; } }
public class Car : Vehicle { public int Doors { get; set; } }
public class SportsCar : Car { public int MaxSpeed { get; set; } }
```

## Records and EF Core: a careful note

You *can* use records with EF Core, especially as DTOs or query results:

```csharp
// Record as DTO (separate from EF entity)
public record UserDto(int Id, string Name, string Email);

// EF entity class (mutable)
public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
}

// Mapping in controller
public UserDto GetUser(int id)
{
    var user = context.Users.FirstOrDefault(u => u.Id == id);
    return new UserDto(user.Id, user.Name, user.Email);
}
```

But **don't use records as EF entities** unless you're using mutable record properties (`{ get; set; }` instead of init-only). Even then, classes are clearer about mutability.

## Common mistakes

- **Using records for entities with changing state** – Records emphasize immutability, but EF entities are mutable. Use classes for entities; use records for DTOs.

```csharp
// ❌ Bad: record for changing entity
public record User(int Id, string Name);

// ✓ Good: class for entity
public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
}
```

- **Using records for everything** – Records are great, but overusing them leads to unnecessary immutability and confuses intent. Use classes when mutability and identity matter.

```csharp
// ❌ Overkill: record for mutable object
public record Game(List<Player> Players);

// ✓ Better: class for mutable container
public class Game
{
    public List<Player> Players { get; private set; } = new();
}
```

- **Forgetting that records are immutable by default** – If you need a mutable record, explicitly use `{ get; set; }` properties, but this is unusual.

```csharp
// Record with mutable properties (unconventional)
public record MutableRecord(string Name)
{
    public string Name { get; set; }  // Mutable (unusual for a record!)
}
```

## Quick recap

- **Records shine in:** DTOs, immutable values, domain events, configuration, operation results, dictionary keys, test assertions, LINQ projections, and pattern matching.
- **Records don't fit:** EF Core entities (use classes), mutable business objects (use classes), types relying on identity (use classes).
- **Rule of thumb:** Records are for data; classes are for behavior and identity.
- Use records for API contracts, domain values, and immutable data. Use classes for entities, services, and objects with complex mutable state.
