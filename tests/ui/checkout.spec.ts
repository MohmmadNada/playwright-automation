import { test, expect } from '@src/fixtures/ui.fixtures';
import testData from '@src/data/ui-test-data.json';
import { sumPrices } from '@src/utils/helpers';

test.use({ storageState: 'storageState.json' }); // TO_CHECK

test('TC_UI_004 — should complete checkout and confirm order for the 2 most expensive items', async ({
  productsPage,
  cartPage,
  checkoutPage,
}) => {
  await productsPage.goto();

  const top2 = await productsPage.getTopProductsByPrice(testData.checkout.topProductsCount);
  const expectedTotal = sumPrices(top2);

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
