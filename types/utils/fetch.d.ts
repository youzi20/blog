declare type HandleErrorMessage = (response: any) => any;
declare type HandleCatchMessage = (error: any) => any;
declare type OptionsProps = {
    method?: "GET" | "POST";
    credentials?: "include" | "omit" | "same-origin";
    headers?: string[][] | Record<string, string>;
    body?: Record<string, any> | string;
    rawJson?: Record<string, any>;
    handleErrorMessage?: HandleErrorMessage;
    handleCatchMessage?: HandleCatchMessage;
};
export declare const Request: (url: string, params?: OptionsProps) => Promise<any>;
export {};
