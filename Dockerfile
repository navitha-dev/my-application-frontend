# Stage 1: Build the React Application
FROM node:18-alpine AS build
WORKDIR /app

# Install dependencies exclusively for caching
COPY package*.json ./
RUN npm ci

# Copy the rest of the frontend source
COPY . .

# Build for production
RUN npm run build

# Stage 2: Serve the statically built files with highly optimized NGINX
FROM nginx:alpine

# Copy built frontend assets to Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expose standard web port
EXPOSE 80

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
