FROM node:10.18-alpine

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN  apk update && \
    apk add --no-cache --virtual build-pkg build-base python2 && \
    npm install --production --silent && \
    mv node_modules ../ && \
    apk del build-pkg
COPY . .

EXPOSE 3000

CMD npm start
