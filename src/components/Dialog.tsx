import React from 'react';
import { render, createPortal } from 'react-dom';
import styled from 'styled-components';
import { Icon } from '@/components';

const DialogWrapper = styled(({ className, title, content, onClose }) => {
    return <div className={"youzi-dialog " + className}>
        <div className="youzi-dialog-mask"></div>
        <div className="youzi-dialog-wrap">
            <div className="youzi-dialog-close" onClick={onClose}><Icon name="youzi_close" isHover/></div>
            <div className="youzi-dialog-header">
                <div className="youzi-dialog-title">{title}</div>
            </div>
            <div className="youzi-dialog-body">{content}</div>
            <div className="youzi-dialog-footer"></div>
        </div>
    </div>
})`
position: fixed;
top: 0;
left: 0;
display: flex;
align-items: center;
justify-content: center;
width: 100%;
height: 100%;
z-index: 9999999;

.youzi-dialog-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.45);
}

.youzi-dialog-wrap {
    position: relative;
    min-width: 520px;
    background: var(--bgSecondary);
    border-radius: 4px;
    box-shadow: 0px 3px 15px 0px rgba(0, 0, 0, 0.2);
}

.youzi-dialog-close {
    position: absolute;
    right: 0;
    top: 0;
    width: 55px;
    height: 55px;
    color: var(--textNormal);
    text-align: center;
    line-height: 55px;
    cursor: pointer;
}

.youzi-dialog-header {
    color: var(--textNormal);
    padding: 16px 24px;
}

.youzi-dialog-body {
    font-size: 14px;
    padding: 10px 24px 24px;
}

@media screen and (max-width: 768px) { 
    .youzi-dialog-wrap {
        position: relative;
        min-width: calc(100% - 30px);
    }

}
`;


export const Dialog = (props) => {

    return createPortal(<DialogWrapper {...props} />, document.body);
}


Dialog.show = (props) => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const close = () => {
        container.remove();
    }

    render(<DialogWrapper {...props} onClose={close} />, container);

    return {
        close
    }
}