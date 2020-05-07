FROM node:12.16.3 as builder
RUN apk add --no-cache git
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .
RUN node ace build --production
RUN yarn install --production --cwd ./build

FROM node:12.16.3-alpine
WORKDIR /app
COPY --from=builder /app .
EXPOSE 3333
CMD ["node", "server.js"]
