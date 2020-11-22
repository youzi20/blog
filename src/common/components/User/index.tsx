import React from 'react';
import styled from 'styled-components';


const userInfo = {
    youzi: {
        name: "柚子青年。",
        avatar: "/blog/static/images/user/youzi.jpg",
        github: "https://github.com/youzi20"
    }
}

const User: React.FC<{ name: string }> = styled(({className, name}) => {
    const info = userInfo[name]

    return <span className={className}>
        <a href={info.github}>
            <span><img src={info.avatar} alt={info.name}/></span>
            {info.name}
        </a>
    </span>
})`
height: 24px;
font-size: 12px;

a {
    display: flex;
    align-items: center;
    
    &:hover {
        text-decoration: underline;
    }
}

span {
    width: 24px;
    margin-right: 5px;
    border-radius: 50%;
    background: #fff;
    overflow: hidden;
    border: 2px solid #fff;
    transition: all .3s ease;
    
    &:hover {
        border-color: #000;
    } 
    
    img {
        display: block;
        width: 100%;
        border: 2px solid transparent;
    }
}
`

export default User;

