import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { MenusEnum } from '../enums'

export const Menus = styled(({ className, value, show: propsShow, onChange, onChangeStatus }) => {
    const [show, setShow] = useState(propsShow || false);

    const handleClick = (value) => {
        setShow(false);
        onChange && onChange(value);
        onChangeStatus && onChangeStatus(false);
    }

    const handleToggle = () => {
        setShow(!show);
        onChangeStatus && onChangeStatus(!show);
    }

    useEffect(() => {
        if (propsShow !== show) setShow(propsShow);
    }, [propsShow]);

    return <div className={"youzi-menus " + className}>
        <div className={"youzi-menu-btn" + (show ? " active" : "")}
            onClick={handleToggle}>
            <span /><span /><span />
        </div>
        <ul className={show ? "active" : ""}>
            {MenusEnum.map(item =>
                <li className={value === item.value ? "active" : ""}
                    key={item.value}
                    onClick={() => handleClick(item.value)}
                >
                    {item.name}
                </li>)}
        </ul>
    </div>
})`
position: fixed;
top: 20px;
left: 50%;
width: 80px;
font-size: 13px;
color: #505050;
text-align: center;
margin-left: -490px;
z-index: 99999;

ul {
    padding: 10px 0;
    border-radius: 8px;
    border: 1px solid #e7e7e7;
    background: #fff;

    li {
        line-height: 36px;
        transition: all .3s ease;
        cursor: pointer;

        &:hover,
        &.active {
            color: #fff;
            background: #101010;
        }
    }
}


@media screen and (max-width: 1080px) { 
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    color: #8d8d8d;
    text-align: left;

    .youzi-menu-btn {
        position: fixed;
        top: 15px;
        right: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 30px;
        height: 40px;
        cursor: pointer;
        overflow: hidden;
        z-index: 1;
    
        span {
            position: relative;
            width: 22px;
            height: 3px;
            margin: 2px 0;
            border-top-left-radius: 1px;
            border-bottom-left-radius: 1px;
            background: #121212;
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
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: 0 0 40vh;
        border: 0;
        border-radius: 0;
        background:rgba(255, 255, 255, .9);
        opacity: 0;

        &.active {
            top: 0;
            opacity: 1;
            transition: all .3s ease;
        }

        li {
            width: 50%;
            font-size: 20px;
            font-weight: bold;
            line-height: 10vh;
            margin: 0 auto;

            &:hover,
            &.active {
                color: #121212;
                background: none;
            }
        }
    }
}
`;