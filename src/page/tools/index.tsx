import React, { useState } from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';

import { MainContainer } from '@/components';
import { Header, Footer } from '@/module';

import APNG from './APNG';

enum ToolListType {
    APNG = "APNG"
}

const ToolsMenu = styled(({ type, ...other }) => {

    return <div {...other}>
        <ul>
            {Object.values(ToolListType).map(item => <li className={item === type ? "active" : null}>{item}</li>)}
        </ul>
    </div>
})`
display: flex;
font-family: PingFangSC-Medium;
line-height: 36px;
color: var(--textNormal);

li {
    padding: 0 15px;
}
`;

const App = () => {
    // const [type, setType] = useState<ToolListType>(ToolListType.APNG);

    // const onChange = (e) => {
    //     console.log();
    //     const files = [];
    //     const value = e.target.files;
    //     for (let i = 0; i < value.length; i++) {
    //         files.push(value[i]);
    //     }
    //     APNGjs(files).then((res) => console.log(res));
    // }


    return <div>

        <Header />
        <MainContainer>
            {/* <ToolsMenu type={type} /> */}

            <APNG />
        </MainContainer>
        <Footer />



        {/* <input type="file" multiple onChange={onChange} /> */}
    </div>
}

render(<App />, document.getElementById("root"));