# ======  Etapa 1: Build ======
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

ARG APIURL
ENV VITE_APIURL=${APIURL}

RUN npm run build

# ======  Etapa 2: Servir con Nginx ======
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

COPY --from=builder /app/dist ./
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
