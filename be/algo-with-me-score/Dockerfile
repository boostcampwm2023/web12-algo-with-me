FROM node:20

WORKDIR /algo-with-me-score
COPY ./ ./

RUN npm install -g pnpm \
    && pnpm install

EXPOSE 4000

CMD ["pnpm", "run", "start:dev"]
