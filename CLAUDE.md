# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a **comprehensive learning resource** for building production-grade Node.js backends. It contains:
- **Numbered documentation files** (1-18): Structured curriculum covering backend concepts
- **js_ts_tasks/**: Practical coding challenges for JavaScript/TypeScript fundamentals
- **interviews/**: Real-world application examples and technical interview materials
- **backend_tasks/**: Specific backend implementation tasks

**Note**: This is primarily a knowledge base and learning repository, not a runnable application with build/test scripts.

## High-Level Architecture

### Core Technology Stack

**Runtime & Frameworks:**
- Node.js with event-driven, non-blocking I/O architecture
- NestJS (TypeScript-first, dependency injection, structured modules)
- Express/Fastify (underlying HTTP frameworks)

**Data Layer:**
- PostgreSQL (primary: relational, ACID, transactions)
- MongoDB (NoSQL alternative)
- Redis (in-memory caching)
- ClickHouse (time-series analytics)

**Asynchronous Communication:**
- RabbitMQ (message broker with AMQP, manual/auto acknowledgement)
- Kafka (distributed event streaming)

**Infrastructure & Deployment:**
- Docker (containerization, image/container separation)
- Kubernetes (container orchestration, service discovery)
- Docker Compose (local multi-container development)

**Observability:**
- Prometheus (pull-based metrics collection with PromQL)
- Grafana (metrics visualization and alerting)
- Pino/Winston (structured logging)
- Filebeat (log shipping)

### Key Architectural Patterns

**Microservice Communication:**
- **Synchronous**: REST/HTTP (immediate response needed) or gRPC (internal services, HTTP/2)
- **Asynchronous**: RabbitMQ/Kafka (fire-and-forget, decoupled operations)

**Distributed Transactions:**
- **Saga Pattern**: Break multi-service transactions into steps with compensating actions
  - Choreography: Event-driven, decentralized
  - Orchestration: Central coordinator (Temporal, Zeebe, AWS Step Functions)
- **Transactional Outbox**: Guarantee event delivery by writing to database first

**Data Consistency:**
- **Strong Consistency** (C+P in CAP): Prioritize consistency (financial data, banking)
- **Eventual Consistency** (A+P in CAP): Accept temporary inconsistency (user profiles, analytics)
- Choose based on business requirements, not dogma

**Design Patterns Covered:**
- Domain-Driven Design (DDD): Entities, Value Objects, Aggregates, Bounded Contexts
- Clean Architecture: Entities → Use Cases → Interface Adapters → Frameworks
- Event Sourcing: Store events, replay to reconstruct state
- CQRS: Separate read and write models with different databases
- Circuit Breaker: Detect failures, stop calling failing services

### Node.js Non-Blocking I/O Architecture

**Does NOT block the event loop:**
- Network requests, database queries, DNS lookups, file system operations

**Does block (CPU-intensive):**
- Parsing large JSON, cryptographic operations, image processing
- **Solution**: Break into chunks using `setImmediate()` or worker threads

**Event Loop Execution Order:**
1. Call Stack (synchronous code)
2. Microtask Queue (Promises, `queueMicrotask()`)
3. Macrotask Queue (setTimeout, setInterval, I/O callbacks)

LibUV thread pool (default 4 threads) handles blocking operations without blocking the main thread.

### Caching Strategies

**Cache-Aside (Lazy Loading):**
- Application checks cache first, loads from DB on miss
- Simple but requires cache invalidation logic

**Write-Through:**
- Simultaneous write to cache and DB
- Strong consistency but slightly slower writes

**Write-Behind (Write-Back):**
- Write to cache immediately, queue DB writes
- Fast writes but eventual consistency (risk of data loss if cache fails)

**Implementation Considerations:**
- TTL (time-to-live) for automatic expiration
- Invalidation strategies: direct (on write), time-based (TTL), lazy (on read), tag-based
- Database-level caching: PostgreSQL shared buffers, materialized views

### RabbitMQ Messaging Patterns

**Core Components:**
- Connection → Channel → Exchange → Queue → Consumer
- Exchange types: Direct (exact match), Topic (pattern match), Fanout (broadcast), Headers (custom)

**Reliability Levels:**
- **Fire-and-forget**: No guarantees (unreliable)
- **At-least-once**: May process twice (requires idempotency key)
- **Exactly-once**: Complex to implement, rarely needed

**Best Practices:**
- Use **manual acknowledgement** (`noAck: false`) for critical operations
- Set **prefetch size** (quality of service) to limit concurrent message processing
- Use **Durable** queues and **Persistent** messages for critical data
- Implement **Dead Letter Exchange (DLX)** for failed message handling
- Use separate channels for producers and consumers

### NestJS Framework Architecture

**Core Concepts:**
- **Modules**: `@Module()` - fundamental building blocks, organize code into cohesive units
- **Controllers**: `@Controller()` - handle HTTP requests, route to services
- **Providers**: Services, repositories, factories - anything injectable via dependency injection
- **Services**: `@Injectable()` - encapsulate business logic
- **Pipes**: Transform/validate input data (built-in: ValidationPipe, ParseIntPipe)
- **Interceptors**: Extend method functionality before/after execution (logging, transformation)
- **Guards**: Authentication and authorization (e.g., JwtAuthGuard)
- **Exception Filters**: Centralized custom error handling
- **Decorators**: Add metadata (reduce boilerplate, enable cross-cutting concerns)
- **DTOs**: Data Transfer Objects define request/response structure

**Dynamic Modules:**
- `forRoot()` pattern for shared configuration (DB connections, API keys)
- `forFeature()` pattern for module-specific setup
- Enables runtime configuration and multi-tenancy support

**Dependency Injection:**
- Constructor injection enables testability and loose coupling
- Providers can be class-based, value, factory, or async factory

## Documentation Structure

The numbered files form a learning curriculum:

1. **1_start_here.md**: Prerequisites and learning path
2. **2_jwt_task.md**: Authentication with JSON Web Tokens
3. **3_databases.md**: SQL vs NoSQL, normalization, sharding, replication
4. **4_postgresql_tasks.md**: PostgreSQL-specific concepts and practices
5. **5_caching.md**: Redis caching strategies and patterns
6. **6_nodejs_ecosystem.md**: Event loop, async patterns, LibUV internals
7. **7_websockets.md**: Real-time bidirectional communication
8. **8_networking.md**: HTTP/HTTPS fundamentals
9. **9_rabbitmq.md**: Message queue patterns and RabbitMQ implementation
10. **10_clickhouse.md**: Time-series analytics database
11. **11_docker.md**: Containerization and Docker Compose
12. **12_kubernetes.md**: Container orchestration at scale
13. **13_monitoring_logging.md**: Structured logging, Filebeat, ELK Stack
14. **14_metrics.md**: Prometheus, Grafana, PromQL queries (RPS, latency, error rate)
15. **15_testing.md**: Unit/integration/E2E testing with Sinon.js, Nock
16. **16_microservice_architecture.md**: Complete system design patterns and scalability
17. **17_nestjs.md**: NestJS framework patterns and best practices
18. **18_soft_skill.md**: Professional development and communication

## When Making Changes

**Documentation Files:**
- Each numbered file covers a distinct topic
- Maintain the learning progression (start with prerequisites)
- Include practical PromQL queries for monitoring/metrics files
- Keep architecture files focused on "why" decisions matter

**Code Examples:**
- JavaScript/TypeScript files in `js_ts_tasks/` are practice problems
- Include realistic patterns from `interviews/` when discussing real-world scenarios

**Cross-References:**
- Link between related concepts (e.g., RabbitMQ → Microservices → Testing)
- Note dependencies between concepts (e.g., Event Loop prerequisite for async patterns)

## Common Patterns to Know

**When discussing databases:**
- Emphasize trade-offs: SQL (consistency, schema) vs NoSQL (flexibility, horizontal scale)
- Reference connection pooling for production systems
- Explain sharding vs replication for scaling

**When discussing caching:**
- Always mention invalidation strategy (not just how to cache)
- Highlight eventual consistency implications
- Note the cache stampede problem

**When discussing microservices:**
- Distinguish synchronous (REST/gRPC) vs asynchronous (RabbitMQ/Kafka) communication
- Explain saga pattern for distributed transactions
- Reference idempotency for message processing

**When discussing NestJS:**
- Use decorator-based examples (Guards, Pipes, Interceptors)
- Explain circular dependency resolution patterns
- Reference dynamic modules for configuration

**When discussing testing:**
- Clarify stub (fake) vs mock (assertions) vs spy (recording)
- Nock for HTTP mocking, Sinon for function mocking
- E2E tests should use real app instance against test database

**When discussing deployment:**
- Explain image vs container (blueprint vs running instance)
- Note `docker stop` (SIGTERM) vs `docker kill` (SIGKILL) gracefully
- Reference health checks and readiness probes for production
