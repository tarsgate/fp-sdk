export class Check {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- method accepts any value by design
    public static isNullOrUndefined(variable: any) {
        return variable === null || variable === undefined;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- method accepts any value by design
    public static if(variable: any) {
        // because instanceof doesn't work with primitive types (e.g. String), taken from https://stackoverflow.com/a/58184883/544947
        return {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any -- method accepts any value by design
            is(type: any): boolean {
                if (Check.isNullOrUndefined(variable)) {
                    throw new Error(
                        "Invalid 'variable' parameter passed in: null or undefined"
                    );
                }
                if (Check.isNullOrUndefined(type)) {
                    throw new Error(
                        "Invalid 'type' parameter passed in: null or undefined"
                    );
                }

                let res: boolean = false;
                if (typeof type == "string") {
                    res = typeof variable == type.toLowerCase();
                } else {
                    res = variable.constructor == type;
                }
                return res;
            }
        }
    }

    public static ifString(str: string) {
        return {
            isNullishOrEmpty(): boolean {
                if (Check.isNullOrUndefined(str)) {
                    return true;
                }
                if (str.length === 0) {
                    return true;
                }
                return false;
            },

            isNullishOrWhiteSpace(): boolean {
                if (Check.ifString(str).isNullishOrEmpty()) {
                    return true;
                }
                return str.trim().length === 0;
            }
        }
    }
}
