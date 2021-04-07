export enum CommonTypes {
    USERINFO,
    SIDEBAR
}

export enum MenuTypes {
    NEWS = "news",
    NOTES = "notes",
    TOOLS = "tools",
    MESSAGES = "messages"
}

export enum UrlTypes {
    NEWS,
}

export interface MenusPeops {
    value?: MenuTypes
    onChange?: (val) => void
}