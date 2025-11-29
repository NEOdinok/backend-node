# Security

*Main things to prevent:*
- DDoS
- Unauthorized requests

## Basic api security

*Gateway (Nginx) level*
- `limit_req` (RPS for IP)
- `limit_conn` (connections for IP),
- `client_max_body_size`
- read / write timeouts `client_body_timeout`, `keepalive_timeout`.

*APP level*
- `@nestjs/throttler` (global throttler), `AuthGuard(Jwt)`, `RolesGuard`

## Basic authorization
- JWT
- Bearer
- separate prefix for admin endpoints and more strict auth rules