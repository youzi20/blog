import React, { useEffect, useRef, useState } from 'react';
import { render, createPortal } from 'react-dom';
import styled from 'styled-components';

import { Icon } from '../index';

import { LiteralUnion } from '@/types/__utils__';

export interface IMessageConfig {
    name: LiteralUnion<
    | "youzi_success",
    string
    >
    message?: string | React.ReactNode
}

const MessageWrapper = styled(({ className, name, message = "这是一个提示", onClose }) => {
    const [styles, setStyles] = useState({});
    const messageRef = useRef(null);

    useEffect(() => {
        setStyles({ opacity: 1, top: 60, marginLeft: -Math.floor(messageRef.current.offsetWidth / 2) });
        setTimeout(onClose, 2000);
    }, []);

    return <div ref={messageRef} className={"youzi-message " + className} style={styles} ><Icon name={name} /><span>{message}</span></div>
})`
position: fixed;
top: 20px;
left: 50%;
display: flex;
align-items: center;
padding: 10px 20px;
box-shadow: var(--boxShadow);
background: var(--color-5);
opacity: 0;
white-space: nowrap;
transition: opacity .3s ease ,top .3s ease;
z-index: 99999;

.youzi-icon {
    font-size: 20px;
    color: #52c41a;
    margin-right: 8px;
}

span {
    font-size: 14px;
    color: var(--color-1);
    line-height: 20px;
}

`;


const handleConfig: (config: string | React.ReactNode, name: string) => IMessageConfig = (config, name) => {
    const newConfig: IMessageConfig = {
        name: "youzi_" + name
    };

    if (typeof config === 'string' || React.isValidElement(config)) {
        newConfig.message = config;
    }

    return newConfig;
}

const open = (config, name) => {
    const conf = handleConfig(config, name)

    const container = document.createElement('div');
    document.body.appendChild(container);

    const close = () => {
        container.remove();
    }

    render(<MessageWrapper {...conf} onClose={close} />, container);

    return {
        close
    }
}


export const Message = (props) => {

    return createPortal(<MessageWrapper {...props} />, document.body);
}


Message.success = (config) => {
    open(config, "success");
}