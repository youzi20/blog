import React from 'react';
import styled from 'styled-components';

import moment from '@/utils/moment';

interface TimerProps {
    timer: string | number
    format?: string
}

export const Timer: React.FC<TimerProps> = styled(({ className, timer, format }) => {

    return <span className={"youzi-timer " + className}>
        {format && moment(timer).format(format)}
    </span>
})`
font-size: inherit;
color: inherit;
`;