import { None, Option, Some } from "./option.js";
import { TypeHelpers } from "./typeHelpers.js";

export class Dyn {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- method accepts any value by design
    public static cast(variable: any) {
        return {
            to(type: unknown): Option<unknown> {
                if (TypeHelpers.isNullOrUndefined(variable)) {
                    throw new Error(
                        "Invalid 'variable' parameter passed in: null or undefined"
                    );
                }
                if (TypeHelpers.isNullOrUndefined(type)) {
                    throw new Error(
                        "Invalid 'type' parameter passed in: null or undefined"
                    );
                }

                let res: boolean = false;
                if (typeof type === "string") {
                    res = typeof variable === type.toLowerCase();
                } else if (typeof type === "function") {
                    res = variable.constructor === type;
                }
                if (res) {
                    return new Some(variable);
                }
                return new None();
            },
        };
    }
}
