FROM node:20-bookworm

RUN mkdir -p /home/node/jtwebserver/node_modules && chown -R node:node /home/node/jtwebserver

WORKDIR /home/node/jtwebserver

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "node", "src/server.js" ]
