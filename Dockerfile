# Dockerfile
# Use official Node image
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json yarn.lock ./
RUN npm install --frozen-lockfile

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Final stage: Minimal image for production
FROM node:20-alpine AS release

# Reuse the same WORKDIR
WORKDIR /app

# Copy built files from base stage
COPY --from=base /app ./

# Expose port used by Next.js
EXPOSE 3000

# Start the app
CMD ["npm", "start"]