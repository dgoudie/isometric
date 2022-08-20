export function normalizeBSON<T>(item: T): T {
  return JSON.parse(JSON.stringify(item));
}
