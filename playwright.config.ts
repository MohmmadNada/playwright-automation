import { defineConfig } from '@playwright/test';

export default defineConfig({
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { outputFolder: 'reports', open: 'never' }]],
  globalSetup: './global-setup',
  globalTeardown: './global-teardown',
  use: {
    trace: 'on-first-retry',
    viewport: null,
  },
  projects: [
    {
      name: 'Google Chrome',
      testMatch: 'tests/ui/**',
      use: {
        channel: 'chrome',
        baseURL: 'https://www.saucedemo.com',
        launchOptions: { args: ['--start-maximized'] },
      },
    },
    {
      name: 'Mozilla Firefox',
      testMatch: 'tests/ui/**',
      use: {
        browserName: 'firefox',
        baseURL: 'https://www.saucedemo.com',
      },
    },
    {
      name: 'API',
      testMatch: 'tests/api/**',
      use: {
        baseURL: 'https://simple-books-api.click',
      },
    },
  ],
});
