import {useEffect, useState} from 'react';

const useWindowZoom = (): { width: number, height: number, refresh: () => void } => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const refresh = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }

    useEffect(() => {
        refresh();

        window.addEventListener("resize", refresh);

    }, []);

    return {
        width,
        height,
        refresh
    }
}

export default useWindowZoom;