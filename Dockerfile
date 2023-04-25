FROM node:18-alpine3.14 AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY . ./

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi
RUN yarn build

ENV NODE_ENV production
EXPOSE 3000
ENV PORT 3000

CMD ["npm", "run", "start"]