import { Option, Some } from "./option.js";

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

    // because instanceof doesn't work with primitive types (e.g. String), taken from https://stackoverflow.com/a/58184883/544947
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- method accepts any value by design
    public static cast(variable: any) {
        return {
            to<T>(): Option<T> {
                if (TypeHelpers.isNullOrUndefined(variable)) {
                    throw new Error(
                        "Invalid 'variable' parameter passed in: null or undefined"
                    );
                }
                return new Some(variable);
            },
        };
    }
}
