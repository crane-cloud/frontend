FROM node:10.16.0-alpine as build_step

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY . /app

RUN yarn build


FROM node:10.16.0-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=build_step /app/build .

CMD ["serve", "-s", "-l", "3000"]