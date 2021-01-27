import React from 'react';
import 'highlight.js/styles/github.css';
import "./markdown.scss";
interface MDProps {
    html: string;
    maxHeight?: number;
    show?: boolean;
    tips?: string | React.ReactNode;
    onChange?: (val: boolean) => void;
}
export declare const MD: React.FC<MDProps>;
export {};
