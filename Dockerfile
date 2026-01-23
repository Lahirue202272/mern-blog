# Lightweight Alpine base
FROM node:22-alpine AS base

WORKDIR /app

# Install only production dependencies (better caching and smaller image)
COPY package.json package-lock.json* ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]