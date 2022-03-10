export function stringLiterals<T extends string>(...args: T[]): T[] {
    return args;
}
export type ElementOf<T extends ReadonlyArray<unknown>> =
    T extends ReadonlyArray<infer ElementOf> ? ElementOf : never;
