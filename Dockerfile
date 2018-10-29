FROM node:8.9.1

RUN npm install -g yarn

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn --pure-lockfile

COPY public ./public
COPY public/manifest-prod.json ./public/manifest.json
COPY config ./config
COPY scripts ./scripts
COPY src ./src
COPY server ./server

RUN yarn build
CMD ["node", "./server/server.js"]
