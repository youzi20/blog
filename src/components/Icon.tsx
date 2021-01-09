import React from 'react';
import styled from 'styled-components';

interface IconProps {
    name: string
    link?: string
    blank?: boolean
}

const Base: React.FC<IconProps> = styled((props) => {
    const { className, name, ...other } = props;
    return <svg className={"youzi-icon " + (className || "")} aria-hidden="true" {...other}>
        <use xlinkHref={"#" + name} />
    </svg>
})`
width: 1em;
height: 1em;
vertical-align: -0.15em;
fill: currentColor;
overflow: hidden;
`;

export const Icon: React.FC<IconProps> = styled((props) => {
    const { link, blank, ...other } = props;
    return <>
        {link ?
            <a href={link} target={blank && "_blank"}>
                <Base {...other} />
            </a> :
            <Base {...other} />
        }
    </>
})`
`;