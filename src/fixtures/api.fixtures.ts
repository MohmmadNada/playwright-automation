import { test as base } from '@playwright/test';
import { BooksApiClient } from '@src/api/BooksApiClient';

type ApiFixtures = {
  booksApi: BooksApiClient;
};

export const test = base.extend<ApiFixtures>({
  booksApi: async ({ request }, use) => { await use(new BooksApiClient(request)); },
});

export { expect } from '@playwright/test';
