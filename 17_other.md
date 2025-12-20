# Other things that you need to know on a high-level

## Security 

*Main things to prevent:*
- DDoS
- Unauthorized requests

### Basic api security

*Gateway (Nginx) level*
- `limit_req` (RPS for IP)
- `limit_conn` (connections for IP),
- `client_max_body_size`
- read / write timeouts `client_body_timeout`, `keepalive_timeout`.

*APP level*
- `@nestjs/throttler` (global throttler), `AuthGuard(Jwt)`, `RolesGuard`

<!-- WIP: -->
### Basic authorization
- JWT, Refresh, Session 
- Bearer
- separate prefix for admin endpoints and more strict auth rules

## Devops, clouds, other DBs

**Events:**
- `EventBridge` (AWS) - rules-based **event bus**. Routes events between Lambdas, SQS, other AWS services
- `SQS` (AWS) - simple queue
- `NATS` - Simple messaging system. Very fast, lightweight. Popular in Go (Golang) world.

**Databases:**
- `DynamoDB` (AWS) - Database key–value / NoSQL, serverless, auto-scaling
- `BigQuery` (GCP) - Database OLAP. similar to clickhouse, SQL-like syntax
- `Memcached` - Simple Redis. Basically distributed hashmap. Only SET, GET, DEL. Only strings
- `Cassandra` - **weird**, complex to operate. NoSQL, designed for huge-scale

**Other things:**
- `Terraform` - Infrastructure as service "I want 2 servers, 1 queue, connected like this". Used with AWS, GCP, Azure
- `Lambda` (AWS) - Serverless function. Runs only when triggered, stateless, needs no dedicated always-on server.
- `Edge-function` - Lambda that runs georgraphically closest to you.





