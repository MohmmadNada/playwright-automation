import { test, expect } from '@src/fixtures/ui.fixtures';
import testData from '@src/data/ui-test-data.json';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
  });

  test('TC_UI_001 — Valid Login', async ({ loginPage, page }) => {
    const { username, password } = testData.validUser;

    await loginPage.login(username, password);

    await expect(page, 'Should redirect to inventory page').toHaveURL(/inventory\.html/);
    await expect(page.locator('.title'), 'Products heading should be visible').toHaveText('Products');
  });

  for (const { username, password, scenario } of testData.invalidScenarios) {
    test(`TC_UI_002 — Invalid Login [${scenario}]`, async ({ loginPage }) => {
      await loginPage.login(username, password);

      const error = await loginPage.getErrorMessage();
      expect(error, 'Error message should be displayed').toBeTruthy();
    });
  }
});
