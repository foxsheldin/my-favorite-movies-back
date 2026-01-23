FROM node:24-alpine AS base
WORKDIR /webapp/server

FROM base AS dev
ADD package.json yarn.lock ./
RUN yarn install
COPY ./test ./test
COPY .eslintrc.js .prettierrc tsconfig.json tsconfig.build.json nest-cli.json ./
COPY ./src ./src
COPY schema.gql ./
CMD ["yarn", "start:dev"]

FROM dev AS build
RUN yarn build

FROM base AS production
COPY package.json yarn.lock /webapp/server/
RUN yarn install --production
COPY ./node_modules/typeorm ./node_modules/typeorm
COPY --from=build /webapp/server/dist ./dist
CMD ["node", "./dist/main.js"]
EXPOSE ${APP_PORT}

