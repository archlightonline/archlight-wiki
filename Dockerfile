FROM node:20-alpine

WORKDIR /app

# Install pnpm directly without corepack
RUN npm install -g pnpm@9.15.4

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source
COPY . .

# Build frontend
RUN pnpm build

EXPOSE 3000

# Drop root: run the server as an unprivileged user.
RUN addgroup -S app && adduser -S app -G app
USER app

# package.json "start" runs `tsx server/index.ts`
CMD ["pnpm", "start"]
