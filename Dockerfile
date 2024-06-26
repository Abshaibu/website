# Stage 1: Build the Vite app
FROM node:20-alpine as builder
# Set the working directory
WORKDIR /app
# Copy package.json and package-lock.json
COPY package.json package-lock.json ./
# Install dependencies
RUN npm install
# Ensure the node_modules/.bin directory is in PATH
ENV PATH /app/node_modules/.bin:$PATH
# Copy the rest of the application code
COPY . .
# Ensure scripts are executable
RUN chmod +x /app/node_modules/.bin/vite
# Build the Vite app
RUN npm run build
# Stage 2: Serve the built app with nginx
FROM nginx:alpine
# Copy the build output from the builder stage to the nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html
# Expose port 80
EXPOSE 80
# Start nginx server
CMD ["nginx", "-g", "daemon off;"]