FROM node:16-alpine

ENV AP /data/app
RUN mkdir -p $AP/node_modules && chown -R node:node $AP
WORKDIR $AP

RUN npm i -g @nestjs/cli
COPY package*.json ./
RUN npm install
COPY . .
COPY --chown=node:node . .

EXPOSE 8080
CMD [ "npm", "run", "start:dev" ]
