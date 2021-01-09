import React, { useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';


import "./markdown.scss";

interface MDProps {
    html: string
}

export const MD: React.FC<MDProps> = (props) => {
    const { html } = props;
    const bodyRef = useRef(null);

    useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.querySelectorAll("code[class*=lang]").forEach(item => {
                const language = item.className.replace("lang-", "");

                item.innerHTML = hljs.highlight(language, item.innerHTML).value.replace(/&amp;/g, "&");
            })
        }
    }, [bodyRef]);

    return <div ref={bodyRef} className="markdown-body" dangerouslySetInnerHTML={{ __html: html }}></div>

}
