# Stage de développement
FROM node:20 AS development
WORKDIR /app
COPY package*.json ./
COPY node_modules ./node_modules
COPY . .
EXPOSE 4200
CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--poll", "2000"]
# Stage de build
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
COPY node_modules ./node_modules
COPY . .
RUN npm run build

# Stage production
FROM nginx:alpine AS production
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html
RUN echo 'server { \
listen 80; \
location / { \
root /usr/share/nginx/html; \
index index.html; \
try_files $uri $uri/ /index.html; \
} \
}' > /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]