# 16. Microservices. Microservice Architecture (MSA)

## Introduction

- **Microservices** = many small services that do one job each. They talk to each other via HTTP or through a Gateway.
- Each service runs separately (in its own container), can be updated and deployed independently from others.
- **API Gateway** = single entry point that sends requests to the right service.
- Microservice architecture is a distributed system.
- **Pros:**
  - **Scalability** - each one scales independently based on traffic and load
  - **Flexibility** - they can use different languages and DBs
  - **Resilience** - AKA fault tolerance. Failure in one does not crash the entire system.
  - **Speed of development** - Each team can focus on it's own microservice.
- **Cons:**
  - **Complexity** - Distributed system requires handling service discovery, communication, and orchestration
  - **Data consistency** - more challenging to maintain transactional integrity across services.
  - **Deployment overhead** - Needs advanced CI/CD, logging, monitoring setup
  - **Latency** - Inter-service communication can be slower than in monolith.

## Load balancing

Used in backend applications to distribute incoming traffic evenly across multiple servers.

- **Main algorithms:**
  - **Round Robin:** Even rotation: → Server A → B → C → then back to A...  
    Great for evenly spread traffic if all servers are equal.
  - **Least Connections:** Look at which server is least busy → send request there.
  - **IP Hash:** aka Sticky Session. Use client's hash function to always route them to the same server.
    Useful when session data is stored in the server’s memory and sticky sessions are needed.
  - **Health Checks:** Load balancer pings servers. If one is down → no traffic goes to it until it recovers.

## Concurrency

- **amqplib** - Node.js lib used to talk to RabbitMQ
- **cluster** - Node.js built-in module that lets use spawn multiple NodeJS processes.
- **amqplib + cluster** = parallel processing. Load balancing is handled automatically by NodeJS.
- **Nginx** - used for load balancing. Supports all 3: Round Robin, Least Connections, IP Hash.
- **Async Saga** - Asynchronous Saga pattern means compensating actions that happen asynchronously in a distributed system to undo some actions.
  Example:  
  Place order → charge → reserve product → send notification.  
  If reserving the product fails, the saga rolls back:  
  ✖ cancel notification, ✖ refund, ✖ cancel order.
- **Idempotency of microservices** - Re-executing a transaction doesn't alter the system beyond the first execution.  
   Even if the same message is processed twice, the system state remains the same.
- **Limit concurrency** - It's necessary to limit the number of messages being processed simultaneously.
  - Set up acknowledgements in RabbitMQ (only mark messages as "done" when acknowledgement is received from consumer).
  - Prefetch Size. Limit a number of messages consumer can process so that RabbitMQ does not flood app with more messages
    than it can handle
- **Dead letter exchange (DLX)** - If a message fails (rejected or expired), RabbitMQ can move it to a DLX.  
  Then it can retry later (with a delay), or log it for debugging.

## Interaction between microservices

Synchronous call via HTTP/REST.  
Asynchronous interaction through a message queue (e.g., RabbitMQ, Kafka).  
Using API Gateway. Aggregation through BFF (Backends For Frontend).

## Security in MSA

- Using authentication and authorization at the API Gateway level.
- Network policies for isolating services from each other.  
   Meaning explicitly saying which servers are allowed to talk.  
   Usually set-up at the infrastructure level (K8s: NetworkPolicy YAML files, Custom Docker networks + firewall rules)
- Encrypting traffic between services (TLS).  
   Meaning enforcing encrypted traffic (HTTPS) or mTLS (mutual TLS) where services identify each other's certificates

## Transactionality in MSA

**Transactionality** means doing a group of operations where either all succeed or none do.

In monolith it is easy - do a transaction / rollback a transaction.  
in MSA more complicated because it is a distributed system.

- Two-Phase Commit (2PC) - old fashioned way.
- Saga Pattern - break down transaction into steps. When one fails, undo them one by one.

## Microservice versions

Semantic versioning - system of rules that defines how microservice versions are numbered.
1.2.3 - major version, minor version, patch

- Major version - introduces breaking changes
- Minor version - new functionality
- Patch - bug fixes

## Service dictionary

Service Discovery - helps services find each other in a dynamic environment where hosts and ports can frequently change.  
Tools like **Consul** or **Kubernetes DNS** can be used for this purpose.

