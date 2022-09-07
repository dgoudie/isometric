export const getFormikInitiallyTouchedFields = <
    T extends Record<PropertyKey, any>
>(
    initialValue: T
) => {
    return Object.entries(initialValue).reduce(
        (acc, [key, value]) => ({
            ...acc,
            [key]: !!value,
        }),
        {} as { [key in keyof T]: boolean }
    );
};
