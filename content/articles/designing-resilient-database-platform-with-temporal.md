---
title: "Designing Resilient Database Platform with Temporal"
description: "Let's explore the journey of designing our database platform in Trendyol."
date: "2025-07-29"
image: "/article/designing-resilient-database-platform-with-temporal/preview.png"
tags: ["Temporal", "Database", "Workflow", "Apache Kafka", "Platform Engineering"]
---

Building a database platform that handles complex, long-running operations while maintaining a seamless user experience is a major challenge in platform engineering. Let's explore the journey of designing our database platform in Trendyol.

## The Challenge

We need to design a database platform that provisions infrastructure for our customers. This platform must handle operations that can take hours, manage multi-region deployments, and ensure everything works reliably.

## Core Requirements

### 1. Database Creation

Database creation can take hours, and our system needs to handle this gracefully while keeping users informed.

**What We Need:**
- Handle operations that may take hours to complete
- Keep users updated on progress
- Support parallel cluster creation across different regions
- Handle temporary infrastructure issues

### 2. Replication Management

Setting up replication between databases in different regions (like Ankara and Istanbul) requires careful coordination.

**What We Need:**
- Create replication between multi-region clusters
- **Wait for both clusters to be fully** operational before setting up replication

### 3. Resilience

Our platform needs to handle network timeouts, infrastructure issues, and other temporary problems without users noticing.

**What We Need:**
- Overcome temporary challenges automatically
- Ensure eventual success despite failures
- Keep users unaware of temporary system issues

Now we know the requirements but how can we implement this platform?

## Implementation

### Traditional Programming Approach

Let's start with a traditional programming approach. I'll use Go examples, but the concepts apply to any language.

<img src="/article/designing-resilient-database-platform-with-temporal/traditional-approach.png" className="mx-auto max-w-xl h-auto" style={{maxWidth: "75%", maxHeight: "50%"}} alt="Traditional Approach"/>

We have a `CreateMultiRegionDatabase` function that orchestrates the entire database creation process. It launches two `CreateDatabase` calls in parallel using goroutines, and if successful, sets up replication between the clusters.

At first glance, this approach appears sound - but several issues arise.

#### Problems

- **Blocking the Application Thread:**

  <img src="/article/designing-resilient-database-platform-with-temporal/traditional-block-thread.png" className="mx-auto max-w-xl h-auto" style={{height: "auto"}} alt="Traditional Blocking Thread"/>

  Database creation can take hours, but we can't afford to block the application thread for that duration. How do we handle long-running operations?

- **Error Handling:**

  <img src="/article/designing-resilient-database-platform-with-temporal/traditional-error-handling.png" className="mx-auto max-w-xl h-auto" style={{height: "auto"}} alt="Traditional Error Handling"/>

  We need to handle errors automatically without exposing them to customers. Traditional programming makes this difficult.
 
 ### Apache Kafka Approach

<img src="/article/designing-resilient-database-platform-with-temporal/kafka-approach.png" className="mx-auto max-w-xl h-auto" style={{maxWidth: "75%", height: "auto"}} alt="Kafka Approach"/>

**Kafka** is a robust event-streaming platform well-suited for real-time message processing. It provides:
- **Event streaming capabilities:** Publish, subscribe, and process messages efficiently
- **High throughput:** Ideal for building data pipelines and event-driven systems
- **Scalability:** Can handle large volumes of messages across distributed systems


Let's try Apache Kafka Approach for our platform

<img src="/article/designing-resilient-database-platform-with-temporal/kafka-approach-code.png" className="mx-auto max-w-xl h-auto" style={{maxWidth: "75%", height: "auto"}} alt="Kafka Approach"/>

To keep the example simple, I've simplified the Kafka consumer and producer structure instead of building a complete implementation.

Here's a simplified overview of the workflow:

- `CreateMultiRegionDatabase` function publishes 2 events to Kafka: `CreateDatabaseEvent` for Ankara and Istanbul
- `CreateDatabaseConsumer` processes these events and creates the databases, then publishes `DatabaseCreatedEvent` messages
- `DatabaseCreatedConsumer` listens for created events and **sets up replication between the two regions once both databases are ready**

#### Problems

- **State Management:**
    <img src="/article/designing-resilient-database-platform-with-temporal/kafka-state-management.png" className="mx-auto max-w-xl h-auto" style={{height: "auto"}} alt="Kafka State Management"/>

  We need to store database created events to track when all regions of the cluster are ready. What happens if two events arrive at the same time? We need to handle concurrent processing carefully.

- **Error Handling:**
    <img src="/article/designing-resilient-database-platform-with-temporal/kafka-error-handling.png" className="mx-auto max-w-xl h-auto" style={{maxWidth: "75%", height: "auto"}} alt="Kafka Error Handling"/>

  We still need custom error handling and retry logic. **Kafka does not have built-in error and retry mechanism.**

- **Managing Kafka Components:**
    <img src="/article/designing-resilient-database-platform-with-temporal/kafka-components.png" className="mx-auto max-w-xl h-auto" style={{maxWidth: "75%", height: "auto"}} alt="Kafka Components"/>

  We need to manage Kafka components, ensure consumers process messages correctly, and verify producers work properly.

- **Cognitive Load:**
    
    This approach requires developers to understand complex event flows and business logic. **It's difficult to follow the business process just by reading the code.**

- **Debugging Complexity:**
    
    Kafka introduces visibility challenges when it comes to troubleshooting. Determining whether messages were successfully sent or consumed can be problematic. While error topics may help address some issues, tracing and debugging problems in distributed event streams remains inherently complex.

