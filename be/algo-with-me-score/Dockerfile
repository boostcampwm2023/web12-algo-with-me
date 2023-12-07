FROM node:20

RUN npm install -g pnpm

RUN groupadd -g 1001 be \
    && useradd -r -m -u 1001 -g be be
USER be

WORKDIR /algo-with-me-score
COPY --chown=be:be ./ ./

RUN pnpm install

EXPOSE 4000-4999

CMD ["pnpm", "run", "start:dev"]
