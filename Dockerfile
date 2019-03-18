FROM node:10-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package-lock.json /usr/src/app/
COPY package.json /usr/src/app/
RUN npm ci

COPY . /usr/src/app

RUN npm test
RUN npm run build

ENTRYPOINT ["npm", "start"]