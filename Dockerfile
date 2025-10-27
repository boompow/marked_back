# Use Node 22
FROM node:22

# Set Puppeteer cache for both Puppeteer and puppeteer-core
ENV PUPPETEER_CACHE_DIR=/opt/render/.cache/puppeteer
ENV NODE_ENV=production

# Install system dependencies required by Chromium
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    ca-certificates \
    fonts-liberation \
    libnss3 \
    libxss1 \
    lsb-release \
    xdg-utils \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

# Copy package.json first to leverage Docker cache
COPY package*.json ./

# Install Node dependencies
RUN npm install --production

# Download exact Chromium version puppeteer-core expects
RUN npx puppeteer-core browsers install chrome

# Copy the rest of the app
COPY . .

EXPOSE 5050

CMD ["npm", "start"]
