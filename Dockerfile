# Dockerfile
FROM node:20-bookworm AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --only=prod

COPY . .

RUN npm run build

FROM node:20-bookworm AS release

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3000

CMD ["node", ".next/standalone/server.js"]