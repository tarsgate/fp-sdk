import { test, expect } from "vitest";
import {
    None,
    Some,
    Option,
    Nothing,
    Ok,
    Err,
    Result,
    Dyn,
    Check,
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
    const foo = Option.ofObj(option);
    return foo;
}

function ofObj2(option: number | undefined): Option<number> {
    const foo = Option.ofObj(option);
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

test("testing Dyn.cast().to()", () => {
    const str1 = "foo";
    expect(Dyn.cast(str1).to(String).isSome()).toBe(true);
    const str2 = String("foo");
    expect(Dyn.cast(str2).to(String).isSome()).toBe(true);

    let str3 = 'foo';
    expect(Dyn.cast(str3).to(String).isSome()).toBe(true);

    const nonStr = 3;
    expect(Dyn.cast(nonStr).to(String).isSome()).toBe(false);

    const int1 = 2;
    expect(Dyn.cast(int1).to(Number).isSome()).toBe(true);
    const int2 = Number(2);
    expect(Dyn.cast(int2).to(Number).isSome()).toBe(true);
    const nonInt = "2";
    expect(Dyn.cast(nonInt).to(Number).isSome()).toBe(false);

    const foo = new Foo();
    const bar = new Bar();
    expect(Dyn.cast(foo).to(Foo).isSome()).toBe(true);
    expect(Dyn.cast(bar).to(Bar).isSome()).toBe(true);
    expect(Dyn.cast(foo).to(Bar).isSome()).toBe(false);
    expect(Dyn.cast(bar).to(Foo).isSome()).toBe(false);
});

test("same as 'testing Dyn.cast().to()' but with explicit types", () => {
    const str1 = "foo";
    let castStr1:Option<string> = Dyn.cast(str1).to(String);
    expect(castStr1.isSome()).toBe(true);
    const str2 = String("foo");
    let castStr2:Option<string> = Dyn.cast(str2).to(String);
    expect(castStr2.isSome()).toBe(true);

    let str3 = 'foo';
    let castStr3:Option<string> = Dyn.cast(str3).to(String);
    expect(castStr3.isSome()).toBe(true);

    const nonStr = 3;
    let castNonStr:Option<string> = Dyn.cast(nonStr).to(String);
    expect(castNonStr.isSome()).toBe(false);

    const int1 = 2;
    let castInt1:Option<number> = Dyn.cast(int1).to(Number);
    expect(castInt1.isSome()).toBe(true);
    const int2 = Number(2);
    let castInt2:Option<number> = Dyn.cast(int2).to(Number);
    expect(castInt2.isSome()).toBe(true);
    const nonInt = "2";
    let castNonInt:Option<number> = Dyn.cast(nonInt).to(Number);
    expect(castNonInt.isSome()).toBe(false);

    const foo = new Foo();
    const bar = new Bar();
    let castFooToFoo:Option<Foo> = Dyn.cast(foo).to(Foo);
    expect(castFooToFoo.isSome()).toBe(true);
    let castBarToBar:Option<Bar> = Dyn.cast(bar).to(Bar);
    expect(castBarToBar.isSome()).toBe(true);
    let castFooToBar:Option<Bar> = Dyn.cast(foo).to(Bar);
    expect(castFooToBar.isSome()).toBe(false);
    let castBarToFoo:Option<Foo> = Dyn.cast(bar).to(Foo);
    expect(castBarToFoo.isSome()).toBe(false);
});

test("testing Check.if().is() exceptions", () => {
    const strNull = null;
    expect(() => Dyn.cast(strNull).to(String)).toThrowError(
        "Invalid"
    );
    expect(() => Dyn.cast(strNull).to(String)).toThrowError(
        "parameter"
    );
    expect(() => Dyn.cast(strNull).to(String)).toThrowError(
        "null"
    );
    const strUndefined = undefined;
    expect(() => Dyn.cast(strUndefined).to(String)).toThrowError(
        "Invalid"
    );
    expect(() => Dyn.cast(strUndefined).to(String)).toThrowError(
        "parameter"
    );
    expect(() => Dyn.cast(strUndefined).to(String)).toThrowError(
        "undefined"
    );

    const typeNull = null;
    expect(() => Dyn.cast("foo").to(typeNull)).toThrowError(
        "Invalid"
    );
    expect(() => Dyn.cast("foo").to(typeNull)).toThrowError(
        "parameter"
    );
    expect(() => Dyn.cast("foo").to(typeNull)).toThrowError(
        "null"
    );
    const typeUndefined = undefined;
    expect(() => Dyn.cast("foo").to(typeUndefined)).toThrowError(
        "Invalid"
    );
    expect(() => Dyn.cast("foo").to(typeUndefined)).toThrowError(
        "parameter"
    );
    expect(() => Dyn.cast("foo").to(typeUndefined)).toThrowError(
        "undefined"
    );
});

test("testing that Dyn.tryCast doesn't throw exceptions for 1st param, but does for 2nd", () => {
    const strNull = null;
    expect(Dyn.tryCast(strNull).to(String).isSome()).toBe(false);

    const strUndefined = undefined;
    expect(Dyn.tryCast(strUndefined).to(String).isSome()).toBe(false);

    const typeNull = null;
    expect(() => Dyn.tryCast("foo").to(typeNull)).toThrowError(
        "Invalid"
    );
    expect(() => Dyn.tryCast("foo").to(typeNull)).toThrowError(
        "parameter"
    );
    expect(() => Dyn.tryCast("foo").to(typeNull)).toThrowError(
        "null"
    );
    const typeUndefined = undefined;
    expect(() => Dyn.tryCast("foo").to(typeUndefined)).toThrowError(
        "Invalid"
    );
    expect(() => Dyn.tryCast("foo").to(typeUndefined)).toThrowError(
        "parameter"
    );
    expect(() => Dyn.tryCast("foo").to(typeUndefined)).toThrowError(
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


// dotnet-style APIs...

test("testing Check.ifString().isNullishOrEmpty()", () => {
    const nullString: null | string = null;
    expect(Check.ifString(nullString).isNullishOrEmpty()).toBe(true);
    expect(Check.ifString(null as any).isNullishOrEmpty()).toBe(true);
    const undefString: undefined | string = undefined;
    expect(Check.ifString(undefString).isNullishOrEmpty()).toBe(true);
    expect(Check.ifString(undefined as any).isNullishOrEmpty()).toBe(true);
    expect(Check.ifString("").isNullishOrEmpty()).toBe(true);
    expect(Check.ifString("hello").isNullishOrEmpty()).toBe(false);
    expect(Check.ifString(" ").isNullishOrEmpty()).toBe(false);
});

test("testing Check.ifString().isNullishOrWhiteSpace()", () => {
    expect(Check.ifString(null as any).isNullishOrWhiteSpace()).toBe(true);
    expect(Check.ifString(undefined as any).isNullishOrWhiteSpace()).toBe(true);
    expect(Check.ifString("").isNullishOrWhiteSpace()).toBe(true);
    expect(Check.ifString(" ").isNullishOrWhiteSpace()).toBe(true);
    expect(Check.ifString("\t").isNullishOrWhiteSpace()).toBe(true);
    expect(Check.ifString("\n").isNullishOrWhiteSpace()).toBe(true);
    expect(Check.ifString("   \t\n  ").isNullishOrWhiteSpace()).toBe(true);
    expect(Check.ifString("hello").isNullishOrWhiteSpace()).toBe(false);
    expect(Check.ifString(" hello ").isNullishOrWhiteSpace()).toBe(false);
});
