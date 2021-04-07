import React from 'react';
import styled from 'styled-components';

export const Container = styled(({ className, w, ...other }) => <div className={"youzi-container " + className} {...other} />)`
flex: 1;
width: ${({ w = 1080 }) => typeof w === "number" ? w + "px" : w};
margin: 0 auto;

@media screen and (max-width: 1080px) { 
    width: 100%;
    padding: 0 15px;
}

@media screen and (max-width: 768px) { 
    padding: 0;
}
`;