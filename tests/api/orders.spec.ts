import { test, expect } from '@src/fixtures/api.fixtures';
import testData from '@src/data/api-test-data.json';
import { randomEmail } from '@src/utils/helpers';

test.describe.configure({ mode: 'serial' });

test.describe('Orders API', () => {
  let token: string;
  let orderId: string;

  test('TC_API_001 — should authenticate and create an order successfully', async ({ booksApi }) => {
    token = await booksApi.authenticate(testData.clientName, randomEmail());

    const response = await booksApi.createOrder(token, testData.bookId, testData.customerName);

    expect(response.status, 'Create order should return 201').toBe(201);
    expect(response.orderId, 'Order ID should be returned').toBeTruthy();
    orderId = response.orderId;
  });

  test('TC_API_002 — should retrieve the created order with correct details', async ({ booksApi }) => {
    const { status, order } = await booksApi.getOrder(token, orderId);

    expect(status, 'Get order should return 200').toBe(200);
    expect(order?.bookId, 'Book ID should match').toBe(testData.bookId);
    expect(order?.customerName, 'Customer name should match').toBe(testData.customerName);
  });

  test('TC_API_003 — should update the customer name on an existing order', async ({ booksApi }) => {
    const { status } = await booksApi.updateOrder(token, orderId, testData.updatedCustomerName);

    expect(status, 'Update order should return 204').toBe(204);

    const { order } = await booksApi.getOrder(token, orderId);
    expect(order?.customerName, 'Customer name should be updated').toBe(testData.updatedCustomerName);
  });

  test('TC_API_004 — should delete the order and return 404 on subsequent fetch', async ({ booksApi }) => {
    const { status: deleteStatus } = await booksApi.deleteOrder(token, orderId);

    expect(deleteStatus, 'Delete order should return 204').toBe(204);

    const { status: getStatus } = await booksApi.getOrder(token, orderId);
    expect(getStatus, 'Deleted order should return 404').toBe(404);
  });
});
