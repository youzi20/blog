import React from 'react';
import styled from 'styled-components';
import { Icon } from '../components/index';

const userInfo = {
    youzi: {
        name: "柚子青年。",
        icon: "youzi_youziqingnian",
        github: "https://github.com/youzi20"
    }
}

export const User: React.FC<{ name: string }> = styled(({ className, name }) => {
    const info = userInfo[name]

    return <span className={"youzi-user " + className}>
        <a href={info.github}>
            <i className="icon"><Icon name={info.icon} /></i>
            {info.name}
        </a>
    </span>
})`
height: 24px;
font-size: inherit;
color: inherit;

a {
    display: flex;
    align-items: center;
    height: 100%;
    
    &:hover {
        text-decoration: underline;
    }
}

.icon {
    width: 22px;
    font-size: 16px;
    text-align: center;
    margin-right: 5px;
}
`;