import { test, expect } from '@src/fixtures/ui.fixtures';
import { SortOption } from '@src/types/ui.types';
import testData from '@src/data/ui-test-data.json';
import { sortDescending } from '@src/utils/helpers';

test.describe('Products', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('TC_UI_003 — should display products sorted from Z to A when sort option is selected', async ({ loginPage, productsPage }) => {
    await loginPage.login(testData.validUser.username, testData.validUser.password);

    await productsPage.sortBy(testData.sort.nameDesc as SortOption);
    const names = await productsPage.getProductNames();

    expect(names, 'Products should be sorted Z to A').toEqual(sortDescending(names));
  });
});
