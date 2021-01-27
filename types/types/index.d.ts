export declare enum MenuTypes {
    NEWS = "news",
    NOTES = "notes",
    MESSAGE = "message"
}
export interface MenusPeops {
    value?: MenuTypes;
    onChange?: (val: any) => void;
}
export declare type LiteralUnion<T extends U, U> = T | (U & {});
