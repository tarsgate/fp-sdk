interface IOption {
    /**
     * @deprecated it is better to use `if (foo instanceof None)` so that you can access the .value in the `else` case
     **/
    isNone(): boolean;
    /**
     * @deprecated it is better to use `if (!(foo instanceof None))` so that you can access the .value inside the `if` block
     **/
    isSome(): boolean;
}

export class None {
    public isNone(): boolean {
        return true;
    }
    public isSome(): boolean {
        return false;
    }

    /**
     * @deprecated it is better to use `Nothing`
     **/
    constructor() {}
}
export class Some<T> {
    value: T;

    constructor(val: NonNullable<T>) {
        this.value = val;
    }

    public isNone(): boolean {
        return false;
    }
    public isSome(): boolean {
        return true;
    }
}

export type Option<T> = (None | Some<NonNullable<T>>) & IOption;

export const Nothing = new None();

export class OptionHelpers {
    public static ofObj<T>(obj: T | null | undefined): Option<NonNullable<T>> {
        if (obj === null || obj === undefined) {
            return Nothing;
        } else {
            return new Some(obj);
        }
    }
}
