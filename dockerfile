# Use Node.js base image
FROM node:alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy backend source code
COPY backend ./backend

# Expose port 3000
EXPOSE 3000

# Command to run the backend service
CMD ["node", "backend/server.js"]
