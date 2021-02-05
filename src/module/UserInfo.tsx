import React from 'react';
import styled from 'styled-components';

import { useWindowZoom } from '../hooks';

export const UserInfo = styled(({ className, w, content }) => {
    const { width } = useWindowZoom();

    return !w || width <= w ? <div className={"youzi-user-info " + className}>
        <a className="user-info" href="/">
            <div className="avatar">
                <img src="/public/static/image/user/youzi.jpeg" alt="" />
            </div>
            <p className="nickname">柚子青年。</p>
        </a>
        <div className="youzi-user-info-action">
            {content}
        </div>
    </div> : null
})`
position: fixed;
top: 0;
left: 0;
width: 100%;
padding: 15px 20px;
background: var(--bgSecondary);
box-shadow: var(--boxShadow);
z-index: 9999;

.user-info {
    display: flex;
    align-items: center;
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
    color: var(--textNormal);
}
`