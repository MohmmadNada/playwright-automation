import { test, expect } from '@src/fixtures/api.fixtures';
import testData from '@src/data/api-test-data.json';
import { randomEmail } from '@src/utils/helpers';
import { HttpStatus } from '@src/constants/http-status';

test.describe('Orders API', () => {
  test('TC_API_001 — should authenticate and create an order successfully', async ({ booksApi }) => {
    const token = await booksApi.authenticate(testData.clientName, randomEmail());

    const response = await booksApi.createOrder(token, testData.bookId, testData.customerName);

    expect(response.status, `Create order should return ${HttpStatus.CREATED}`).toBe(HttpStatus.CREATED);
    expect(response.orderId, 'Order ID should be returned').toBeTruthy();
  });

  test.describe('given an existing order', () => {
    let token: string;
    let orderId: string;

    test.beforeEach(async ({ booksApi }) => {
      token = await booksApi.authenticate(testData.clientName, randomEmail());
      const response = await booksApi.createOrder(token, testData.bookId, testData.customerName);
      orderId = response.orderId;
    });

    test('TC_API_002 — should retrieve the created order with correct details', async ({ booksApi }) => {
      const { status, order } = await booksApi.getOrder(token, orderId);

      expect(status, `Get order should return ${HttpStatus.OK}`).toBe(HttpStatus.OK);
      expect(order, 'Order body should be present').toBeDefined();
      expect(order!.bookId, 'Book ID should match').toBe(testData.bookId);
      expect(order!.customerName, 'Customer name should match').toBe(testData.customerName);
    });

    test('TC_API_003 — should update the customer name on an existing order', async ({ booksApi }) => {
      const { status } = await booksApi.updateOrder(token, orderId, testData.updatedCustomerName);

      expect(status, `Update order should return ${HttpStatus.NO_CONTENT}`).toBe(HttpStatus.NO_CONTENT);

      const { status: getStatus, order } = await booksApi.getOrder(token, orderId);
      expect(getStatus, `Get order after update should return ${HttpStatus.OK}`).toBe(HttpStatus.OK);
      expect(order, 'Order body should be present').toBeDefined();
      expect(order!.customerName, 'Customer name should be updated').toBe(testData.updatedCustomerName);
    });

    test(`TC_API_004 — should delete the order and return ${HttpStatus.NOT_FOUND} on subsequent fetch`, async ({ booksApi }) => {
      const { status: deleteStatus } = await booksApi.deleteOrder(token, orderId);

      expect(deleteStatus, `Delete order should return ${HttpStatus.NO_CONTENT}`).toBe(HttpStatus.NO_CONTENT);

      const { status: getStatus } = await booksApi.getOrder(token, orderId);
      expect(getStatus, `Deleted order should return ${HttpStatus.NOT_FOUND}`).toBe(HttpStatus.NOT_FOUND);
    });
  });
});
