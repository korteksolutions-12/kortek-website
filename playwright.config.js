const { defineConfig } = require('@playwright/test');
const path = require('path');

module.exports = defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.js',
  timeout: 60000,
  expect: {
    toMatchSnapshot: {
      threshold: 0.2,
    },
  },
  snapshotDir: path.resolve(__dirname, 'tests', 'visual.spec.js-snapshots'),
  snapshotSuffix: '-visual-linux',
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