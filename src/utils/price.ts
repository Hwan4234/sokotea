/** Formats a price in cents for display, e.g. 650 -> "$6.50". */
export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