## Reverse Proxy

**Reverse proxy:** (Like Nginx or HAProxy) usually sits right in front of everything. It's the first thing the client hits.
**TLS termination** - the place where encrypted HTTPS traffic is decrypted.

```
Client
↓
Reverse Proxy ← (TLS termination happens here)
↓
API Gateway.
1. BFF (For single client. For instance BFF for web)
2. Apollo as BFF (When using multiple clients. For instance Web, Mobile etc.)
↓
BFF or Microservices
```

## Microservice Design

- **Microservice:** Independent module responsible for a specific functionality. Operates independently, has it's own DB.
- **API Contract:** Clear contracts for communication between microservices should be defined. REST, GraphQL, or gRPC are popular approaches for creating API.
- **Separation of responsibilities:** Each microservice should have a clearly defined responsibility and should not handle functionalities of other services.
- **Scalability and fault tolerance**
  - Microservices allow for horizontal scaling, making them suitable for large systems.  
    Horizontal - means more spawning more instances.
  - Clustering - (In NodeJS) run multiple processes of the same service on different CPU cores.
  - Load Balancing - Using a reverse proxy (Nginx or HAProxy). Distribute requests among different instances of the microservice.  
    Reverse proxy intercepts requests and redirects them to available microservice entities thus ensuring load balancing.
- **Security and Authorization**
  - **Transport Encryption (TLS/SSL):** Using HTTPS to ensure data encryption during transmission between microservices.  
    Applying certificates and mutual authentication to verify the authenticity of microservices.
  - **Authentication:** (Who you are) Identifying microservices to each other through secret keys or certificates.  
    Using a centralized Identity Provider (IdP), such as OAuth2 or OpenID Connect, for microservices authentication.
  - **Authorization:** (What you can access) - Defining and controlling access rights of microservices to resources and other microservices.  
    Utilizing Role-Based Access Control (RBAC) or other models for managing permissions.
  - **API Gateway:** Using an API Gateway as a central entry point, providing access management and security at the API level.  
    The API Gateway can perform authentication, authorization, rate limiting, and other security tasks.
  - **Network Policies:** Applying network policies and firewall to control and limit interactions between microservices.  
    In Kubernetes, this can be done using Network Policies YAML.
- **Logging and Monitoring:** The system should include centralized logging and monitoring of all microservices. ELK stack
- **Orchestration and Containerization:** Using Docker, Kubernetes, and other tools for managing and deploying microservices.
- **Testing:** Integration and unit testing are crucial for ensuring the quality of microservices.

> 💡 **OAuth2** - protocol for allowing services to act on behalf of a user. Used for Authorization. Example: Log in with Google.

> 💡 **OpenID Connect (OIDC)** - built on top of OAuth2. Used for Authentication. Returns user credentials like name, email.

> 💡 **Role-Base Access Control (RBAC)** - restrict access based on user roles. Example: 'admin' - full access, 'user' - read only.

> 💡 **Network Policies** - K8S YAML file that defines "Who can talk to whom over the network".

## gRPC

**RPC** - Remote Procedure Call.  
A fast way for one service to call a function in another service, as if it was local — but over the network.  
“Hey BookingService, run calculatePrice() and send me the result.”

**Advantages:**

- **HTTP/2** for speed (better than HTTP/1.1 used by REST)
  - Simple and fast bi-directional data streaming.
- **Protobuf** instead of JSON (smaller, faster, strongly typed)
  - Binary format instead of text. Transmits and compresses faster.
- **Supports many Programming Languages** In a proto file, we specify what's on input, output, and get protoc code generation for any language.
- **Deadlines/Timeouts:** gRPC allows setting timeouts for each call.
- **Request Cancellation:** gRPC supports client-side request cancellation.

**Consul** - Service discovery and configuration tool. Consul is a binary standalone app that runs on its own machine.  
Services register themselves in Consul to discover who is running and where
It allows for:

- Registering services.
- Discovering services.
- Health checking.
- Optionally: key-value store, DNS or HTTP APIs

**Protobuf**
A binary format, easy to compress efficiently, strict typing. (ALL OF THIS AS OPPOSED to JSON, where you can pass different data types in one field in different cases).  
In case of Protobuf the server must first serialize the data into Protobuf, and the client must deserialize it.

