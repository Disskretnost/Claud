# dev
FROM node:17.5.0-alpine AS dev
RUN apk add --no-cache tzdata
ENV TZ Europe/Moscow
ENV NODE_PATH /opt/server/node_modules

WORKDIR /opt/server/
COPY /*.json ./

RUN npm install
COPY . .

#CMD [ "node", "index.js" ]

# production
FROM node:17.5.0-alpine AS production
RUN apk add --no-cache tzdata
ENV TZ Europe/Moscow
ENV NODE_PATH /opt/server/node_modules

WORKDIR /opt/server/

COPY /*.json ./
RUN npm i

CMD ["sh", "-c", "npm run start"]