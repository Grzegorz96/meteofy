FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/api/package.json apps/api/
COPY packages/shared/package.json packages/shared/
RUN npm ci -w api -w @meteofy/shared --include-workspace-root
COPY apps/api apps/api
COPY packages/shared packages/shared
RUN npm run build -w @meteofy/shared && npm run build -w api
CMD ["node", "apps/api/dist/index.js"]