Protobuf in practice:

- Define a service in .proto file (API contract)
- Generate code (client and server stubs)
- Implement service in code
- Implement client in code

**.proto file**:

```proto
syntax = "proto3";

package flights;

message FlightSearchRequest {
  string fromLocation = 1;
  string toLocation = 2;
}

message FlightSearchResponse {
  repeated string flightNumbers = 1;
}

service FlightService {
  rpc SearchFlights(FlightSearchRequest) returns (FlightSearchResponse);
}
```

**Real-life implementations**

- **Search Service + Schedule Service**

  - Real-time search with fresh schedule data
  - Fast responses
  - Could use server-streaming to get a stream of results.

- **Booking Service + Pricing Service** .
  - Up-to date price is crucial when booking.
  - No need for RabbitMQ because we need instant price update

```
Client (frontend)
  ↓
API Gateway / BFF
  ↓
gRPC call to Booking Service
  ↓
gRPC call to Pricing Service
  ↓
Booking response sent back
```

## CAP Theorem

One of the most fundamental concepts in distributed systems (like MSA).  
Distributed system can only guarantee two of these three things at the same time:

| ✅ Term                | What it means (simple)                                               |
| ---------------------- | -------------------------------------------------------------------- |
| ✅ Consistency         | All nodes **see the same data** at the same time.                    |
| ✅ Availability        | The system **always responds**, even if it’s not the freshest data.  |
| ✅ Partition Tolerance | The system **still works** even if one server can’t talk to another. |

**CAP Examples:**

1. **Group Chat**

3 friends are chatting in a group chat.

- prioritize C + A: (cant handle partition) stop chatting until all are reconnected.
- prioritize C + P: (cant be always available) some messages delayed or dropped to ensure consistency.
- prioritize A + P: (cant ensure consistency) keep chatting, but some messages might be missing or out of order.

2. **Booking Service**  
   **C + P**

- **Consistency:** You don’t want two users to book the same seat.
- **Partition Tolerance:** Services are in different zones.
- ✅ _OK to cancel a request during downtime._

3. **Product Catalog**  
   **A + P**

- **Availability:** Users must always see something.
- **Partition Tolerance:** Products come from a distributed system.
- ✅ _OK to give slightly outdated prices._

## Distributed Transactions and Saga

A _Saga_ breaks a big operation (that touches multiple services) into smaller local transactions, one per service.

- If everything goes well → all local changes are committed.
- If something fails → previous services run compensating transactions to undo their part.

**Choreography vs Orchestration**

- Choreography: Each service just reacts to events and sends out new events — like dancers following the rhythm without a central controller.
- Orchestration: A central "orchestrator" tells services when to do what — like a conductor in a music orchestra.

Choreography example:
Scenario: Order & Product Services

1. Client places an order.
2. `OrdersService` writes the order to DB (status = in process) and sends a message to RabbitMQ.
3. `ProductsService` listens for that message, checks stock, and updates DB (or not).
4. Sends back a success/failure message.
5. `OrdersService` updates the order accordingly or compensates (e.g. cancels the order).

**ProductsService**

```ts
// RabbitMQ client
const amqp = require("amqplib/callback_api");
// PostgreSQL client
const { Client } = require("pg");

// Connect to RabbitMQ
amqp.connect("amqp://localhost", (error0, connection) => {
  if (error0) throw error0;

  // open a virtual connection via RabbitMQ
  connection.createChannel(async (error1, channel) => {
    if (error1) throw error1;

    // declare a queue for listening to product availability
    channel.assertQueue("check-product-availability", { durable: false });

    // consume messages
    channel.consume(
      "check-product-availability",
      async (msg) => {
        // get orderId, productId
        const { orderId, productId } = JSON.parse(msg.content.toString());
        const client = new Client();
        await client.connect();

        // check products in stock
        const product = await client.query(
          "SELECT quantity FROM products WHERE id = $1",
          [productId]
        );

        // begin transaction
        await client.query("BEGIN");

        // if product available
        if (product.rows[0].quantity > 0) {
          //reduce the stock
          await client.query(
            "UPDATE products SET quantity = quantity - 1 WHERE id = $1",
            [productId]
          );

          try {
            // try send a message to a queue
            channel.sendToQueue(
              "product-availability",
              Buffer.from(
                JSON.stringify({ orderId, productId, available: true })
              )
            );

            // transaction commit
            await client.query("COMMIT");
          } catch (error) {
            // rollback a transaction in case of error
            await client.query("ROLLBACK");

            console.error("Error sending message, rollback", error);
          }

          // if product not available
        } else {
          // send back "sorry, not available"
          channel.sendToQueue(
            "product-availability",
            Buffer.from(
              JSON.stringify({ orderId, productId, available: false })
            )
          );
        }

        await client.end();
      },
      { noAck: true }
    );
  });
});
```

