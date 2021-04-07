import { useEffect, useState } from 'react';

enum Theme {
    DARK = "dark",
    LIGHT = "light"
}

export const useTheme = (theme?: Theme) => {
    const [t, setT] = useState<Theme>(theme);

    const handleTheme = () => {
        const theme = t === Theme.DARK ? Theme.LIGHT : Theme.DARK;
        localStorage.theme = theme;
        setT(theme);
        document.body.className = theme;
    }

    useEffect(() => {
        document.body.className = t;
    }, [t]);

    useEffect(() => {
        const windowTheme = window.matchMedia('(prefers-color-scheme: dark)').matches && Theme.DARK;
        const theme = localStorage.theme || windowTheme || Theme.LIGHT;
        setT(theme);
    }, []);


    return {
        theme: t,
        handleTheme
    }
}