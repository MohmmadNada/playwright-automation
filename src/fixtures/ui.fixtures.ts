import { test as base } from '@playwright/test';
import { LoginPage } from '@src/pages/LoginPage';
import { ProductsPage } from '@src/pages/ProductsPage';
import { CartPage } from '@src/pages/CartPage';
import { CheckoutPage } from '@src/pages/CheckoutPage';

type UiFixtures = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
};

export const test = base.extend<UiFixtures>({
  // --start-maximized is Chrome-only; Firefox requires viewport to be set programmatically
  page: async ({ page, browserName }, use) => {
    if (browserName === 'firefox') {
      const { width, height } = await page.evaluate(() => ({
        width: window.screen.availWidth,
        height: window.screen.availHeight,
      }));
      await page.setViewportSize({ width, height });
    }
    await use(page);
  },
  loginPage: async ({ page }, use) => { await use(new LoginPage(page)); },
  productsPage: async ({ page }, use) => { await use(new ProductsPage(page)); },
  cartPage: async ({ page }, use) => { await use(new CartPage(page)); },
  checkoutPage: async ({ page }, use) => { await use(new CheckoutPage(page)); },
});

export { expect } from '@playwright/test';
