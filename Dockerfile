# Install dependencies only when needed
FROM node:18-slim AS deps

# 安裝 SSL 相關套件，確保 Prisma binary 相容
RUN apt-get update && \
    apt-get install -y openssl ca-certificates && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM node:18-slim AS builder

WORKDIR /app

# 拷貝安裝好的依賴
COPY --from=deps /app/node_modules ./node_modules

COPY . .

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

# 指定 Prisma binary target（請確保你已在 schema.prisma 中設定 binaryTargets）
RUN npx prisma generate

# 移除開發環境用的檔案
RUN rm -f .env.local

RUN npm run build

# Production image
FROM node:18-slim AS runner

WORKDIR /app

ENV NODE_ENV=production

# 安裝 SSL 支援
RUN apt-get update && \
    apt-get install -y openssl ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# 拷貝建構好的應用程式
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

# 開放 port
EXPOSE 3000
ENV PORT=3000

# 啟動前執行 migration，再啟動 server
CMD npx prisma migrate deploy && node server.js