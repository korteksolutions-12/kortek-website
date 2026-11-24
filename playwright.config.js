const { defineConfig } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

// Resolve snapshot directory relative to package.json location
const snapshotDir = path.resolve(__dirname, 'tests', 'visual.spec.js-snapshots');

module.exports = defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.js',
  timeout: 60000,
  expect: {
    toMatchSnapshot: {
      threshold: 0.2,
    },
  },
  reporter: [['line', { isStrict: false }]],
  use: {
    baseURL: 'http://localhost:8080',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'visual',
      testMatch: /visual\.spec\.js/,
      use: {
        snapshotDir,
      },
    },
    {
      name: 'a11y',
      testMatch: /a11y\.spec\.js/,
    },
    {
      name: 'responsive',
      testMatch: /responsive\.spec\.js/,
    },
  ],
});