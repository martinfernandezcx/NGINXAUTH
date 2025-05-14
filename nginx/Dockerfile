FROM openresty/openresty:alpine

# Install Perl, curl and other required dependencies
RUN apk add --no-cache perl curl

# Create nginx user and group
RUN addgroup -S nginx && adduser -S -G nginx nginx

# Install JWT module
RUN opm install SkyLothar/lua-resty-jwt

# Copy configuration
COPY nginx.conf /usr/local/openresty/nginx/conf/nginx.conf
COPY mime.types /etc/nginx/mime.types
COPY conf.d/ /etc/nginx/conf.d/

# Create log directory and set permissions
RUN mkdir -p /var/log/nginx && \
    chown -R nginx:nginx /var/log/nginx
