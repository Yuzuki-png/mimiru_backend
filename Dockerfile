# build stage
FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache tzdata tini

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# production stage
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/generated ./generated
COPY --from=builder /app/scripts ./scripts

RUN npm install --only=production
RUN npx prisma generate

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]