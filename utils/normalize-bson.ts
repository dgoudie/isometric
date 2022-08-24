export function convertToPlainObject<T>(item: T): T {
  if (item === null) {
    return item;
  }
  return JSON.parse(JSON.stringify(item));
}
