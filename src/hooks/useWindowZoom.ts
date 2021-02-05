import { useEffect, useState } from 'react';


interface WindowZoom {
    width: number
    height: number
    refresh: () => void
}

export const useWindowZoom: () => WindowZoom = () => {
    const [body] = useState(document.getElementsByTagName("body")[0])
    const [width, setWidth] = useState(body.clientWidth);
    const [height, setHeight] = useState(window.innerHeight);

    const refresh = () => {
        setWidth(body.clientWidth);
        setHeight(window.innerHeight);
    }

    useEffect(() => {
        window.addEventListener("resize", refresh);
    }, []);

    return {
        width,
        height,
        refresh
    }
}