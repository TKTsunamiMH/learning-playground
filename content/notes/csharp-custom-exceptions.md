---
title: Custom Exceptions in C#
topic: C#
tags: [csharp, custom-exceptions, exception-hierarchy, inheritance]
date: 2026-11-23
---

# Custom Exceptions in C#

While the .NET Framework provides many built-in exceptions, sometimes you need to create your own to represent domain-specific errors. A custom exception tells callers that your code threw something specific, which they can catch and handle deliberately.

## When to create a custom exception

Create a custom exception when:

1. **A specific error that callers should catch** – The error represents a unique situation your code needs to signal
2. **Multiple failure modes** – You want callers to distinguish between different types of failures
3. **Additional data** – You need to include extra properties beyond `Message` (e.g., an account balance, product ID, etc.)

**Do NOT create a custom exception just to have one** – if a built-in exception fits, use it.

```csharp
// ❌ Unnecessary: ArgumentException already says "argument is bad"
public class BadArgumentException : Exception { }

// ✓ Useful: domain-specific error that callers might catch
public class InsufficientFundsException : Exception { }

// ✓ Useful: application might need to know the product ID
public class ProductOutOfStockException : Exception
{
    public int ProductId { get; set; }
}
```

## How to create a custom exception

A custom exception class should:

1. **Inherit from `Exception`** (or a more specific base class like `InvalidOperationException`)
2. **Have a name ending in "Exception"**
3. **Provide constructors** for common scenarios: parameterless, with message, with message and inner exception
4. **Optionally add domain-specific properties**

Here's a complete example:

```csharp
public class InsufficientFundsException : Exception
{
    // Domain-specific properties
    public decimal RequiredAmount { get; }
    public decimal AvailableBalance { get; }

    // Parameterless constructor (rarely used but good to have)
    public InsufficientFundsException()
        : base("Insufficient funds for this transaction.")
    {
    }

    // Constructor with just message
    public InsufficientFundsException(string message)
        : base(message)
    {
    }

    // Constructor with message and inner exception
    public InsufficientFundsException(string message, Exception innerException)
        : base(message, innerException)
    {
    }

    // Constructor with domain-specific data
    public InsufficientFundsException(
        decimal requiredAmount,
        decimal availableBalance,
        string? message = null)
        : base(message ?? $"Required: ${requiredAmount:F2}, Available: ${availableBalance:F2}")
    {
        RequiredAmount = requiredAmount;
        AvailableBalance = availableBalance;
    }
}
```

## Using a custom exception

Throw and catch your custom exception like any other:

```csharp
public class BankAccount
{
    private decimal _balance;

    public BankAccount(decimal initialBalance)
    {
        _balance = initialBalance;
    }

    public void Withdraw(decimal amount)
    {
        if (amount > _balance)
        {
            throw new InsufficientFundsException(
                requiredAmount: amount,
                availableBalance: _balance
            );
        }
        _balance -= amount;
    }
}

// Usage: catch the specific exception
try
{
    var account = new BankAccount(100);
    account.Withdraw(150);
}
catch (InsufficientFundsException ex)
{
    Console.WriteLine($"Error: {ex.Message}");
    Console.WriteLine($"Available: ${ex.AvailableBalance:F2}");
    Console.WriteLine($"Needed: ${ex.RequiredAmount:F2}");
}
// Output:
// Error: Required: $150.00, Available: $100.00
// Available: $100.00
// Needed: $150.00
```

## Catching a base type

Callers can catch your custom exception as its base type if they want to handle it generically:

```csharp
try
{
    account.Withdraw(150);
}
catch (InvalidOperationException ex)
{
    // Catches InsufficientFundsException (and any other InvalidOperationException)
    Console.WriteLine($"Cannot complete operation: {ex.Message}");
}
```

## Naming and design

