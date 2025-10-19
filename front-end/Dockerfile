# Étape 1 : Build de l’application React
FROM node:18-alpine AS build
WORKDIR /app

# Copier les fichiers et installer les dépendances
COPY package*.json ./
RUN npm install
COPY . .

# Passer la variable API URL au moment du build si nécessaire
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# Étape 2 : Nginx pour servir le frontend
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copier les fichiers buildés
COPY --from=build /app/dist .

# Exposer le port 80
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