## Transactional Outbox

It Centers around the idea of guaranteed message delivery.  
The primary goal is to ensure that crucial events or messages are delivered, even if some parts of the system are temporarily unavailable.

**Example:**

`FlightService` -- displays flight info to the frontend.  
`ScheduleService` -- keeps the flight schedule up to date.  
`ScheduleService` --(RabbitMQ)--> `FlightService`.  
If `ScheduleService` updates local DB but the message is not sent, `FlightService` displays stale data.

**Transactional outbox** - Instead of trying to send the event right away, we save the event to the database first, in the same transaction as the main data change.

- Later background worker picks up saved event
- Sends it to the message broker
- Guarantees delivery

Outbox step by step:

```
Step 1: UPDATE something in your DB
Step 2: INSERT a message about it into a table called "outbox"
(Both in the SAME DB transaction — atomic!)

Later:
Step 3: A background worker reads "outbox", sends the message
Step 4: Marks it as sent
```

> 💡 Background worker might be a simple NodeJS loop that checks outbox table once a few ms.
> 💡 Atomicity between A and B means that either both succeed or neither do.

**Example 1 ✈️**

1. A new price is set in the **Pricing Service**.
2. The **Pricing Service**:

- Updates the price in its local database.
- Writes a `PriceChanged` event to its **Outbox table** (in the same transaction).

3. A background process sends the event to the **message broker**.
4. **Booking Service** subscribes to these events.
5. On receiving the message, **Booking Service updates its local pricing info**.

**Example 2 💰**

1. An operator updates a flight time in the **Schedule Service**.
2. The **Schedule Service**:

- Updates its local database.
- **Adds an event to its Outbox table** inside the same DB transaction (e.g., `FlightScheduleChanged`).

3. A background worker reads unsent events from the Outbox and sends them to a **message broker** (e.g., RabbitMQ or Kafka).
4. **Search Service** is subscribed to this event topic/queue.
5. On receiving the message, **Search Service updates its cache** to reflect the new flight time.

**✅ Pros**

- Guaranteed delivery, even if RabbitMQ is temporarily down
- Atomicity between DB update and event generation
- Services remain decoupled and async

**⚠️ Cons**

- More complexity (need workers, DB polling, etc.)
- You must clean up the Outbox table regularly
- Need retry, deduplication, and error handling logic

## Event Sourcing

Instead of saving the current **state** of something (e.g., "Balance = $500"),
You save **every event** that led to that state (e.g., "Deposit $200", "Withdraw $50", etc).

You reconstruct the current state by replaying all events in order.

**✅ Pros:**

- **Time travel:** You can recreate state at any point in time
- **Auditability:** You get a full history of what happened, when, and why
- **Replayability:** Useful for debugging, rebuilding read models, etc
- **Flexibility:** If your business logic changes, just replay events using the new logic

**⚠️ Cons:**

- **More complex:** Additional logic is needed to replay events and project current state.
- **More data to store:** You keep every event ever (which can grow big).
- **Needs event versioning:** If event structure changes over time, you must support old formats.

**Tools for NodeJS:**

- eventstore – general-purpose event sourcing lib (simple API)
- cqrs-domain – combines CQRS + event sourcing
- nestjs/cqrs

> 💡 **CQRS** Command Query Responsibility Segregation.

## CQRS

**CQRS** stands for Command Query Responsibility Segregation.

Reading data - **\*queries**
Writing / modifying data - **commands**

**✅ Pros:**

- **Performance:** Reads and writes often have different scaling and performance needs.
- **Complex business logic:** Write operations are complex, while reads are simple — mixing them complicates code.
- **Different storage needs:** You might want different databases for reads (fast) and writes (transactional and consistent).
- **Clearer code separation:** Easier to maintain and evolve each part independently.

