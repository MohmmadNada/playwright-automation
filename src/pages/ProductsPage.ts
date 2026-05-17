import { Page } from '@playwright/test';

export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

export interface ProductWithPrice {
  name: string;
  price: number;
}

export class ProductsPage {
  constructor(private readonly page: Page) {}

  private get sortDropdown() { return this.page.locator('[data-test="product-sort-container"]'); }
  private get productNames() { return this.page.locator('.inventory_item_name'); }
  private get productPrices() { return this.page.locator('.inventory_item_price'); }
  private get cartLink() { return this.page.locator('.shopping_cart_link'); }

  async sortBy(option: SortOption): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  async getProductNames(): Promise<string[]> {
    return this.productNames.allInnerTexts();
  }

  async getProductsWithPrices(): Promise<ProductWithPrice[]> {
    const names = await this.productNames.allInnerTexts();
    const prices = await this.productPrices.allInnerTexts();
    return names.map((name, i) => ({
      name,
      price: parseFloat(prices[i].replace('$', '')),
    }));
  }

  async addToCartByName(name: string): Promise<void> {
    await this.page
      .locator('.inventory_item')
      .filter({ hasText: name })
      .locator('button')
      .click();
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }
}
