ARG NODE_VERSION=20.9.0
ARG ALPINE_VERSION=3.18
ARG PORT=5000

FROM node:${NODE_VERSION}-bookworm AS base

CMD "mkdir -p /algo-with-me"
WORKDIR /algo-with-me
COPY --chmod=555 ./node-sh /algo-with-me/node-sh
COPY . /algo-with-me

RUN apt update \
    && npm install -g pnpm \
    && pnpm install

SHELL ["/bin/bash", "-ec"]

EXPOSE ${PORT}

CMD node dist/app.js
