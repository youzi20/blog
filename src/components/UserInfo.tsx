import React from 'react';
import styled from 'styled-components';

export const UserInfo: React.FC = styled(({ className }) => {
    return <div className={"youzi-userinfo " + className}>
        <div className="youzi-avatar">
            <img src="/public/static/image/user/youzi.jpeg" alt="" />
        </div>
        <p className="youzi-nickname">柚子青年。</p>
    </div>
})`
display:none;

@media screen and (max-width: 1080px) {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 15px 20px;
    background: #fff;
    box-shadow: 0px 1px 5px 0px #dadada;
    z-index: 9999;

    .youzi-avatar {
        width: 40px;
        height: 40px;
        margin-right: 10px;
        border-radius: 2px;

        img {
            width: 100%;
        }
    }

    .youzi-nickname {
        font-weight: bold;
        font-size: 14px;
        color: #333;
    }
}
`