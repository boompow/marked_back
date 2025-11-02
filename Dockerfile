# Use smaller secure base
FROM node:22-slim

# Puppeteer environment variables
# ENV PUPPETEER_SKIP_DOWNLOAD=false
# ENV PUPPETEER_CACHE_DIR=/usr/src/app/node_modules/puppeteer/.local-chromium
# ENV PUPPETEER_EXECUTABLE_PATH=/usr/src/app/node_modules/puppeteer/.local-chromium/linux-*/chrome-linux64/chrome
# ENV NODE_ENV=production

# Install system dependencies for headless Chrome
RUN apt-get update && apt-get install -y \
    ca-certificates \
    fonts-liberation \
    libnss3 \
    libxss1 \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

# Copy package files first
COPY package*.json ./

# Install dependencies (includes Puppeteer)
RUN npm install --production

# Make sure Chrome is downloaded into the right place
RUN npx puppeteer browsers install chrome --path ./node_modules/puppeteer/.local-chromium

# Copy the rest of your code
COPY . .

EXPOSE 5050
CMD ["npm", "start"]
