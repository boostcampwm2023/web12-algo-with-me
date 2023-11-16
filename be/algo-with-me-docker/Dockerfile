ARG NODE_VERSION=20.9.0
ARG ALPINE_VERSION=3.18
ARG PORT=3000

FROM node:${NODE_VERSION}-alpine AS base

CMD "mkdir -p /algo-with-me"
WORKDIR /algo-with-me
COPY --chmod=555 ./node-sh /algo-with-me/node-sh
COPY . /algo-with-me

RUN apk update  \
    && npm install -g pnpm \
    && pnpm install

EXPOSE ${PORT}

CMD node dist/app.js
