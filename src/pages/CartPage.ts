import { Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  private get checkoutButton() { return this.page.locator('[data-test="checkout"]'); }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
