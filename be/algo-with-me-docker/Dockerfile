ARG NODE_VERSION=20.9.0
ARG ALPINE_VERSION=3.18
ARG PORT=5000

FROM node:${NODE_VERSION}-bookworm AS base

RUN npm install -g pnpm

RUN groupadd -g 1001 be \
    && useradd -r -m -u 1001 -g be be
USER be

CMD "mkdir -p /algo-with-me"
WORKDIR /algo-with-me
COPY --chmod=555 --chown=be:be ./node-sh /algo-with-me/node-sh
COPY --chown=be:be . /algo-with-me

RUN pnpm install

SHELL ["/bin/bash", "-ec"]

EXPOSE ${PORT}

CMD node src/app.js
