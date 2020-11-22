import React from 'react';
import styled from 'styled-components';


const userInfo = {
    youzi: {
        name: "柚子青年。",
        avatar: "/blog/static/images/user/youzi.jpeg",
        github: "https://github.com/youzi20"
    }
}

const User: React.FC<{ name: string }> = styled(({className, name}) => {
    const info = userInfo[name]

    return <span className={className}>
        <img src={info.avatar} alt={info.name}/>
        <a href={info.github}>{info.name}</a>
    </span>
})`
display: flex;
align-items: center;
height: 22px;
font-size: 12px;

img {
    width: 24px;
    margin-right: 5px;
    border-radius: 50%;
    border: 2px solid #ededed;
}

a:hover {
    text-decoration: underline;
}
`

export default User;

