# syntax=docker/dockerfile:1
FROM ubuntu:22.04

# install app and dependencies
RUN apt-get update && apt-get install -y npm jq
RUN mkdir /barber-website

COPY barber-website/backend/ /barber-website/
COPY barber-website/frontend/ /barber-website/

WORKDIR /barber-website/backend/
RUN npm init -y
RUN npm install express
RUN npm install -D nodemon

RUN jq -s add package.json npm-scripts.json > package.json

# final configuration
EXPOSE 8080
CMD npm start