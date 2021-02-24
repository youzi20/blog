export enum CommonTypes {
    USERINFO,
    SIDEBAR
}

export enum MenuTypes {
    NEWS = "news",
    NOTES = "notes",
    MESSAGE = "message"
}

export enum UrlTypes {
    NEWS,
}

export interface MenusPeops {
    value?: MenuTypes
    onChange?: (val) => void
}