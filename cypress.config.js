const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,
  
  requestTimeout: 10000,
  responseTimeout: 10000,

  e2e: {
    baseUrl: 'https://www.pixelssuite.com',
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
