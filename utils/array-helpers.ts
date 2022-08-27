export function moveItemInArray<T>(array: T[], from: number, to: number) {
  /* #move - Moves an array item from one position in an array to another.
     Note: This is a pure function so a new array will be returned, instead
     of altering the array argument.
    Arguments:
    1. array     (String) : Array in which to move an item.         (required)
    2. from (Object) : The index of the item to move.          (required)
    3. to   (Object) : The index to move item at from to. (required)
  */
  const item = array[from];
  const length = array.length;
  const diff = from - to;

  if (diff > 0) {
    // move left
    return [
      ...array.slice(0, to),
      item,
      ...array.slice(to, from),
      ...array.slice(from + 1, length),
    ];
  } else if (diff < 0) {
    // move right
    const targetIndex = to + 1;
    return [
      ...array.slice(0, from),
      ...array.slice(from + 1, targetIndex),
      item,
      ...array.slice(targetIndex, length),
    ];
  }
  return array;
}

export function deleteItemFromArray<T>(arr: T[], index: number) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export function replaceItemInArray<T>(arr: T[], index: number, newItem: T) {
  return arr.map((item, i) => (index === i ? newItem : item));
}
