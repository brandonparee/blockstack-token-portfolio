FROM node:8.7.0

ENV NPM_CONFIG_LOGLEVEL WARN

RUN npm install -g yarn

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn --pure-lockfile

COPY public ./public
COPY config ./config
COPY scripts ./scripts
COPY src ./src
COPY server/server.js server.js

RUN yarn build
CMD ["node", "./server.js"]
