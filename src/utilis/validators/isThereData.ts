const isArrayHasData = <T>(arr: T[]): boolean =>
    Array.isArray(arr) && !!arr.length;

const isObjHasData = <T>(obj: T): boolean =>
    Boolean(obj) && typeof obj === "object" && !!Object.keys(obj).length;

const hasValue = (value: any) => {
    return value && (typeof value === 'string' || Array.isArray(value))
        ? value.length > 0
        : value && typeof value === 'object'
            ? Object.keys(value).length > 0
            : false;
};
export { isArrayHasData, isObjHasData, hasValue };
