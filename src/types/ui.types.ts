export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

export interface ProductWithPrice {
  name: string;
  price: number;
}

export interface CheckoutInfo {
  firstName: string;
  lastName: string;
  postalCode: string;
}
