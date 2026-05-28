import { test, expect } from "vitest";
import {
    None,
    Some,
    Option,
    Nothing,
    Ok,
    Err,
    Result,
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

test("testing Check.if().is()", () => {
    const str1 = "foo";
    expect(Check.if(str1).is(String)).toBe(true);
    const str2 = String("foo");
    expect(Check.if(str2).is(String)).toBe(true);

    let str3 = 'foo';
    expect(Check.if(str3).is(String)).toBe(true);

    const nonStr = 3;
    expect(Check.if(nonStr).is(String)).toBe(false);

    const int1 = 2;
    expect(Check.if(int1).is(Number)).toBe(true);
    const int2 = Number(2);
    expect(Check.if(int2).is(Number)).toBe(true);
    const nonInt = "2";
    expect(Check.if(nonInt).is(Number)).toBe(false);

    const foo = new Foo();
    const bar = new Bar();
    expect(Check.if(foo).is(Foo)).toBe(true);
    expect(Check.if(bar).is(Bar)).toBe(true);
    expect(Check.if(foo).is(Bar)).toBe(false);
    expect(Check.if(bar).is(Foo)).toBe(false);
});

test("testing Check.if().is() exceptions", () => {
    const strNull = null;
    expect(() => Check.if(strNull).is(String)).toThrowError(
        "Invalid"
    );
    expect(() => Check.if(strNull).is(String)).toThrowError(
        "parameter"
    );
    expect(() => Check.if(strNull).is(String)).toThrowError(
        "null"
    );
    const strUndefined = undefined;
    expect(() => Check.if(strUndefined).is(String)).toThrowError(
        "Invalid"
    );
    expect(() => Check.if(strUndefined).is(String)).toThrowError(
        "parameter"
    );
    expect(() => Check.if(strUndefined).is(String)).toThrowError(
        "undefined"
    );

    const typeNull = null;
    expect(() => Check.if("foo").is(typeNull)).toThrowError(
        "Invalid"
    );
    expect(() => Check.if("foo").is(typeNull)).toThrowError(
        "parameter"
    );
    expect(() => Check.if("foo").is(typeNull)).toThrowError(
        "null"
    );
    const typeUndefined = undefined;
    expect(() => Check.if("foo").is(typeUndefined)).toThrowError(
        "Invalid"
    );
    expect(() => Check.if("foo").is(typeUndefined)).toThrowError(
        "parameter"
    );
    expect(() => Check.if("foo").is(typeUndefined)).toThrowError(
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
