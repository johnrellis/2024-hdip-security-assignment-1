FROM node:8

WORKDIR /usr/app

COPY package.json .
RUN npm install

COPY app.js .
COPY routes routes