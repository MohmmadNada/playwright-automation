export interface Order {
  id: string;
  bookId: number;
  customerName: string;
}

export interface CreateOrderResponse {
  status: number;
  orderId: string;
}

export interface GetOrderResponse {
  status: number;
  order?: Order;
}

export interface StatusResponse {
  status: number;
}
