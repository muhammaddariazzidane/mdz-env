interface EnvOptions<T> {
    defaultValue?: T;
    required?: boolean;
}
declare function getString(key: string, options?: EnvOptions<string>): string;
declare function getNumber(key: string, options?: EnvOptions<number>): number;
declare function getBoolean(key: string, options?: EnvOptions<boolean>): boolean;
export declare const mdzEnv: {
    string: typeof getString;
    number: typeof getNumber;
    boolean: typeof getBoolean;
};
export {};
