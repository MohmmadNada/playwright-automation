import { APIRequestContext } from '@playwright/test';

export interface Order {
  id: string;
  bookId: number;
  customerName: string;
}

export class BooksApiClient {
  constructor(private readonly request: APIRequestContext) {}

  /**
   * Registers a client with the API and returns a Bearer token.
   * A unique email must be passed to avoid conflicts across runs.
   */
  async authenticate(email: string): Promise<string> {
    const response = await this.request.post('/api-clients/', {
      data: { clientName: 'test-client', clientEmail: email },
    });
    const body = await response.json();
    return body.accessToken as string;
  }

  async createOrder(
    token: string,
    bookId: number,
    customerName: string,
  ): Promise<{ orderId: string }> {
    const response = await this.request.post('/orders', {
      headers: { Authorization: `Bearer ${token}` },
      data: { bookId, customerName },
    });
    const body = await response.json();
    return { orderId: body.orderId as string };
  }

  async getOrder(token: string, orderId: string): Promise<Order> {
    const response = await this.request.get(`/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json() as Promise<Order>;
  }

  async updateOrder(token: string, orderId: string, customerName: string): Promise<void> {
    await this.request.patch(`/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { customerName },
    });
  }

  async deleteOrder(token: string, orderId: string): Promise<void> {
    await this.request.delete(`/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