### Business Process Modeling Notation (BPMN)
Let's step back from the code and look at our problem from a business perspective. BPMN is a standardized flow chart method that models business processes from end to end.

<img src="/article/designing-resilient-database-platform-with-temporal/bpmn.png" className="mx-auto max-w-xl h-auto" style={{height: "auto"}} alt="BPMN"/>

In this diagram, you can see a use case that starts with a start event and ends with an end event. The use case contains activities, and we also call our use case a **workflow**.

Every component in BPMN, such as rectangles or symbols inside shapes, has a specific meaning.

BPMN diagrams provide a standardized way to visualize business processes from start to finish, ensuring all stakeholders - developers, product managers, and business analysts - share a common understanding of the workflow without being overwhelmed by technical implementation details.

How can we implement BPMN diagrams in code? While BPMN provides excellent visual representation of business processes, translating these diagrams into executable code has traditionally been challenging. This is where workflow orchestration platforms like Temporal come into play.

### Temporal

[Temporal](https://temporal.io/) is an open-source workflow orchestration platform that provides:
- **State Persistence:** Maintains workflow state across failures and restarts
- **Built-in Reliability:** Support for retries, timeouts, scheduled and long-running tasks
- **Multi-language Support:** Go, Java, PHP, Python, TypeScript, .NET, Clojure, Scala, Ruby

<img src="/article/designing-resilient-database-platform-with-temporal/temporal.png" className="mx-auto max-w-xl h-auto" style={{height: "auto"}} alt="Temporal"/>

You can deploy it self-hosted with just a database (like PostgreSQL) or use Temporal Cloud.

You can write your application code as usual - **Temporal orchestrates the workflows without requiring significant changes.**

#### Core Temporal Concepts

**Workflow:** A durable function that orchestrates your business logic. It can run for hours, days, or weeks and survives failures.

**Activity:** A single unit of work (like sending a request) that can be retried automatically. Activities are the building blocks of workflows. Temporal activities are retried infinitely by default, but this behavior can be configured as needed.

**Durable Execution:** Temporal persists workflow state, so if your application crashes, the workflow continues from where it left off.

Let's implement our database platform using Temporal.

### Temporal Approach

Before proceeding, it's important to understand the database creation process.

As you may know, we cannot create databases directly within an application - we require a provider.

This can be cloud providers (AWS, Google Cloud, etc.) or our own infrastructure (which can be managed using Terraform).

We initiate the provisioning operation and then periodically check the progress (while there are various methods to monitor progress, periodic interval checking is one of the more straightforward approaches).

<img src="/article/designing-resilient-database-platform-with-temporal/temporal-approach.png" className="mx-auto max-w-xl h-auto" style={{height: "auto"}} alt="Temporal"/>

Defining workflows and activities is straightforward - they are simply functions that accept input parameters.

`CreateDatabase`  will serve as our workflow and will accept a region as input.

Within this workflow, we periodically call the `CheckIfDatabaseIsCreated` activity, allowing up to three attempts. I've set this number low for demonstration purposes; in production environments, this can be configured for longer intervals. You can also configure activity retry mechanisms, but I've kept it simple for clarity.

The `CheckIfDatabaseCreated` activity returns a boolean value. If the `attempt` count equals `maxRetries`, it returns true, simulating that the database has been successfully created.

If the database is not yet created, we will call the `workflow.Sleep` function for 1 second. This is a special Temporal method that pauses workflow execution for the specified duration. It differs from the standard `time.Sleep` function in that it doesn't block any thread - **it simply delays the execution of the workflow.**

Temporal also provides a web-based UI that allows us to monitor workflow execution, trigger new workflows, and manage the overall system.

<img src="/article/designing-resilient-database-platform-with-temporal/temporal-ui.png" className="mx-auto max-w-xl h-auto" style={{height: "auto"}} alt="Temporal"/>

Here is an example workflow that I initiated for Istanbul database creation.

As shown, you can track every step of the workflow execution, **making debugging and troubleshooting significantly more straightforward.**

We've discussed single-region database creation. Now, let's explore how we can design multi-region database provisioning.

<img src="/article/designing-resilient-database-platform-with-temporal/temporal-multi-region.png" className="mx-auto max-w-xl h-auto" style={{height: "auto"}} alt="Temporal"/>

We can invoke a workflow within another workflow as a **child workflow**.

In our `CreateMultiRegionDatabase` workflow, we will call two child workflows: `CreateDatabase` for Ankara and Istanbul.

These will execute in parallel because we're waiting for the workflow 

Once both database creations are complete, we will call another activity: `CreateDatabaseReplication`.

<img src="/article/designing-resilient-database-platform-with-temporal/temporal-ui-2.png" className="mx-auto max-w-xl h-auto" style={{height: "auto"}} alt="Temporal"/>

As you can see, with the Temporal approach, **the cognitive load is significantly reduced.** We can focus on core business logic and easily visualize the entire use case from start to finish using the UI. Identifying, tracing, and debugging issues becomes much more straightforward.

## Conclusion

In summary, leveraging workflow orchestration platforms like Temporal enables you to model complex business processes with greater clarity, reliability, and resilience.

By separating business logic from technical implementation details, you can build scalable, maintainable, and resilient systems while reducing operational complexity.

If you are interested in learning more about workflow orchestration, I recommend the book **Practical Process Automation by Bernd Ruecker.**