import { test, expect } from '@src/fixtures/ui.fixtures';
import { ProductsPage } from '@src/pages/ProductsPage';
import testData from '@src/data/ui-test-data.json';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('TC_UI_001 — should redirect to the products page after valid login', async ({ loginPage, productsPage }) => {
    const { username, password } = testData.validUser;

    await loginPage.login(username, password);

    expect(await productsPage.getHeading(), 'Products heading should be visible').toBe(ProductsPage.HEADING);
  });

  for (const { username, password, scenario } of testData.invalidScenarios) {
    test(`TC_UI_002 — should display an error message for invalid login [${scenario}]`, async ({ loginPage }) => {
      await loginPage.login(username, password);

      const error = await loginPage.getErrorMessage();
      expect(error, 'Error message should be displayed').toBeTruthy();
    });
  }
});
