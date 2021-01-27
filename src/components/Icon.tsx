import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface IconProps {
    name: string
    link?: string
    blank?: boolean
    isHover?: boolean
}

const Base: React.FC<IconProps> = styled((props) => {
    const { className, name: propsName, isHover, ...other } = props;
    const [name, setName] = useState(propsName);

    const handleMouseEnter = () => {
        if (isHover) {
            setName(name + "-hover");
        }
    }

    const onMouseLeave = () => {
        if (isHover) {
            setName(name.replace("-hover", ""));
        }
    }

    useEffect(() => {
        setName(propsName);
    }, [propsName]);

    return <svg
        className={"youzi-icon " + (className || "")}
        aria-hidden="true"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={onMouseLeave}
        {...other}>
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