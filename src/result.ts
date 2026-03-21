interface IResult {
    /**
     * @deprecated it is better to use `if (foo instanceof Err)` so that you can access the .error in the `if` block
     **/
    IsErr(): boolean;
    /**
     * @deprecated it is better to use `if (foo instanceof Ok)` so that you can access the .value in the `if` block
     **/
    IsOk(): boolean;
}

export class Err<E> {
    error: E;

    constructor(err: E) {
        this.error = err;
    }

    public IsErr(): boolean {
        return true;
    }
    public IsOk(): boolean {
        return false;
    }
}

export class Ok<T> {
    value: T;

    constructor(val: T) {
        this.value = val;
    }

    public IsErr(): boolean {
        return false;
    }
    public IsOk(): boolean {
        return true;
    }
}

export type Result<T, E> = (Ok<T> | Err<E>) & IResult;
