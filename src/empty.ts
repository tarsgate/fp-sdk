export class Empty {
    public static array<T>(): T[] {
        return [];
    }
    public static string(): string {
        return "";
    }
    public static object(): NonNullable<object> {
        return {};
    }
}
