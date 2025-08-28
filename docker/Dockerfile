# syntax = docker/dockerfile:1

ARG NODE_VERSION
ARG PORT=3000

FROM node:${NODE_VERSION}-slim AS base

ENV NODE_ENV=production

WORKDIR /src

# Build
FROM base AS build

COPY --link package.json package-lock.json /src/

RUN npm install --omit=dev

COPY --link . .

RUN npm run build
RUN npm prune

# Run
FROM base

ENV PORT=${PORT}

COPY --from=build /src/.output /src/.output
# Optional, only needed if you rely on unbundled dependencies
# COPY --from=build /src/node_modules /src/node_modules

CMD [ "node", ".output/server/index.mjs" ]
