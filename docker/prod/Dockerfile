FROM node:16-alpine as build_step

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --ignore-engines

COPY . /app

RUN yarn build


FROM node:16-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=build_step /app/build .

CMD ["serve", "-s", "-l", "3000"]
