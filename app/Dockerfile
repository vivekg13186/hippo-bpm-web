# Use official Node.js LTS image
FROM node:22-alpine

# Set working directory inside container
WORKDIR /usr/src/app

# Copy package files first (for caching)
COPY package*.json ./


# Install dependencies
RUN npm install --production

# Copy application code
COPY . .

# Expose app port
EXPOSE 8080

# Command to run the app
CMD ["node", "server.mjs"]
