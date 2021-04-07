import React from 'react';
import styled from 'styled-components';

export const Flex = styled(({ className, ...other }) => <div className={"youzi-flex " + className} {...other} />)`
display: flex;
justify-content: ${({ justifyContent = "space-between" }) => justifyContent} ;
align-items: ${({ alignItems = "center" }) => alignItems} ;
`;



Flex.LF = styled(({ className, ...other }) => <div className={"youzi-flex-lf " + className} {...other} />)`
display: flex;
justify-content: ${({ justifyContent = "center" }) => justifyContent} ;
align-items: ${({ alignItems = "center" }) => alignItems} ;
`;

Flex.RT = styled(({ className, ...other }) => <div className={"youzi-flex-rt " + className} {...other} />)`
display: flex;
justify-content: ${({ justifyContent = "center" }) => justifyContent} ;
align-items: ${({ alignItems = "center" }) => alignItems} ;
`;