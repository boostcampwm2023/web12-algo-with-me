FROM node:20

WORKDIR /algo-with-me-api
COPY ./ ./

RUN npm install -g pnpm \
    && pnpm install

EXPOSE 3000

CMD ["pnpm", "run", "start:dev"]
