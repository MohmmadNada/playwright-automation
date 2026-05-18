import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(_config: FullConfig): Promise<void> {
  // stderr bypasses the reporter's ANSI cursor rewrites, keeping logs visible in the terminal
  process.stderr.write(`[SUITE START] ${new Date().toISOString()}\n`);

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://www.saucedemo.com');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.waitForURL('**/inventory.html');

  await page.context().storageState({ path: 'storageState.json' });
  await browser.close();
}

export default globalSetup;
