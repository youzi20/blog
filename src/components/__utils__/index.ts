/** https://github.com/Microsoft/TypeScript/issues/29729 */
export type LiteralUnion<T extends U, U> = T | (U & {});

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;