**⚠️ Cons:**

- **More complexity:** (more moving parts)
- **Eventual consistency** (especially with asynchronous updates).
- Often paired with Event Sourcing, but doesn’t require it.

> 💡 **Eventual consistency** - data updates don't happen instantly everywhere, but all nodes will become consistent over time - eventually.

**Example:**
Let’s say we’re building a system for an airline company.  
We need to perform a flight / hotel booking.

**➕ Commands (Write actions)**

- Book a flight
- Cancel a flight
- Update seat availability
- Change flight time or price

Handled by Command services: `BookingService`, `ScheduleService`.

**🔍 Queries (Read actions)**

- Search flights
- View available seats

Handled by Query services: `SearchService`, `CustomerPortalService`.

**💽 Databases:**

- **Commands** use PostgreSQL or another strong RDBMS (ensures transactions).
- **Queries** use ElasticSearch or a read-optimized DB (faster for full-text search).

**🌊 Workflow:**

```plaintext
User makes change (Command)
        |
        v
[Command Service]
  - Writes to DB
  - Inserts event into Outbox
        |
        v
[Outbox Worker]
  - Reads unsent events from DB
  - Sends events (via gRPC or message broker)
        |
        v
[Query Service]
  - Receives event (via gRPC or broker)
  - Updates its query DB
```

## DDD (Domain-Driven Design)

**DDD** is about organizing your code to match the business logic, not just technical layers.

Instead of thinking “controllers → services → DB".  
**DDD** says:  
“Let’s model the real-world business domain clearly in code.

**DDD building blocks:**

1. **Entities**

- Have a unique ID
- Change over time
- Examples: User, Flight, Booking

```ts
class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}
```

2. **Value Objects**

- Defined only by their value
- No unique ID
- **Immutable**
- Examples: Money, Coordinates, DateRange

```ts
class Money {
  constructor(amount, currency) {
    this.amount = amount;
    this.currency = currency;
  }
}
```

3. **Aggregates**

```ts
class Order {
  constructor(id, items = []) {
    this.id = id;
    this.items = items;
  }

  addItem(item) {
    this.items.push(item); // item is a Value Object
  }
}
```

- A cluster of entities/value objects that are treated as a unit.
- Has a **single root** (aggregate root) that controls access.  
  `const order = new Order();`
- All changes must go through the root to maintain **data integrity**.  
  `order.addItem(item);` - correct  
  `order.items.push(item)` - incorrect. Outside the aggregate

4. **Repositories**

- **Hide DB logic** — provide access to aggregates/entities
- Think: "Give me Order 123", or "Save this User"

```ts
class UserRepository {
  findById(id) {
    // fetch from DB
  }

  save(user) {
    // persist to DB
  }
}
```

5. **Domain Services**

- **Business logic that doesn't fit cleanly** inside one entity.
- Usually work **across multiple entities**.

```ts
class AuthenticationService {
  verifyUser(credentials) {
    // Check password, generate token, etc.
  }
}
```

6. **Domain Events**

- Announce that something **just happened** in the domain.
- Allow **other parts of the system to react** (like microservices).

```ts
class UserRegisteredEvent {
  constructor(userId, timestamp) {
    this.userId = userId;
    this.timestamp = timestamp;
  }
}
```

7. **Bounded Contexts**

- A **boundary around a part of the system** where terms, logic, and models have a specific meaning
- Each microservice is often its **own bounded context**

> 🚧 Models/terms inside one context don’t leak into another.

**✈️ DDD Airline Service Example**

| **DDD Concept**     | **Airline Example**                        |
| ------------------- | ------------------------------------------ |
| **Entity**          | `User`, `Booking`, `Flight`                |
| **Value Object**    | `Money`, `FlightDate`, `AirportCode`       |
| **Aggregate**       | `Booking` with nested `FlightSegments`     |
| **Repository**      | `BookingRepository` to save/load bookings  |
| **Domain Service**  | `PaymentService`, `FareCalculationService` |
| **Domain Event**    | `FlightBookedEvent`, `PaymentFailedEvent`  |
| **Bounded Context** | `Booking`, `Search`, `Scheduling` services |

## Fallback (MSA)

