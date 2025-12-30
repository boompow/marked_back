const { join } = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Tells Puppeteer to store and look for browsers in this specific folder
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};
