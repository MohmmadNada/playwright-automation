import { test, expect } from '@src/fixtures/ui.fixtures';
import testData from '@src/data/ui-test-data.json';

test.use({ storageState: 'storageState.json' });

test('TC_UI_004 — E2E Checkout with top 2 expensive items', async ({
  page,
  productsPage,
  cartPage,
  checkoutPage,
}) => {
  await page.goto('https://www.saucedemo.com/inventory.html');

  const products = await productsPage.getProductsWithPrices();
  const top2 = [...products].sort((a, b) => b.price - a.price).slice(0, 2);
  const expectedTotal = parseFloat((top2[0].price + top2[1].price).toFixed(2));

  for (const product of top2) {
    await productsPage.addToCartByName(product.name);
  }

  await productsPage.goToCart();
  await cartPage.proceedToCheckout();

  await checkoutPage.fillInfo(testData.checkoutInfo);
  await checkoutPage.continue();

  const itemsTotal = await checkoutPage.getItemsTotal();
  expect(itemsTotal, 'Items total should equal sum of top 2 product prices').toBe(expectedTotal);

  await checkoutPage.finish();

  const confirmation = await checkoutPage.getConfirmationMessage();
  expect(confirmation, 'Order confirmation message should be shown').toBe('Thank you for your order!');
});
