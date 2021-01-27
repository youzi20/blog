import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { Container, Footer, Timer, User, UserInfo, MD } from '../../components';


const dataSource = window.__global_data__;
const { title, contentHTML, createTimer, updateTimer } = dataSource || {};

const App = styled(({ className }) => {
    return <div className={className}>
        <Container w="880px">
            <UserInfo />

            <div className="news-content">
                <h1>{title}</h1>
                <div className="news-info">
                    <User name="youzi" />
                    <Timer timer={createTimer} format="YYYY-MM-DD HH:mm" />
                </div>

                <MD html={contentHTML} />
            </div>
        </Container>


        <Footer />
    </div>
})`
.news-content {
    h1 {
        font-size: 28px;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .news-info {
        display: flex;
        align-items: center;
        margin-bottom: 25px;

        .youzi-user {
            width: 140px;
        }
    }
}
`;

ReactDOM.render(<App />, document.getElementById("root"));