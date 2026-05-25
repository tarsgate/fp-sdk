export class TypeHelpers {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- method accepts any value by design
    public static isNullOrUndefined(variable: any) {
        return variable === null || variable === undefined;
    }

    public static stringIsNullishOrEmpty(str: string) {
        if (TypeHelpers.isNullOrUndefined(str)) {
            return true;
        }
        if (str.length === 0) {
            return true;
        }
        return false;
    }

    public static stringIsNullishOrWhiteSpace(str: string) {
        if (TypeHelpers.stringIsNullishOrEmpty(str)) {
            return true;
        }
        return str.trim().length === 0;
    }
}
