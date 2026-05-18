import { test, expect } from '@src/fixtures/ui.fixtures';

test('DEMO — intentional failure to show report on CI', async ({ loginPage }) => {
  await loginPage.goto();
  expect(true, 'This test is intentionally failing to demonstrate the CI report').toBe(false);
});
