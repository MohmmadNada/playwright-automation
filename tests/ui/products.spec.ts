import { test, expect } from '@src/fixtures/ui.fixtures';

test.describe('Products', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
  });

  test('TC_UI_003 — Products Sorted Z to A', async ({ loginPage, productsPage }) => {
    await loginPage.login('standard_user', 'secret_sauce');

    await productsPage.sortBy('za');
    const names = await productsPage.getProductNames();

    expect(names, 'Products should be sorted Z to A').toEqual([...names].sort().reverse());
  });
});
