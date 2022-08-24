export function parseBoolean(val: string) {
  if (val === 'true') {
    return true;
  } else if (val === 'false') {
    return false;
  }
  return undefined;
}

export function isNaB(val: boolean | undefined) {
  return typeof val !== 'boolean';
}
