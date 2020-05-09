FROM node:12.16.3 as builder
RUN apt install git
WORKDIR /app
COPY package.json .
RUN yarn
COPY . .
RUN node ace build --production
RUN yarn install --production --cwd ./build

FROM node:12.16.3-alpine
WORKDIR /app
COPY --from=builder /app/build .
EXPOSE 3333
CMD ["node", "server.js"]
