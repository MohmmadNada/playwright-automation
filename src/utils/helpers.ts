import { randomUUID } from 'crypto';
import { ProductWithPrice } from '@src/types/ui.types';

export function randomString(length: number): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generates a unique email address using a UUID suffix to prevent collisions
 * across parallel or back-to-back test runs.
 */
export function randomEmail(): string {
  return `test_${randomUUID()}@example.com`;
}

/**
 * Returns a random integer between min and max, inclusive on both ends.
 */
export function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Sums the prices of a list of products, rounded to 2 decimal places
 * to avoid floating-point drift when comparing against UI-displayed totals.
 */
export function sumPrices(products: ProductWithPrice[]): number {
  return parseFloat(products.reduce((sum, p) => sum + p.price, 0).toFixed(2));
}

export function sortDescending(arr: string[]): string[] {
  return [...arr].sort().reverse();
}
