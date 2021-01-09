import React from 'react';
import styled from 'styled-components';


const userInfo = {
    name: "柚子青年。",
    slogan: "心中有梦，眼里有光，方能远方",
    img: "../static/images/user/youzi.jpg",
    github: "https://github.com/youzi20"
}

export const UserInfo: React.FC = styled(({ className }) => {
    const { name, slogan, github } = userInfo

    return <div className={"youzi-userinfo " + className}>
        {/* <div className="youzi-avatar">
            <img src={img} alt={name} />
        </div> */}
        <div className="youzi-userinfo-text">
            <p className="youzi-nickname">{name}</p>
            <p className="youzi-slogan">{slogan}<span> · <a href={github}>Github</a></span></p>
        </div>
    </div>
})`
display: flex;
align-items: center;
margin: 20px 0;
padding: 20px;

.youzi-avatar {
    width: 80px;
    height: 80px;
    margin-right: 20px;
    border-radius: 50%;
    overflow: hidden;

    img {
        width: 100%;
    }
}

.youzi-nickname {
    font-weight: bold;
    font-size: 18px;
    color: #333;
    margin-bottom: 10px;
}

.youzi-slogan {
    font-size: 14px;
    color: #666;

    span {
        font-size: 14px;
        color: #999;

        a:hover {
            text-decoration: underline;
        }
    }
}
`