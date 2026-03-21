import { test, expect } from "vitest";
import {
    None,
    Some,
    Option,
    Nothing,
    OptionHelpers,
    Ok,
    Err,
    Result,
    ResultHelpers,
    TypeHelpers,
} from "./index.js";

function typeGuard(option: Option<number>) {
    if (option instanceof None) {
        return "NAH";
    } else {
        const val = option.value;
        return (val * val).toString();
    }
}

function ofObj1(option: number | null): Option<number> {
    const foo = OptionHelpers.OfObj(option);
    return foo;
}

function ofObj2(option: number | undefined): Option<number> {
    const foo = OptionHelpers.OfObj(option);
    return foo;
}

test("testing Options", () => {
    const foo: Option<number> = new None();
    const bar: Option<number> = new Some(2);
    expect(typeGuard(foo)).toBe("NAH");
    expect(typeGuard(bar)).toBe("4");
});

test("testing Is methods", () => {
    const foo: Option<number> = Nothing;
    const bar: Option<number> = new Some(2);
    expect(foo.IsNone()).toBe(true);
    expect(bar.IsNone()).toBe(false);
    expect(foo.IsSome()).toBe(false);
    expect(bar.IsSome()).toBe(true);
});

test("testing OfObj", () => {
    let two: number | null = 2;
    expect(typeGuard(ofObj1(two))).toBe("4");
    two = null;
    expect(typeGuard(ofObj1(two))).toBe("NAH");

    let four: number | undefined = 4;
    expect(typeGuard(ofObj2(four))).toBe("16");
    four = undefined;
    expect(typeGuard(ofObj2(four))).toBe("NAH");
});

class Foo {
    public JustToMakeFooNonEmpty() {
        return null;
    }
}
class Bar {
    public JustToMakeBarNonEmpty() {
        return null;
    }
}

test("testing TypeHelpers.IsInstanceOf", () => {
    const str1 = "foo";
    expect(TypeHelpers.IsInstanceOf(str1, String)).toBe(true);
    const str2 = String("foo");
    expect(TypeHelpers.IsInstanceOf(str2, String)).toBe(true);

    //commented this one because prettier complains about it, but it works:
    //let str3 = 'foo';
    //expect(TypeHelpers.IsInstanceOf(str3, String)).toBe(true);

    const nonStr = 3;
    expect(TypeHelpers.IsInstanceOf(nonStr, String)).toBe(false);

    const int1 = 2;
    expect(TypeHelpers.IsInstanceOf(int1, Number)).toBe(true);
    const int2 = Number(2);
    expect(TypeHelpers.IsInstanceOf(int2, Number)).toBe(true);
    const nonInt = "2";
    expect(TypeHelpers.IsInstanceOf(nonInt, Number)).toBe(false);

    const foo = new Foo();
    const bar = new Bar();
    expect(TypeHelpers.IsInstanceOf(foo, Foo)).toBe(true);
    expect(TypeHelpers.IsInstanceOf(bar, Bar)).toBe(true);
    expect(TypeHelpers.IsInstanceOf(foo, Bar)).toBe(false);
    expect(TypeHelpers.IsInstanceOf(bar, Foo)).toBe(false);
});

test("testing TypeHelpers.IsInstanceOf exceptions", () => {
    const strNull = null;
    expect(() => TypeHelpers.IsInstanceOf(strNull, String)).toThrowError(
        "Invalid"
    );
    expect(() => TypeHelpers.IsInstanceOf(strNull, String)).toThrowError(
        "parameter"
    );
    expect(() => TypeHelpers.IsInstanceOf(strNull, String)).toThrowError(
        "null"
    );
    const strUndefined = undefined;
    expect(() => TypeHelpers.IsInstanceOf(strUndefined, String)).toThrowError(
        "Invalid"
    );
    expect(() => TypeHelpers.IsInstanceOf(strUndefined, String)).toThrowError(
        "parameter"
    );
    expect(() => TypeHelpers.IsInstanceOf(strUndefined, String)).toThrowError(
        "undefined"
    );

    const typeNull = null;
    expect(() => TypeHelpers.IsInstanceOf("foo", typeNull)).toThrowError(
        "Invalid"
    );
    expect(() => TypeHelpers.IsInstanceOf("foo", typeNull)).toThrowError(
        "parameter"
    );
    expect(() => TypeHelpers.IsInstanceOf("foo", typeNull)).toThrowError(
        "null"
    );
    const typeUndefined = undefined;
    expect(() => TypeHelpers.IsInstanceOf("foo", typeUndefined)).toThrowError(
        "Invalid"
    );
    expect(() => TypeHelpers.IsInstanceOf("foo", typeUndefined)).toThrowError(
        "parameter"
    );
    expect(() => TypeHelpers.IsInstanceOf("foo", typeUndefined)).toThrowError(
        "undefined"
    );
});

function handleResult(result: Result<number, string>): string {
    if (result instanceof Err) {
        return `Error: ${result.error}`;
    } else {
        return `Success: ${result.value}`;
    }
}

test("testing Results", () => {
    const okResult: Result<number, string> = new Ok(42);
    const errResult: Result<number, string> = new Err("something went wrong");

    expect(handleResult(okResult)).toBe("Success: 42");
    expect(handleResult(errResult)).toBe("Error: something went wrong");
});

test("testing Result Is methods", () => {
    const okResult: Result<number, string> = new Ok(42);
    const errResult: Result<number, string> = new Err("error");

    expect(okResult.IsOk()).toBe(true);
    expect(okResult.IsErr()).toBe(false);
    expect(errResult.IsOk()).toBe(false);
    expect(errResult.IsErr()).toBe(true);
});

test("testing ResultHelpers.OfFn with success", () => {
    const result = ResultHelpers.OfFn(() => 2 + 2);
    expect(result instanceof Ok).toBe(true);
    if (result instanceof Ok) {
        expect(result.value).toBe(4);
    }
});

test("testing ResultHelpers.OfFn with error", () => {
    const result = ResultHelpers.OfFn<number>(() => {
        throw new Error("oops");
    });
    expect(result instanceof Err).toBe(true);
    if (result instanceof Err) {
        expect(result.error).toBeInstanceOf(Error);
    }
});

test("testing ResultHelpers.OfPromise with success", async () => {
    const promise = Promise.resolve(42);
    const result = await ResultHelpers.OfPromise(promise);
    expect(result instanceof Ok).toBe(true);
    if (result instanceof Ok) {
        expect(result.value).toBe(42);
    }
});

test("testing ResultHelpers.OfPromise with error", async () => {
    const promise = Promise.reject(new Error("async oops"));
    const result = await ResultHelpers.OfPromise(promise);
    expect(result instanceof Err).toBe(true);
    if (result instanceof Err) {
        expect(result.error).toBeInstanceOf(Error);
    }
});
