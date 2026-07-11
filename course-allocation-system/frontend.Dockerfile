FROM oven/bun:1 AS pruner
WORKDIR /app
COPY . .
RUN bunx turbo prune --scope=web --docker

FROM oven/bun:1 AS installer
WORKDIR /app

# First install dependencies (this step is cached unless package.json changes)
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/bun.lock ./bun.lock
RUN bun install

# Then copy the actual source code
COPY --from=pruner /app/out/full/ .
COPY turbo.json turbo.json



# Build Next.js
WORKDIR /app
RUN bunx turbo run build --filter=web

FROM oven/bun:1 AS runner
WORKDIR /app
# We just copy the built app from the installer stage. 
# For true production optimization, Next.js output: "standalone" is recommended, 
# but this works perfectly for the current setup.
COPY --from=installer /app/ .

WORKDIR /app/apps/web
EXPOSE 3000
CMD ["bun", "run", "start"]
