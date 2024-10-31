FROM node:18-alpine as build

WORKDIR /app

# Increase Node.js memory limit
ENV NODE_OPTIONS=--max-old-space-size=4096

COPY ./package.json ./package.json

RUN npm install

ARG VITE_API_BASE_URL
ARG VITE_KAKAO_REST_API_KEY
ARG VITE_REDIRECT_URL

ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_KAKAO_REST_API_KEY=$VITE_KAKAO_REST_API_KEY
ENV VITE_REDIRECT_URL=$VITE_REDIRECT_URL

COPY . .

RUN npm run build

# FROM build as dev

# CMD ["npm", "run", "serve"]

FROM nginx:latest as prod

COPY --from=build /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]