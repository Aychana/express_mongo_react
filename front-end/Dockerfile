# Étape 1 : Build
FROM node:22.18.0-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# Étape 2 : Serveur Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Ici on copie depuis l’alias "build"
COPY --from=build /app/dist .

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]