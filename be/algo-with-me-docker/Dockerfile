ARG NODE_VERSION=18.16.0
ARG ALPINE_VERSION=3.18

FROM node:${NODE_VERSION}-alpine
MAINTAINER Yechan Lee <yechan24680@gmail.com>

CMD "mkdir -p /algo-with-me"

WORKDIR /algo-with-me
COPY . /algo-with-me
RUN npm install

EXPOSE 3000

CMD ["node", "./dist/app.js"]
