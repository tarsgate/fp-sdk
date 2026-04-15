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
    const foo = OptionHelpers.ofObj(option);
    return foo;
}

function ofObj2(option: number | undefined): Option<number> {
    const foo = OptionHelpers.ofObj(option);
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
    expect(foo.isNone()).toBe(true);
    expect(bar.isNone()).toBe(false);
    expect(foo.isSome()).toBe(false);
    expect(bar.isSome()).toBe(true);
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
    public justToMakeFooNonEmpty() {
        return null;
    }
}
class Bar {
    public justToMakeBarNonEmpty() {
        return null;
    }
}

test("testing TypeHelpers.IsInstanceOf", () => {
    const str1 = "foo";
    expect(TypeHelpers.isInstanceOf(str1, String)).toBe(true);
    const str2 = String("foo");
    expect(TypeHelpers.isInstanceOf(str2, String)).toBe(true);

    //commented this one because prettier complains about it, but it works:
    //let str3 = 'foo';
    //expect(TypeHelpers.isInstanceOf(str3, String)).toBe(true);

    const nonStr = 3;
    expect(TypeHelpers.isInstanceOf(nonStr, String)).toBe(false);

    const int1 = 2;
    expect(TypeHelpers.isInstanceOf(int1, Number)).toBe(true);
    const int2 = Number(2);
    expect(TypeHelpers.isInstanceOf(int2, Number)).toBe(true);
    const nonInt = "2";
    expect(TypeHelpers.isInstanceOf(nonInt, Number)).toBe(false);

    const foo = new Foo();
    const bar = new Bar();
    expect(TypeHelpers.isInstanceOf(foo, Foo)).toBe(true);
    expect(TypeHelpers.isInstanceOf(bar, Bar)).toBe(true);
    expect(TypeHelpers.isInstanceOf(foo, Bar)).toBe(false);
    expect(TypeHelpers.isInstanceOf(bar, Foo)).toBe(false);
});

test("testing TypeHelpers.isInstanceOf exceptions", () => {
    const strNull = null;
    expect(() => TypeHelpers.isInstanceOf(strNull, String)).toThrowError(
        "Invalid"
    );
    expect(() => TypeHelpers.isInstanceOf(strNull, String)).toThrowError(
        "parameter"
    );
    expect(() => TypeHelpers.isInstanceOf(strNull, String)).toThrowError(
        "null"
    );
    const strUndefined = undefined;
    expect(() => TypeHelpers.isInstanceOf(strUndefined, String)).toThrowError(
        "Invalid"
    );
    expect(() => TypeHelpers.isInstanceOf(strUndefined, String)).toThrowError(
        "parameter"
    );
    expect(() => TypeHelpers.isInstanceOf(strUndefined, String)).toThrowError(
        "undefined"
    );

    const typeNull = null;
    expect(() => TypeHelpers.isInstanceOf("foo", typeNull)).toThrowError(
        "Invalid"
    );
    expect(() => TypeHelpers.isInstanceOf("foo", typeNull)).toThrowError(
        "parameter"
    );
    expect(() => TypeHelpers.isInstanceOf("foo", typeNull)).toThrowError(
        "null"
    );
    const typeUndefined = undefined;
    expect(() => TypeHelpers.isInstanceOf("foo", typeUndefined)).toThrowError(
        "Invalid"
    );
    expect(() => TypeHelpers.isInstanceOf("foo", typeUndefined)).toThrowError(
        "parameter"
    );
    expect(() => TypeHelpers.isInstanceOf("foo", typeUndefined)).toThrowError(
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

    expect(okResult.isOk()).toBe(true);
    expect(okResult.isErr()).toBe(false);
    expect(errResult.isOk()).toBe(false);
    expect(errResult.isErr()).toBe(true);
});
