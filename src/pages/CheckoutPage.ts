import { Page } from '@playwright/test';
import { CheckoutInfo } from '@src/types/ui.types';

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  private get firstNameInput() { return this.page.locator('[data-test="firstName"]'); }
  private get lastNameInput() { return this.page.locator('[data-test="lastName"]'); }
  private get postalCodeInput() { return this.page.locator('[data-test="postalCode"]'); }
  private get continueButton() { return this.page.locator('[data-test="continue"]'); }
  private get itemTotal() { return this.page.locator('.summary_subtotal_label'); }
  private get finishButton() { return this.page.locator('[data-test="finish"]'); }
  private get confirmationHeader() { return this.page.locator('[data-test="complete-header"]'); }

  // -- Actions --

  async fillInfo(info: CheckoutInfo): Promise<void> {
    await this.firstNameInput.fill(info.firstName);
    await this.lastNameInput.fill(info.lastName);
    await this.postalCodeInput.fill(info.postalCode);
  }

  async continue(): Promise<void> {
    await this.continueButton.click();
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }

  // -- Queries --

  async getItemsTotal(): Promise<number> {
    const text = await this.itemTotal.innerText();
    return parseFloat(text.replace('Item total: $', ''));
  }

  async getConfirmationMessage(): Promise<string> {
    return this.confirmationHeader.innerText();
  }
}
