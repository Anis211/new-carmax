FROM node:20-bookworm AS builder

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --frozen-lockfile --only=prod

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Final minimal stage
FROM node:20-bookworm AS release

# Reuse same working dir
WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/.next/standalone .next/standalone
COPY --from=builder /app/public public
COPY --from=builder /app/src src
COPY --from=builder /app/next.config.mjs next.config.mjs
COPY --from=builder /app/package*.json ./

# Expose port used by Next.js
EXPOSE 3000

# Start the app
CMD ["node", ".next/standalone/server.js"]