export enum MenuTypes {
    NEWS = "news",
    NOTES = "notes",
    MESSAGE = "message"
}

export interface MenusPeops {
    value?: MenuTypes
    onChange?: (val) => void
}


/** https://github.com/Microsoft/TypeScript/issues/29729 */
export type LiteralUnion<T extends U, U> = T | (U & {});