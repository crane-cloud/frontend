FROM node:23-alpine as build_step

WORKDIR /app

RUN corepack enable && corepack prepare yarn@4.6.0 --activate

COPY package.json yarn.lock* ./
RUN yarn install

COPY . /app

RUN yarn build


FROM nginx:1.25-alpine as production 

COPY --from=build_step /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf 

EXPOSE 80 

CMD ["nginx", "-g", "daemon off;"]
