# JWT Authentication at Nginx Proxy Layer

This project demonstrates how to enforce JWT-based authentication at the Nginx gateway using OpenResty and Lua. Instead of handling token validation in your backend services, Nginx inspects the JWT and blocks unauthorized requests before they reach your microservices.

## 📐 Architecture

- **nginx**: Gateway using OpenResty to validate JWT tokens via Lua.
- **auth-api**: Microservice that issues JWT tokens upon login.
- **node-api**: Microservice with both public and protected routes.

```
client
  │
  ├── [Login] ──▶ auth-api (/api/auth/login) ──▶ JWT
  │
  └── [Requests with JWT]
        │
        └──▶ nginx (validates JWT)
               ├── valid ▶ node-api (/api/protected)
               └── invalid ▶ 401 Unauthorized
```

## 🐳 Run with Docker Compose

```bash
git clone https://github.com/your-user/jwt-nginx-proxy.git
cd jwt-nginx-proxy
docker-compose up --build
```

- Access the login endpoint: [http://localhost:8080/api/auth/login](http://localhost:8080/api/auth/login)
- Access public route: [http://localhost:8080/api/public](http://localhost:8080/api/public)
- Access protected route:
  - Use a tool like [Postman](https://www.postman.com/) or `curl`:
  
    ```bash
    curl -H "Authorization: Bearer <your_token>" http://localhost:8080/api/protected
    ```

## 🔐 How JWT Validation Works

- Lua script (`auth_jwt.lua`) inside Nginx:
  - Extracts the token from the `Authorization` header.
  - Verifies the token using the shared secret (`my_secret`).
  - Injects the `sub` claim into the `X-User-ID` header if valid.
- If the token is invalid or missing, Nginx returns a 401 before proxying.

## 🧾 Example Token

```json
{
  "sub": "123",
  "role": "admin",
  "iat": ...,
  "exp": ...
}
```

## 🧩 Folder Structure

```
jwt-nginx-proxy/
├── docker-compose.yml
├── nginx/
│   ├── Dockerfile
│   └── conf.d/
│       ├── api.conf
│       └── auth_jwt.lua
├── auth-api/
│   └── index.js
├── node-api/
│   └── index.js
└── jwt-nginx-auth.md  ← Full blog-style explanation
```

## 📘 Related

- [`lua-resty-jwt`](https://github.com/SkyLothar/lua-resty-jwt): Lua library to handle JWT validation.
- [OpenResty](https://openresty.org/): Full-fledged web platform based on Nginx + LuaJIT.

## ✅ Why This Pattern?

Using a reverse proxy like Nginx to handle authentication:

- Reduces duplicated logic in services
- Centralizes access control
- Keeps microservices focused on business logic

---

MIT License © 2025
