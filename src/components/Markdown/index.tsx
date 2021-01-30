import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import hljs from 'highlight.js';
// import 'highlight.js/styles/github.css';

import { Icon } from '../index';

import "./markdown.scss";

interface MDProps {
    html: string,
    maxHeight?: number
    show?: boolean
    tips?: string | React.ReactNode
    onChange?: (val: boolean) => void
}

export const MD: React.FC<MDProps> = styled((props) => {
    const { className, html, tips, maxHeight, show, onChange } = props;
    const [bodyStyle, setBodyStyle] = useState({});
    const [status, setStatus] = useState("show");
    const bodyRef = useRef(null);

    const handleMarkdownShow = () => {
        setStatus("hide");
        setBodyStyle({ maxHeight: "initial" });
        onChange && onChange(true);
    }

    useEffect(() => {
        if (!show) {
            setStatus("show");
            setBodyStyle({});
        }
    }, [show]);

    useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.querySelectorAll("code[class*=lang]").forEach(item => {
                const language = item.className.replace("lang-", "");

                item.innerHTML = hljs.highlight(language, item.innerHTML).value.replace(/&amp;/g, "&");
            })
        }
    }, [bodyRef]);

    return <div className={"markdown " + className} style={bodyStyle}>
        <div ref={bodyRef} className="markdown-body" dangerouslySetInnerHTML={{ __html: html }} />
        {tips && <div className="markdown-tips">{tips}</div>}
        {maxHeight && status === "show" &&
            <div className="markdown-all" >
                <span onClick={handleMarkdownShow}>阅读全文 <Icon name="youzi_down" /></span>
            </div>}
    </div>
})`
position: relative;
display: flex;
flex-direction: column;
${({ maxHeight }) => maxHeight && `max-height: ${maxHeight}px;padding-bottom:50px;`}
overflow: hidden;

.markdown-body {
    flex: 1;
    overflow: hidden;
}

.markdown-tips {   
    font-size: 12px;
    color: #8590a6;
}

.markdown-all {
    position: absolute;
    bottom: 20px;
    width: 100%;
    height: 100px;
    font-size: 14px;
    line-height: 30px;
    text-align: center;
    padding-top: 70px;
    background: var(--mdLinearGradient);
    cursor: pointer;

    span {
        color: var(--textNormal);
        transition: all .3s ease;

        &:hover {
            color: var(--textHover);
        }
    }
}
`;
