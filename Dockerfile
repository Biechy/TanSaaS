# Use an official Node.js image
FROM node:24-alpine

# Install git (required for npx gitpick)
RUN apk add --no-cache git

# Set the working directory
WORKDIR /app

# Copy this file for the build
COPY . .

# Install dependencies
RUN npm install

# Expose port 3000 (Vite's default port)
EXPOSE 3000

# Start the development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
