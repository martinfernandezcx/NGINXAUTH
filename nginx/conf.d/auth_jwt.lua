local jwt = require "resty.jwt"
local jwt_secret = "my_secret"

local auth_header = ngx.var.http_Authorization
if not auth_header then
    ngx.status = ngx.HTTP_UNAUTHORIZED
    ngx.say("Missing Authorization header")
    return ngx.exit(ngx.HTTP_UNAUTHORIZED)
end

local _, _, token = string.find(auth_header, "Bearer%s+(.+)")
if not token then
    ngx.status = ngx.HTTP_UNAUTHORIZED
    ngx.say("Invalid Authorization header format")
    return ngx.exit(ngx.HTTP_UNAUTHORIZED)
end

local jwt_obj = jwt:verify(jwt_secret, token)
if not jwt_obj["verified"] then
    ngx.status = ngx.HTTP_UNAUTHORIZED
    ngx.say("Invalid token: ", jwt_obj.reason)
    return ngx.exit(ngx.HTTP_UNAUTHORIZED)
end

ngx.req.set_header("X-User-ID", jwt_obj.payload.sub)
