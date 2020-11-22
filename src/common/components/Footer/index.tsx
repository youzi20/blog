import React from 'react';
import styled from 'styled-components';


const Footer: React.FC<any> = styled(({className}) => {
    return <div className={className}>
        <a href="http://www.beian.miit.gov.cn/" target="_blank">粤ICP备19109417号</a>
    </div>
})`
font-family: "PingFang SC";
font-size: 14px;
text-align: center;
text-decoration: none;
padding: 20px 0;
`;

export default Footer;