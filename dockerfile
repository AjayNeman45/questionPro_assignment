# Use official Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies first (so it can be cached)
RUN npm install

# Copy the entire project
COPY . .

# Expose the application port
EXPOSE 5000

# Copy and set permissions for entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Use entrypoint script
ENTRYPOINT ["/entrypoint.sh"]

# Start the application
CMD ["npm", "run", "dev"]
