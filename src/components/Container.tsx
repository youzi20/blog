import React from 'react';
import styled from 'styled-components';

interface IContainerProps {
    width?: number | string
}

export const Container: React.FC<IContainerProps> = styled.div`
width: ${({ width = 1200 }) => typeof width === "number" ? width + "px" : width};
margin: 0 auto;

`;