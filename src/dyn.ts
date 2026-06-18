import {
    Some,
    Option,
    Nothing,
    Check,
} from "./index.js";

export namespace Dyn {
    // Define a clean, internal type representing any constructor function
    type Constructor<T> =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- method accepts any value by design
        new (...args: any[]) => T;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- method accepts any value by design
    export function cast(variable: any) {
        /**
         * Resolves the target constructor. Uses a conditional type fallback 
         * to gracefully handle both primitives and custom classes.
         */
        return {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            to<TCtor extends Constructor<any>>(
                type: TCtor
            ): Option<
                TCtor extends StringConstructor ? string :
                TCtor extends NumberConstructor ? number :
                TCtor extends BooleanConstructor ? boolean :
                TCtor extends FunctionConstructor ? Function :
                InstanceType<TCtor>
            > {
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

                // instanceof doesn't work with primitive types (e.g. String),
                // taken from https://stackoverflow.com/a/58184883/544947
                const matches =
                    variable instanceof type ||
                    (typeof type === "function" &&
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        typeof variable === (type as any).name.toLowerCase());

                return matches ? new Some(variable) : Nothing;
            }
        };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    export function tryCast(variable: any) {
        return {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            to<TCtor extends Constructor<any>>(
                type: TCtor
            ): Option<
                TCtor extends StringConstructor ? string :
                TCtor extends NumberConstructor ? number :
                TCtor extends BooleanConstructor ? boolean :
                TCtor extends FunctionConstructor ? Function :
                InstanceType<TCtor>
            > {
                if (Check.if(variable).isNullish()) {
                    return Nothing;
                }

                return Dyn.cast(variable).to(type);
            }
        };
    }
}
