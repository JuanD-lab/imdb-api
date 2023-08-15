# syntax=docker/dockerfile:1

FROM node:14.18.0 as builder
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
COPY . .

FROM builder as migration
ENV NODE_ENV=development
RUN npm install
CMD ["npm", "run", "migrate"]

FROM builder as production
ENV NODE_ENV=production
CMD [ "node", "server.js" ]
