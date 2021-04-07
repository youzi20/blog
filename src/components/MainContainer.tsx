import React from 'react';
import styled from 'styled-components';

import { Container } from '@/components';

export const MainContainer = styled(Container)`
padding-top: 90px;

@media screen and (max-width: 1080px) { 
    padding: 90px 10vw 0;
}

@media screen and (max-width: 768px) { 
    padding: 90px 0 0;
}
`;