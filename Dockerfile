# Use Node 22 slim base
FROM node:22-slim

# Install system dependencies for Chromium
RUN apt-get update && apt-get install -y \
    ca-certificates \
    fonts-liberation \
    libnss3 \
    libxss1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libgtk-3-0 \
    libx11-xcb1 \
    xvfb \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Ensure Puppeteer downloads Chromium
ENV PUPPETEER_SKIP_DOWNLOAD=false
RUN npm ci --omit=dev

# Copy the rest of the code
COPY . .

EXPOSE 5050

CMD ["npm", "start"]
