# Use Node 22
FROM node:22

# Set environment variables for Puppeteer
ENV PUPPETEER_CACHE_DIR=/tmp/puppeteer-cache
ENV NODE_ENV=production

# Install dependencies needed for Puppeteer/Chromium
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    ca-certificates \
    fonts-liberation \
    libnss3 \
    libxss1 \
    lsb-release \
    xdg-utils \
    chromium \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install Node dependencies
RUN npm install --production

# Copy the rest of the app
COPY . .

# Expose the port your app uses
EXPOSE 5050

# Start the server
CMD ["npm", "start"]
