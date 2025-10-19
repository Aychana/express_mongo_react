FROM node:22.18.0-alpine

WORKDIR /app

# Copier les fichiers package d'abord
COPY package*.json ./

# Installer toutes les dépendances (dont devDependencies)
RUN npm install

# Injecter l’URL de l’API au build
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# Étape 2 : Serveur Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

COPY --from=build /app/dist .

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
