FROM node:20

RUN npm install -g pnpm

RUN groupadd -g 1001 be \
    && useradd -r -m -u 1001 -g be be
USER be

WORKDIR /algo-with-me-api
COPY --chown=be:be ./ ./

RUN pnpm install

EXPOSE 3000

CMD ["pnpm", "run", "start:dev"]
