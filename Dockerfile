FROM node:18-alpine as build

WORKDIR /app

# Increase Node.js memory limit
ENV NODE_OPTIONS=--max-old-space-size=4096

COPY ./package.json ./package.json

RUN npm install

ARG REACT_APP_API_BASE_URL
ARG REACT_APP_KAKAO_REST_API_KEY

ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL
ENV REACT_APP_KAKAO_REST_API_KEY=$REACT_APP_KAKAO_REST_API_KEY

COPY . .

RUN npm run build

# FROM build as dev

# CMD ["npm", "run", "serve"]

FROM nginx:latest as prod

COPY --from=build /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]