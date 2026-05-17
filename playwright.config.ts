import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { outputFolder: 'reports', open: 'never' }]],
  use: {
    trace: 'on-first-retry',
    viewport: null,
  },
  projects: [
    {
      name: 'Google Chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        launchOptions: { args: ['--start-maximized'] },
      },
    },
    {
      name: 'Mozilla Firefox',
      use: {
        ...devices['Desktop Firefox'],
        launchOptions: { args: ['--start-maximized'] },
      },
    },
  ],
});
