import { Page } from '@playwright/test';
import { SortOption, ProductWithPrice } from '@src/types/ui.types';

export class ProductsPage {
  static readonly PATH = '/inventory.html';
  static readonly HEADING = 'Products';

  constructor(private readonly page: Page) {}

  private get sortDropdown() { return this.page.locator('[data-test="product-sort-container"]'); }
  private get productNames() { return this.page.locator('.inventory_item_name'); }
  private get productPrices() { return this.page.locator('.inventory_item_price'); }
  private get cartLink() { return this.page.locator('.shopping_cart_link'); }
  private get heading() { return this.page.locator('.title'); }
  private get inventoryItems() { return this.page.locator('.inventory_item'); }
  private addToCartButton(name: string) { return this.inventoryItems.filter({ hasText: name }).locator('button'); }

  // -- Navigation --

  async goto(): Promise<void> {
    await this.page.goto(ProductsPage.PATH);
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }

  // -- Actions --

  async sortBy(option: SortOption): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  async addToCartByName(name: string): Promise<void> {
    await this.addToCartButton(name).click();
  }

  // -- Queries --

  async getHeading(): Promise<string> {
    return this.heading.innerText();
  }

  async getProductNames(): Promise<string[]> {
    return this.productNames.allInnerTexts();
  }

  /**
   * Returns all products on the page with prices parsed as numbers (dollar sign stripped).
   */
  async getProductsWithPrices(): Promise<ProductWithPrice[]> {
    const names = await this.productNames.allInnerTexts();
    const prices = await this.productPrices.allInnerTexts();
    return names.map((name, i) => ({
      name,
      price: parseFloat(prices[i].replace('$', '')),
    }));
  }

  /**
   * Returns the top `count` products sorted by price descending.
   * Sorting is done here rather than in the spec to keep test files free of data manipulation logic.
   */
  async getTopProductsByPrice(count: number): Promise<ProductWithPrice[]> {
    const products = await this.getProductsWithPrices();
    return [...products].sort((a, b) => b.price - a.price).slice(0, count);
  }
}
