# Node Version
FROM node:18

# Working Directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Expose port
EXPOSE 8080

# Start the app
CMD ["npm", "start"]
