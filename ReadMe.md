fp-sdk [![NPM Version](https://img.shields.io/npm/v/fp-sdk)](https://www.npmjs.com/package/fp-sdk)
======

After more than 20 years of programming, and being a bit seasoned on the TypeScript/JavaScript space, one morning I decided to ask an AI this question:

> given that typescript tries to improve javascript, so to speak, wouldn't it be better if devs using typescript stop using `undefined`, and just use `null`, to prevent one of the main javascript pitfalls?

The AI replied with something both unexpected and surprising — TL;DR: "nah, rather use `undefined` instead of `null`, if you're going to avoid one of them".

Here was the full reply:

> While eliminating one of the "nullish" values (either `null` or `undefined`) is a popular strategy to simplify code, the consensus in the TypeScript community is
> not to use only `null`. In fact, many developers and the TypeScript team itself often prefer using **`undefined`** exclusively. [1, 2, 3, 4, 5]
>
> Here is a breakdown of why only using `null` is not necessarily better, and why `undefined` is frequently favored. [6, 7]
>
> 1. The "Undefined" Nature of JavaScript
>
> `undefined` is the default, native, and unavoidable "non-value" in JavaScript.
>
> • Uninitialized Variables: If you declare a variable without assigning a value, it is `undefined`.
> • Missing Object Properties: Accessing a non-existent property returns `undefined`.
> • Function Returns: A function that doesn't explicitly return a value returns `undefined`. [10, 11]
>
> By trying to use `null` everywhere, you are forcing a value that isn't native to the language's defaults, leading to, as one commentator put it, "fighting the language". [3]
>
> 2. TypeScript and Optionality
>
> In TypeScript, the `?` operator (optional properties/parameters) automatically treats missing values as `undefined`, not `null`. [10, 12]
>
>     interface User {
>       id: number;
>       phone?: string; // This is equivalent to string | undefined
>     }
>
> If you adopt a "use null only" policy, you must avoid the `?` operator, making your types more verbose (`string | null`) and increasing the surface area for errors. [13]
>
> 3. JavaScript Behaviors (Default Values)
>
> `undefined` and `null` behave differently in JS:
>
> • Default Parameters: In functions, default parameters only trigger if the argument is `undefined`, not `null`.
> • JSON Serialization: When using `JSON.stringify()`, keys with `undefined` values are removed entirely, while keys with `null` are kept. [3, 14, 15]
>
> 4. The Case for Using Only One
>
> The real pitfall is not using both, but using them inconsistently. Either path —"only null" or "only undefined"— is better than mixing them.
>
> • Pro-Undefined: It is the language default, cleaner with `?`, and consistent with modern TypeScript libraries.
> • Pro-Null: It is more explicit, representing "I intentionally set this to nothing." [3, 10, 17, 18]
>
> 5. Best Practice: Embrace Strictness [19]
>
> Instead of banning one, the best practice to avoid "null pitfalls" in TypeScript is:
>
> 1. Enable `strictNullChecks` in tsconfig.json`. This forces you to handle potential / cases at compile time.
> 2. Use `?.` (Optional Chaining) and `??` (Nullish Coalescing) to safely handle both values.
> 3. Use `== null` to check for both `null` and `undefined` safely when needed. [14, 20, 21]
>
> Summary: While using only `null` might seem cleaner from a traditional OOD perspective, using only `undefined` (or accepting both with strict checks) is generally
> more idiomatic in the TypeScript/JavaScript ecosystem, as it aligns with how the engine itself handles missing data. [1, 2, 6]
>
> AI responses may include mistakes.
>
> [1] https://stackoverflow.com/questions/49746803/typescript-null-versus-undefined
>
> [2] https://schibsted-vend.pl/blog/javascript-dilemma/
>
> [3] https://www.reddit.com/r/typescript/comments/11dpu05/undefined_vs_null/
>
> [4] https://basarat.gitbook.io/typescript/recap/null-undefined
>
> [5] https://www.reddit.com/r/typescript/comments/1aw0c85/how_to_reason_about_possibly_null_values_during/
>
> [6] https://www.reddit.com/r/typescript/comments/11dpu05/undefined_vs_null/
>
> [7] https://www.reddit.com/r/typescript/comments/dq2zla/is_it_bad_practice_to_use_optional_fields_on/
>
> [8] https://www.reddit.com/r/typescript/comments/11dpu05/undefined_vs_null/
>
> [9] https://palantir.github.io/tslint/rules/no-null-keyword/
>
> [10] https://medium.com/@codetheinterface/undefined-vs-null-the-ultimate-guide-for-javascript-and-typescript-dabf9346309a
>
> [11] https://medium.com/@codetheinterface/undefined-vs-null-the-ultimate-guide-for-javascript-and-typescript-dabf9346309a
>
> [12] https://spin.atomicobject.com/optional-undefined-typescript/
>
> [13] https://stackoverflow.com/questions/37980559/is-it-better-to-return-undefined-or-null-from-a-javascript-function
>
> [14] https://basarat.gitbook.io/typescript/recap/null-undefined
>
> [15] https://www.reddit.com/r/learnjavascript/comments/1b3f3s7/is_my_interpretation_of_null_undefined_and_nan/
>
> [16] https://langdev.stackexchange.com/questions/4209/should-a-language-have-both-null-and-undefined-values
>
> [17] https://www.youtube.com/watch?v=SNfjcalqMQE
>
> [18] https://github.com/sindresorhus/eslint-plugin-unicorn/issues/1507
>
> [19] https://www.reddit.com/r/node/comments/3ixp5o/is-it-best-practice_to-use-strict/
>
> [20] https://javascript.plainenglish.io/mastering-null-undefined-in-typescript-optional-chaining-nullish-coalescing-best-practices-b1404be1e77d
>
> [21] https://jameshenry.blog/typescript-null-and-undefined-types/

Fascinating.

Of course, I love the `strictNullChecks` flag, but being used to the simplicity of FP's languages approach of **rather not having null at all**, I embarked on the quest of bringing that to TypeScript.

So:
* Not avoiding `undefined` in favour of `null`.
* Not avoiding `null` in favour of `undefined`, either.
* Not adopting the religious `strictNullChecks` along with carefully using `?.`, `??` and `== null` (as opposed to triple `===`), either.

NO! There has to be a better way.

And, no, adopting the HUGELY BLOATED lib 'Effect.ts' is not it. We need something way more simple.

Enter **fp-sdk**.
