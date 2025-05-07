# Securing Microservices with JWT Validation at the Nginx Proxy Layer

In a microservices architecture, separating concerns is critical for maintainability, scalability, and security. One key decision when building APIs is how and where to handle authentication. A common pattern is to delegate authentication to a dedicated **authentication microservice**, which issues tokens (e.g., JWTs), and use those tokens to access protected resources on **independent backend APIs**.

This post demonstrates how to validate JWT tokens directly in **Nginx** before routing requests to your protected **Node.js API**, centralizing authorization enforcement at the gateway layer.

## Why JWT at the Proxy?

- **Decouples concerns**: Authentication logic doesn't pollute your API code.
- **Consistent enforcement**: All routes must pass the same token checks before hitting backend services.
- **Performance**: Nginx (especially via OpenResty) is efficient and fast at handling token validation.

## Options for JWT Validation

1. **Validate JWT in each backend service**
   - Pros: Full control per service.
   - Cons: Repeated logic, potential for inconsistency.
2. **Use Nginx with a third-party JWT module**
   - Commercial option with NGINX Plus.
3. **Use OpenResty (Nginx + Lua) with `lua-resty-jwt`**
   - Open-source, flexible, and efficient.

## Chosen Approach: OpenResty + Lua

We use OpenResty and the `lua-resty-jwt` library to inspect JWTs in the Nginx layer. If valid, we forward requests to the backend. Otherwise, Nginx returns a 401 response.

## Architecture

- `auth-api`: issues JWTs via login endpoint.
- `node-api`: protected and public routes.
- `nginx`: gateway with Lua-based JWT validation.

## Project Layout

You can find the full source here:  
**GitHub Repo: [github.com/example/jwt-nginx-proxy](https://github.com/example/jwt-nginx-proxy)**

## How It Works

1. Client logs in via `/api/auth/login`, receives JWT.
2. Client sends `Authorization: Bearer <token>` on protected requests.
3. Nginx runs a Lua script to:
   - Check token structure.
   - Validate signature and expiration.
   - Inject user ID into a request header.
4. Validated requests reach the Node.js service with identity attached.

## Conclusion

Centralizing JWT validation in the proxy simplifies backend services, enforces uniform security, and keeps authentication logic out of each microservice. This pattern is ideal for architectures using distinct auth and business logic APIs.

In contrast, validating tokens in the Node.js API itself might allow greater control over roles or context-based access logic but at the cost of duplication and potential inconsistency.

OpenResty strikes a solid balance between **performance**, **flexibility**, and **maintainability** in JWT-based authentication.
