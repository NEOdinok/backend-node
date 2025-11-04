# 🧠 JobHire Interview Questions (Backend / Fullstack)

## 🟨 JavaScript & TypeScript

What is synchronous vs asynchronous execution in JS?

What is the Streams API in Node.js? How does it differ from Worker Threads?

Can you block the event loop?

Which task queue could you spam to block the event loop?

TypeScript

Advantages / disadvantages of TypeScript.

Interface vs Type — when to use each?

From a CS perspective — what are types and interfaces?

What are Generics? Give a simple example.

Utility types: Omit, Record, Partial, Required — what do they do?

Promise.all, Promise.allSettled — difference?

What are the promise states (pending, fulfilled, rejected)?

Proper use of async/await with try/catch.

## 🟩 NestJS Core

What are TypeScript decorators?

How do NestJS decorators differ from TS decorators?

What is the Reflect API / reflect-metadata and how does Nest use it?

What are the main NestJS components and what is their purpose?

Module, Controller, Provider, Pipe, Guard, Interceptor, Middleware

What happens before the controller logic? (Middleware → Guard → Interceptor → Pipe)

What is onModuleInit() and when does it run?

Are NestJS pipes the same as Node.js streams?

Typical use cases for pipes.

Interceptor vs Guard — difference and use cases.

Can an interceptor modify the response structure? Should it?

## 🟦 Observability (Metrics & Logging)

How are metrics (RPS, p95, duration, processed requests) collected in NestJS?

How to configure Prometheus, Grafana, and Loki for a Nest app?

How does Prometheus pull metrics?

How does Loki collect logs?

Have you connected a Nest app to a logging data source?

## 🟧 Databases
PostgreSQL

What databases and ORMs have you used?

Why did you switch from ORM to pgtyped?

What problems do ORMs cause (performance, complex queries, etc.)?

How did you verify performance issues were ORM-related?

How to compare a raw SQL query vs ORM query in large projects?

Difference between pgtyped and pgtype (Go).

How do you define relations without an ORM in pgtyped?

How are transactions handled in pgtyped (e.g., SELECT FOR UPDATE)?

What are isolation levels in Postgres? How do you set them?

What is the default isolation level and why?

How to detect locks or transaction conflicts in Postgres?

What are indexes in Postgres? What is a GIN index?

MongoDB

What are MongoDB’s advantages for some tasks?

Can Mongo create relations between documents?

Can you embed documents or reference them?

What is aggregation in Mongo? Is it like JOIN/GROUP BY in SQL?

## 🟥 Messaging / Event-Driven Design

Which message brokers have you worked with?

How to delay message reprocessing after failure (avoid infinite retry loop)?

What is a Dead Letter Queue? Is it built into RabbitMQ or needs setup?

Dead Letter pattern vs Transactional Outbox — examples.

What types of exchanges exist in RabbitMQ?

What is a fanout exchange?

Fanout vs Topic — difference?

What are Pub/Sub and Work Queue patterns (in EDD)?

What does idempotency mean in message-based microservices?

What are Event, Entity, and Value Object in DDD?

## 🟩 Microservices & Communication

Is HTTP between microservices “normal”? Why is it considered legacy by some?

How do gRPC and message queues differ from HTTP?

What is a guaranteed message delivery — which layer handles it?

What is Event-Driven Design?

## 🟦 Databases (Mongo vs Postgres follow-ups)

Why might migrations be hard in Postgres and easier in Mongo?

What kind of features are easier to evolve in Mongo?

## 🟨 Docker & Networking

How does an app in a Docker container connect to a Postgres DB on the host?

What if both app and Postgres run in different containers?

How do containers communicate (host ↔ container ↔ container)?

What is host.docker.internal?

What is a Docker bridge?

What does 172.0.1.17 mean?

What is a user-defined Docker network?

Why use Docker Swarm instead of Kubernetes?

## 🟫 Architecture & Design

What problems can appear with microservice architecture?

Explain Domain-Driven Design: entities, value objects, aggregates.

Explain Event-Driven Design and give a practical example.