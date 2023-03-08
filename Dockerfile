FROM node:16.15.1

WORKDIR /app

RUN apt-get update

COPY "package.json" .

RUN yarn

COPY . .

CMD ["yarn", "dev"]