- **Name ends in "Exception"** – `InsufficientFundsException`, not `InsufficientFunds`
- **Be specific** – `ProductOutOfStockException`, not `ErrorException`
- **Inherit from `Exception` or a specific base class**:
  - `Exception` for most cases
  - `InvalidOperationException` if the object state doesn't allow the operation
  - `ArgumentException` if it's about invalid arguments (less common for custom)
- **Do NOT inherit from `ApplicationException`** – it's deprecated and rarely useful

```csharp
// ✓ Good naming and hierarchy
public class ProductOutOfStockException : InvalidOperationException
{
    public int ProductId { get; }
    public string ProductName { get; }

    public ProductOutOfStockException(int productId, string productName)
        : base($"Product '{productName}' (ID: {productId}) is out of stock")
    {
        ProductId = productId;
        ProductName = productName;
    }

    public ProductOutOfStockException(string message, Exception? innerException = null)
        : base(message, innerException)
    {
    }
}
```

## Another example: custom exception with extra context

```csharp
public class PaymentProcessingException : Exception
{
    public string TransactionId { get; }
    public string PaymentProvider { get; }
    public decimal Amount { get; }

    public PaymentProcessingException(
        string transactionId,
        string paymentProvider,
        decimal amount,
        string message,
        Exception? innerException = null)
        : base(message, innerException)
    {
        TransactionId = transactionId;
        PaymentProvider = paymentProvider;
        Amount = amount;
    }
}

// Throwing it
try
{
    paymentGateway.ProcessPayment(transactionId, amount);
}
catch (HttpRequestException ex)
{
    throw new PaymentProcessingException(
        transactionId: "TXN-12345",
        paymentProvider: "Stripe",
        amount: 99.99m,
        message: "Payment gateway is unreachable",
        innerException: ex
    );
}

// Catching it and using the extra data
try
{
    ProcessPayment();
}
catch (PaymentProcessingException ex)
{
    logger.LogError($"Payment failed: {ex.Message}");
    logger.LogError($"  Transaction: {ex.TransactionId}");
    logger.LogError($"  Provider: {ex.PaymentProvider}");
    logger.LogError($"  Amount: ${ex.Amount:F2}");
    if (ex.InnerException != null)
        logger.LogError($"  Inner: {ex.InnerException.Message}");
}
```

## Common mistakes

- **Creating a custom exception but inheriting from `ApplicationException`** – Use `Exception` or a specific base class instead.

```csharp
// ❌ Avoid ApplicationException
public class MyException : ApplicationException { }

// ✓ Use Exception or a specific base
public class MyException : Exception { }
public class MyInvalidStateException : InvalidOperationException { }
```

- **Forgetting to call the base constructor** – Always pass the message and inner exception to the base class.

```csharp
// ❌ Bad: base constructor not called
public class MyException : Exception
{
    public MyException(string message)
    {
        // Message property won't be set!
    }
}

// ✓ Good: base constructor called
public class MyException : Exception
{
    public MyException(string message) : base(message) { }
}
```

- **Not providing multiple constructors** – Make it easy for callers to throw your exception in different ways.

```csharp
// ✓ Provide at least: parameterless, message, message+innerException, and domain-specific data
public class MyException : Exception
{
    public MyException() { }
    public MyException(string message) : base(message) { }
    public MyException(string message, Exception innerException) 
        : base(message, innerException) { }
    public MyException(string message, int customData) 
        : base($"{message} (CustomData: {customData})") { }
}
```

## Quick recap

- Create a custom exception when you need to represent a domain-specific error that callers should catch deliberately.
- Inherit from `Exception` (or a specific base like `InvalidOperationException`); never use `ApplicationException`.
- Provide constructors for: parameterless, with message, with message + inner exception, and optionally with domain-specific data.
- Name it with the "Exception" suffix and make it specific (`OutOfStockException`, not `ErrorException`).
- Call the base class constructor and always pass the message and inner exception.
- Use it like any other exception: throw with `throw new MyException(...)` and catch with `catch (MyException ex)`.
