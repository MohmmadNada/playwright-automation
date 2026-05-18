import { test, expect } from '@src/fixtures/api.fixtures';
import testData from '@src/data/api-test-data.json';
import { randomEmail } from '@src/utils/helpers';
import { HttpStatus } from '@src/constants/http-status';

test.describe('Orders API', () => {
  test('TC_API_001 — should complete the full order lifecycle: create, retrieve, update, and delete', async ({ booksApi }) => {
    const token = await booksApi.authenticate(testData.clientName, randomEmail());
    let orderId!: string;

    await test.step('Create order', async () => {
      const { status, orderId: id } = await booksApi.createOrder(token, testData.bookId, testData.customerName);
      expect(status, `Create order should return ${HttpStatus.CREATED}`).toBe(HttpStatus.CREATED);
      expect(id, 'Order ID should be returned').toBeTruthy();
      orderId = id;
    });

    await test.step('Retrieve order', async () => {
      const { status, order } = await booksApi.getOrder(token, orderId);
      expect(status, `Get order should return ${HttpStatus.OK}`).toBe(HttpStatus.OK);
      expect(order, 'Order body should be present').toBeDefined();
      expect(order!.bookId, 'Book ID should match').toBe(testData.bookId);
      expect(order!.customerName, 'Customer name should match').toBe(testData.customerName);
    });

    await test.step('Update order', async () => {
      const { status } = await booksApi.updateOrder(token, orderId, testData.updatedCustomerName);
      expect(status, `Update order should return ${HttpStatus.NO_CONTENT}`).toBe(HttpStatus.NO_CONTENT);

      const { status: getStatus, order } = await booksApi.getOrder(token, orderId);
      expect(getStatus, `Get order after update should return ${HttpStatus.OK}`).toBe(HttpStatus.OK);
      expect(order, 'Updated order body should be present').toBeDefined();
      expect(order!.customerName, 'Customer name should be updated').toBe(testData.updatedCustomerName);
    });

    await test.step('Delete order', async () => {
      const { status } = await booksApi.deleteOrder(token, orderId);
      expect(status, `Delete order should return ${HttpStatus.NO_CONTENT}`).toBe(HttpStatus.NO_CONTENT);

      const { status: getStatus } = await booksApi.getOrder(token, orderId);
      expect(getStatus, `Deleted order should return ${HttpStatus.NOT_FOUND}`).toBe(HttpStatus.NOT_FOUND);
    });
  });
});
