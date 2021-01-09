import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

interface TimerProps {
    timer: string | number
    format?: string
}

export const Timer: React.FC<TimerProps> = styled(({ className, timer, format }) => {
    return <span className={"youzi-timer " + className}>
        {format && moment(timer).format(format)}
    </span>
})`
font-size: 12px;
color: #666;
`;