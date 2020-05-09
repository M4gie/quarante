FROM node:12.16.3-alpine as builder
WORKDIR /app
RUN apk add --no-cache git
COPY . .
RUN yarn
RUN cd server && yarn build

FROM node:12.16.3-alpine
WORKDIR /app
COPY --from=builder /app/server/dist .
COPY --from=builder /app/server/package.json .
RUN yarn --production
EXPOSE 4240
CMD ["node", "index.js"]