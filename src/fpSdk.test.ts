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

test("testing TypeHelpers.cast.to", () => {
    const str1 = "foo";
    expect(TypeHelpers.cast(str1).to(String)).toBe(true);
    const str2 = String("foo");
    expect(TypeHelpers.cast(str2).to(String)).toBe(true);

    //commented this one because prettier complains about it, but it works:
    //let str3 = 'foo';
    //expect(TypeHelpers.cast(str3).to(String)).toBe(true);

    const nonStr = 3;
    expect(TypeHelpers.cast(nonStr).to(String)).toBe(false);

    const int1 = 2;
    expect(TypeHelpers.cast(int1).to(Number)).toBe(true);
    const int2 = Number(2);
    expect(TypeHelpers.cast(int2).to(Number)).toBe(true);
    const nonInt = "2";
    expect(TypeHelpers.cast(nonInt).to(Number)).toBe(false);

    const foo = new Foo();
    const bar = new Bar();
    expect(TypeHelpers.cast(foo).to(Foo)).toBe(true);
    expect(TypeHelpers.cast(bar).to(Bar)).toBe(true);
    expect(TypeHelpers.cast(foo).to(Bar)).toBe(false);
    expect(TypeHelpers.cast(bar).to(Foo)).toBe(false);
});

test("testing TypeHelpers.stringIsNullishOrEmpty", () => {
    expect(TypeHelpers.stringIsNullishOrEmpty(null as any)).toBe(true);
    expect(TypeHelpers.stringIsNullishOrEmpty(undefined as any)).toBe(true);
    expect(TypeHelpers.stringIsNullishOrEmpty("")).toBe(true);
    expect(TypeHelpers.stringIsNullishOrEmpty("hello")).toBe(false);
    expect(TypeHelpers.stringIsNullishOrEmpty(" ")).toBe(false);
});

test("testing TypeHelpers.stringIsNullishOrWhiteSpace", () => {
    expect(TypeHelpers.stringIsNullishOrWhiteSpace(null as any)).toBe(true);
    expect(TypeHelpers.stringIsNullishOrWhiteSpace(undefined as any)).toBe(true);
    expect(TypeHelpers.stringIsNullishOrWhiteSpace("")).toBe(true);
    expect(TypeHelpers.stringIsNullishOrWhiteSpace(" ")).toBe(true);
    expect(TypeHelpers.stringIsNullishOrWhiteSpace("\t")).toBe(true);
    expect(TypeHelpers.stringIsNullishOrWhiteSpace("\n")).toBe(true);
    expect(TypeHelpers.stringIsNullishOrWhiteSpace("   \t\n  ")).toBe(true);
    expect(TypeHelpers.stringIsNullishOrWhiteSpace("hello")).toBe(false);
    expect(TypeHelpers.stringIsNullishOrWhiteSpace(" hello ")).toBe(false);
});

test("testing TypeHelpers.cast.to exceptions", () => {
    const strNull = null;
    expect(() => TypeHelpers.cast(strNull).to(String)).toThrowError(
        "Invalid"
    );
    expect(() => TypeHelpers.cast(strNull).to(String)).toThrowError(
        "parameter"
    );
    expect(() => TypeHelpers.cast(strNull).to(String)).toThrowError(
        "null"
    );
    const strUndefined = undefined;
    expect(() => TypeHelpers.cast(strUndefined).to(String)).toThrowError(
        "Invalid"
    );
    expect(() => TypeHelpers.cast(strUndefined).to(String)).toThrowError(
        "parameter"
    );
    expect(() => TypeHelpers.cast(strUndefined).to(String)).toThrowError(
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
