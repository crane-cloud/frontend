FROM node:16-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --ignore-engines

COPY . /app

EXPOSE 3000

CMD ["yarn", "start"]