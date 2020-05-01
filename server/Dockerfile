FROM node:12.16.3-alpine as builder
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .
RUN yarn build

FROM node:12.16.3-alpine
WORKDIR /app
COPY --from=builder /app .
EXPOSE 4040
CMD ["yarn", "start"]