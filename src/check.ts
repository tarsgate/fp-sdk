export class Check {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- method accepts any value by design
    public static if(variable: any) {
        // because instanceof doesn't work with primitive types (e.g. String), taken from https://stackoverflow.com/a/58184883/544947
        return {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any -- method accepts any value by design
            is(type: any): boolean {
                if (Check.if(variable).isNullish()) {
                    throw new Error(
                        "Invalid 'variable' parameter passed in: null or undefined"
                    );
                }
                if (Check.if(type).isNullish()) {
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
            },

            /**
             * @deprecated use isNullish() instead
             **/
            isNullOrUndefined() {
                return Check.if(variable).isNullish();
            },

            isNullish() {
                return variable === null || variable === undefined;
            }
        }
    }

    public static ifString(str: string) {
        return {
            isNullishOrEmpty(): boolean {
                if (Check.if(str).isNullish()) {
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
