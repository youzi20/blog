import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import {BannerAnimation} from "../components";

const NickName = styled(({className}) =>
    <img src="/blog/static/images/nickName.png" alt="" className={className}/>
)`
position: absolute;
top: 30px;
left: 50%;
margin-left: -122px;
z-index: 9;
`

const App = styled(({className}) => {
    return <div className={className}>
        <BannerAnimation>
            <NickName/>
        </BannerAnimation>
    </div>
})`
position: relative;

`;

ReactDOM.render(<App/>, document.getElementById("root"));