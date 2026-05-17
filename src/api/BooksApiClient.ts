import { APIRequestContext } from '@playwright/test';
import { Order, CreateOrderResponse, GetOrderResponse, StatusResponse } from '@src/types/api.types';
import { HttpStatus } from '@src/constants/http-status';

export class BooksApiClient {
  private static readonly Routes = {
    clients: '/api-clients',
    orders: '/orders',
    order: (id: string) => `/orders/${id}`,
  };

  constructor(private readonly request: APIRequestContext) {}

  private authHeader(token: string) {
    return { Authorization: `Bearer ${token}` };
  }

  /**
   * Registers a client with the API and returns a Bearer token.
   * A unique email must be passed to avoid registration conflicts across parallel or back-to-back runs.
   */
  async authenticate(clientName: string, email: string): Promise<string> {
    const response = await this.request.post(BooksApiClient.Routes.clients, {
      data: { clientName, clientEmail: email },
    });
    const body = await response.json();
    return body.accessToken as string;
  }

  async createOrder(
    token: string,
    bookId: number,
    customerName: string,
  ): Promise<CreateOrderResponse> {
    const response = await this.request.post(BooksApiClient.Routes.orders, {
      headers: this.authHeader(token),
      data: { bookId, customerName },
    });
    const body = await response.json();
    return { status: response.status(), orderId: body.orderId as string };
  }

  async getOrder(token: string, orderId: string): Promise<GetOrderResponse> {
    const response = await this.request.get(BooksApiClient.Routes.order(orderId), {
      headers: this.authHeader(token),
    });
    if (response.status() !== HttpStatus.OK) {
      return { status: response.status() };
    }
    return { status: response.status(), order: await response.json() as Order };
  }

  async updateOrder(token: string, orderId: string, customerName: string): Promise<StatusResponse> {
    const response = await this.request.patch(BooksApiClient.Routes.order(orderId), {
      headers: this.authHeader(token),
      data: { customerName },
    });
    return { status: response.status() };
  }

  async deleteOrder(token: string, orderId: string): Promise<StatusResponse> {
    const response = await this.request.delete(BooksApiClient.Routes.order(orderId), {
      headers: this.authHeader(token),
    });
    return { status: response.status() };
  }
}
