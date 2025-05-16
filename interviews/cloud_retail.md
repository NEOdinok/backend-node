## Event loop in Node.js

## PostgreSQL

What is transaction ?  
What is isolation levels ?  
Give examples of them

## Indexes in DB

## Hash index, what is it good for ?

## Why is B-tree created by default ?

What is the time complexity of searching B-tree ?  
What is the time complexity of searching Hash table ?  
So why is B-tree created by default in a PostgreSQL ?

**B-tree** and **Binary Tree** are **NOT the same**:

- Binary tree has **max 2 children**; B-tree can have **many**.
- B-tree is optimized for **block-based storage** (e.g., disks, SSDs).
- Binary trees are better for **in-memory structures**.

Unbalanced tree:

```js
    1
     \
      2
       \
        3
         \
          4
```

Balanced tree (Depth minimized):

```js
       4
     /   \
    2     6
   / \   / \
  1   3 5   7

```

| Structure       | Search Complexity        | Supports Range Queries | Suitable For             |
| --------------- | ------------------------ | ---------------------- | ------------------------ |
| **B-tree**      | `O(log n)`               | ✅ Yes                 | General-purpose indexing |
| **Binary Tree** | `O(n)` / `O(log n)`      | ✅ If ordered          | In-memory use cases      |
| **Hash Map**    | `O(1)` avg, `O(n)` worst | ❌ No                  | Exact match lookup       |

## What is Redis ?

## What is Rabbit ?

## Reasons for using Redis instead of in-app memory

Microservice Architecture has many components.  
All of those components should have single source of truth for cache.

## Rabbit entities

| 🧩 Entity        | 📖 Description                                                             |
| ---------------- | -------------------------------------------------------------------------- |
| **Producer**     | App/service that sends messages                                            |
| **Consumer**     | App/service that receives messages                                         |
| **Message**      | The actual data being sent (e.g., JSON, string)                            |
| **Queue**        | A buffer that holds messages until a consumer processes them               |
| **Exchange**     | Routes messages to queues based on routing rules                           |
| **Binding**      | Connection between an exchange and a queue (defines routing logic)         |
| **Routing Key**  | A label used by exchanges to decide where to send the message              |
| **Virtual Host** | A namespace to logically separate brokers (like multi-tenancy)             |
| **Channel**      | A lightweight connection within a TCP connection (used to publish/consume) |
| **Connection**   | A TCP connection between the application and the message broker            |
