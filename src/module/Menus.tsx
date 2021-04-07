import React, { useState } from 'react';
import styled from 'styled-components';

import { MenusEnum } from '@/enums'

export const Menus = styled(({ className }) => {
    const [show, setShow] = useState(false);

    const handleToggle = () => {
        setShow(!show);
    }

    return <div className={"youzi-menus " + className}>
        <div className={"youzi-menu-btn " + (show ? "active" : "")}
            onClick={handleToggle}>
            <span /><span /><span />
        </div>
        <ul className={show ? "active" : null}>
            {MenusEnum.map(item =>
                <li className={item.match ? "active" : null}
                    key={item.name}
                >
                    <a href={item.link}>{item.name}</a>
                </li>)}
        </ul>
    </div>
})`
font-size: 14px;
color: var(--menuText);

.youzi-menu-btn {
    display: none;
}

ul {
    display: flex;

    li {
        font-family: PingFangSC-Medium;
        line-height: 32px;
        margin-right: 30px;

        &:hover {
            color: var(--menuText-hover);
        }

        &.active {
            color: var(--menuText-hover);
            border-radius: 6px;
            background: var(--menuItemBg-active);
        }
    }

    a {
        display: block;
        padding: 0 15px;
        cursor: pointer;
    }
}


@media screen and (max-width: 768px) { 
    .youzi-menu-btn {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 30px;
        height: 40px;
        cursor: pointer;
        overflow: hidden;
        z-index: 99;
    
        span {
            position: relative;
            width: 22px;
            height: 3px;
            margin: 2px 0;
            border-top-left-radius: 1px;
            border-bottom-left-radius: 1px;
            background: var(--textNormal);
            transition: all .3s ease;
    
            &:nth-child(1) {
                left: 14px;
            }
    
            &:nth-child(2) {
                left: 8px;
            }
    
            &:nth-child(3) {
                left: 20px;
            }
        }
    
        &.active span {
            &:nth-child(1) {
                left: 8px;
            }
    
            &:nth-child(2) {
                left: 20px;
            }
    
            &:nth-child(3) {
                left: 14px;
            }
        }
    }

    ul {
        position: fixed;
        top: -100%;
        left: 0;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        color: #8d8d8d;
        background:var(--menuMaskBg);
        opacity: 0;
        z-index: 9;

        &.active {
            top: 0;
            opacity: 1;
            transition: all .3s ease;
        }

        li {
            width: 50%;
            font-family: PingFangSC-Medium;
            font-size: 20px;
            line-height: 10vh;
            margin: 0 auto;

            &.active {
                background: none;
            }
        }
    }
}
`;