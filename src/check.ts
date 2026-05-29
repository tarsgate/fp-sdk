export class Check {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- method accepts any value by design
    public static if(variable: any) {
        return {
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
