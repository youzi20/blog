import React from 'react';
import { render } from 'react-dom';

import styled from 'styled-components';

const App = styled(({ className }) => {

    return <div className={className}>
        <div className="icon"><img src="https://youziblog.oss-cn-shenzhen.aliyuncs.com/assets/404_light.svg" alt="" /></div>
        <a className="back" href="/" title="柚子青年。">回到首页</a>
    </div>
})`
align-items: center;
justify-content: center;
height: 100%;
background: #18191a;

.icon {
    width: 300px;
    margin-bottom: 40px;

    img {
        width: 100%;
    }
}

.back {
    font-size: 14px;
    color: #fff;
    padding: 12px 28px;
    background: rgba(255,255,255,.1);
    border-radius: 22px;
}
`;

render(<App />, document.getElementById("root"));