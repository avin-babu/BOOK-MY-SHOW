# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all files
COPY . .

# Expose backend port
EXPOSE 3001

# Start the server
CMD ["npm", "start"]
