import { UrlTypes } from '@/types';

const urlMap = {
    [UrlTypes.NEWS]: "news"
}

export const renderBlogUrl = (type, id) => {

    return urlMap[type] + (id ? "/" + id : "");
}