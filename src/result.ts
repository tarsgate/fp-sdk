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

export class ResultHelpers {
    public static OfFn<T, E = unknown>(fn: () => T): Result<T, E> {
        try {
            return new Ok(fn());
        } catch (e) {
            return new Err(e as E);
        }
    }

    public static async OfPromise<T, E = unknown>(promise: Promise<T>): Promise<Result<T, E>> {
        try {
            const val = await promise;
            return new Ok(val);
        } catch (e) {
            return new Err(e as E);
        }
    }
}
