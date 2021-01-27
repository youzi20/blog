import React from 'react';
import styled from 'styled-components';

export const Container = styled(({ className, w, ...other }) => <div className={"youzi-container " + className} {...other} />)`
width: ${({ w = 1200 }) => typeof w === "number" ? w + "px" : w};
margin: 20px auto 0;

@media screen and (max-width: 1080px) { 
    width: 100%;
    margin: 90px 0 0;
    padding: 0 10vw;
}

@media screen and (max-width: 768px) { 
    padding: 0;
}
`;