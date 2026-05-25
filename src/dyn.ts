import { Option, Some } from "./option.js";
import { TypeHelpers } from "./typeHelpers.js";

export class Dyn {
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
