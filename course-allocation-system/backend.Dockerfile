FROM oven/bun:1 AS pruner
WORKDIR /app
COPY . .
RUN bunx turbo prune --scope=backend --docker

FROM oven/bun:1 AS runner
WORKDIR /app

# First install dependencies (this step is cached unless package.json changes)
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/bun.lock ./bun.lock
RUN bun install

# Then copy the actual source code
COPY --from=pruner /app/out/full/ .
COPY turbo.json turbo.json

# Generate Prisma Client (required for db package)
WORKDIR /app/packages/db
RUN bunx prisma generate

# Start the backend
WORKDIR /app/apps/backend
EXPOSE 4000
CMD ["bun", "index.ts"]
