import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  private get usernameInput() { return this.page.locator('[data-test="username"]'); }
  private get passwordInput() { return this.page.locator('[data-test="password"]'); }
  private get loginButton() { return this.page.locator('[data-test="login-button"]'); }
  private get errorMessage() { return this.page.locator('[data-test="error"]'); }

  // -- Navigation --

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  // -- Actions --

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // -- Queries --

  async getErrorMessage(): Promise<string> {
    return this.errorMessage.innerText();
  }
}