Fallback in the context of MSA is a procedure applied when one of the microservices becomes unavailable, to ensure controlled system behavior and prevent complete stoppage.
A fallback can include:

- Returning predefined data (caching)
- Triggering an alternative microservice
- Returning an error with an informative message.

## Clean / N-Tier Architecture

**Both promote:**

- Separation of Concerns
- Keeping business logic isolated from infrastructure code
- Making code testable, scalable, and easy to change

**🧱 N-Tier Architecture (Traditional Layered)**

**Layers (Top-down)**

- **Presentation** UI / API (e.g., Express Controller, GraphQL Resolver)
- **Business Logic** Services, business rules
- **Data Access** DB calls, ORM (e.g., Sequelize, Prisma)

Data flow
`plaintext Client → Controller → Service → Repository → DB `

**Presentation** depends on **Business**,  
**Business depends** on **Data Access**.

🔁 Often ends up in tight coupling, and it’s not always easy to switch technologies.

**🧱 Clean Architecture (Onion/Circle)**

The outer layers depend on the inner layers — not the other way around.

**🧅 Layers (Inside-out)**

| **Layer**                | **What it contains**                           | **Depends on** |
| ------------------------ | ---------------------------------------------- | -------------- |
| **Entities**             | Core business models & rules (e.g., `Booking`) | None           |
| **Use Cases**            | Application logic / business workflows         | Entities       |
| **Interface Adapters**   | Controllers, Presenters, Gateways              | Use Cases      |
| **Frameworks & Drivers** | Express, DB, HTTP, external APIs               | Adapters       |

🔁 You can swap out Express for Fastify, or PostgreSQL for MongoDB, without touching core logic.

## Scalability and Availability (Fault TOLERANCE)

| **Term**            | **Meaning**                                                       |
| ------------------- | ----------------------------------------------------------------- |
| **Scalability**     | Can the system handle more load (traffic, data, users)?           |
| **Availability**    | Can the system stay online and responsive even if things fail?    |
| **Fault Tolerance** | Can parts of the system fail without taking the whole thing down? |

1. **Horizontal scaling**

- Add more machines / instances to share load.
- Use NGINX or HAProxy to balance load between them.

```plaintext
    Request
        |
        v
    Load Balancer
        |
        v
    App Instance 1
    App Instance 2
    App Instance 3
```

2. **Vertical Scaling**

- Upgrade one machine’s power (more RAM, CPU).
- **Example:** Upgrade an AWS EC2 from `t3.medium` to `m5.2xlarge`.

3. **Microservice Architecture**

- Break a monolith into focused services.
- **Example:** AuthService, OrderService, NotificationService

4. **Caching**

- Store frequently requested data in memory.
- **Example (Redis):** Slow DB query results, Session data, Product data

5. **Database Scaling**

- **Sharding:** Split data across DBs (e.g., by region)
- **Replication:** Read-only DB copies for scaling reads
- **Query optimization:** Indexes, denormalization, fewer joins

**Example:**

- MongoDB replica set = 1 primary + multiple read replicas

6. **Asynchronous Processing**

- Use background workers for long tasks. Faster response, smooth UI.
- Example: use RabbitMQ for email sending tasks.

7. **CDN (Content Delivery Network)**

- Distribute static content near the user.
- **Example:** serve js, css, fonts, images, vids
- Tools: **CloudFront**, **Akamai**

8. **Stateless Architecture**

- Each request is independent of others.
- **Example:** No session on server. Each request includes auth + payload

9. **Auto-Scaling**

- System adds/removes servers automatically.
- Efficient resource usage, handles spikes.
- **Example (AWS Auto Scaling):** add / remove more EC2 instances depending on load.

10. **Deployment & Rollbacks**

- Ensure minimal downtime and the ability to quickly roll back changes.
- **Example:** Using Docker and Kubernetes for deployment and scaling management.

### Circuit Breaker

A **Circuit Breaker** is a software mechanism that detects failures, counts them and stops calling a failing service until it starts working again.

`Service --> (Circuit Breaker) --> Resource`

- **Closed State**: No problem
- **Open State**: Problem. Number of errors exceeds a certain threshold within a set time period
- **Half-Open State**: After the "cooldown" time checks a resource health on a limited amount of requests then switches to either close or open again.
