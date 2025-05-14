FROM node:18-alpine

# Install curl for health checks
RUN apk add --no-cache curl

# Install Newman and HTML reporter
RUN npm install -g newman newman-reporter-htmlextra

WORKDIR /tests

# Copy test files
COPY . .

# Command to run tests
CMD ["sh", "-c", "newman run jwt-nginx-auth-tests.json -e container-environment.json -r htmlextra"] 