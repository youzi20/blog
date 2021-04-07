import React, { useState } from 'react';
import styled from 'styled-components';


import { Flex, Container, Icon, } from '@/components';
import { Menus } from '@/module';
import { useWindowZoom, useTheme } from '@/hooks';

const ThemeBtn = styled((props) => {
    const { theme, handleTheme } = useTheme();

    return <div {...props} onClick={handleTheme}>
        <Flex>
            <Flex.LF ><Icon name="youzi_light" /></Flex.LF>
            <Flex.RT><Icon name="youzi_dark" /></Flex.RT>
            <span className={`switch ${theme}`} />
        </Flex>
    </div>
})`
position: relative;
font-size: 16px;
color: var(--themeBtn);
width: 52px;
height: 24px;
background: var(--themeBtn);
border-radius: 12px;
cursor: pointer;

.youzi-flex {
    width: 100%;
    height: 100%;
    padding: 0 1px;
 
    .youzi-flex-lf,
    .youzi-flex-rt {
        width: 22px;
        height: 22px;
    }

    svg {
        position: relative;
        z-index: 1;
    }
}

.switch {
    position: absolute;
    top: 1px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: var(--bg);
    transition: left .3s ease;

    &.light {
        left: 1px;
    }

    &.dark {
        left: 28px;
    }
}

@media screen and (max-width: 768px) {  
    margin-right: 50px;
}

`;


export const Header = styled(({ className, w, action }) => {
    const { width } = useWindowZoom();

    return !w || width <= w ? <div className={"youzi-header " + className}>
        <Container >
            <Flex>
                <Flex.LF>
                    <a className="user-info" href="/">
                        <div className="avatar">
                            <img src="/public/static/image/user/youzi.jpeg" alt="" />
                        </div>
                        <p className="nickname">柚子青年。</p>
                    </a>
                </Flex.LF>
                <Flex.RT>
                    <Menus />
                    <ThemeBtn className="theme-btn" />
                </Flex.RT>
            </Flex>
        </Container>
        <div className="youzi-header-action">
            {action}
        </div>
    </div> : null
})`
position: fixed;
top: 0;
left: 0;
width: 100%;
padding: 15px 0;
background: var(--headerBg);
box-shadow: var(--boxShadow);
z-index: 9999;

.user-info {
    display: flex;
    align-items: center;
    color: var(--headerText);
}

.avatar {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    border-radius: 2px;
    overflow: hidden;

    img {
        width: 100%;
    }
}

.nickname {
    font-weight: bold;
    font-size: 14px;
}

@media screen and (max-width: 768px) { 
    padding: 15px;
}
`