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
    Dyn,
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

test("testing Dyn.cast.to", () => {
    const str1 = "foo";
    expect(Dyn.cast(str1).to<string>().isSome()).toBe(true);
    const str2 = String("foo");
    expect(Dyn.cast(str2).to<string>().isSome()).toBe(true);

    //commented this one because prettier complains about it, but it works:
    //let str3 = 'foo';
    //expect(Dyn.cast(str3).to<string>().isSome()).toBe(true);

    const nonStr = 3;
    expect(Dyn.cast(nonStr).to<string>().isSome()).toBe(true);

    const int1 = 2;
    expect(Dyn.cast(int1).to<number>().isSome()).toBe(true);
    const int2 = Number(2);
    expect(Dyn.cast(int2).to<number>().isSome()).toBe(true);
    const nonInt = "2";
    expect(Dyn.cast(nonInt).to<number>().isSome()).toBe(true);

    const foo = new Foo();
    const bar = new Bar();
    expect(Dyn.cast(foo).to<Foo>().isSome()).toBe(true);
    expect(Dyn.cast(bar).to<Bar>().isSome()).toBe(true);
    expect(Dyn.cast(foo).to<Bar>().isSome()).toBe(true);
    expect(Dyn.cast(bar).to<Foo>().isSome()).toBe(true);
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

test("testing Dyn.cast.to exceptions", () => {
    const strNull = null;
    expect(() => Dyn.cast(strNull).to<string>()).toThrowError(
        "Invalid"
    );
    expect(() => Dyn.cast(strNull).to<string>()).toThrowError(
        "parameter"
    );
    expect(() => Dyn.cast(strNull).to<string>()).toThrowError(
        "null"
    );
    const strUndefined = undefined;
    expect(() => Dyn.cast(strUndefined).to<string>()).toThrowError(
        "Invalid"
    );
    expect(() => Dyn.cast(strUndefined).to<string>()).toThrowError(
        "parameter"
    );
    expect(() => Dyn.cast(strUndefined).to<string>()).toThrowError(
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
