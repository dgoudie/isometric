export function moveItemInArray<T>(arr: T[], from: number, to: number) {
    const clone = [...arr];
    clone.splice(to, 0, clone.splice(from, 1)[0]);
    return clone;
}

export function deleteItemFromArray<T>(arr: T[], index: number) {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export function replaceItemInArray<T>(arr: T[], index: number, newItem: T) {
    return arr.map((item, i) => (index === i ? newItem : item));
}
