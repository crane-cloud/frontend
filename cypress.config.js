const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // specPattern: "cypress/components/**/*.spec.{js,ts,jsx,tsx}",

  component: {
    browser: "chrome",
    specPattern: "cypress/components/**/*.spec.{js,ts,jsx,tsx}",
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});

// const { defineTestConfig } = require('cypress-multi-configure');

// module.exports = defineTestConfig({
//   testNameTemplate: '{name} - {env} ({viewportWidth}x{viewportHeight})',

//   e2e: {
//     browser: 'chrome',
//     specPattern: 'cypress/integration/e2e/**/*.spec.{js,ts}',
//   },

//   component: {
//     browser: 'chrome',
//     specPattern: 'cypress/integration/components/**/*.spec.{js,ts,jsx,tsx}',
//     devServer: {
//       command: 'npm start',
//       waitOnCheck: 'http://localhost:3000',
//     },
//   },
// });
