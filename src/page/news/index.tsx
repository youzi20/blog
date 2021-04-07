import React, { useEffect, useRef, useState } from 'react';
import { render } from 'react-dom';
import styled  from 'styled-components';

import { MainContainer, MD } from '@/components';
import { Header, Footer, User, Timer, NewsInfo } from '@/module';

// @ts-ignore
const dataSource = window.__global_data__;
const { id, title, contentHTML, createTimer, updateTimer, total, userAction } = dataSource || {};


const HeaderAnimate = styled.div`
.youzi-container,
.sticky-title {
    position: relative;
    top: ${({ sticky }) => sticky ? "-70px" : 0};
    transition: all .3s ease;
}

.sticky-title {
    font-weight: bold;
    font-size: 18px;
    color: var(--textNormal);
    text-align: center;
    line-height: 20px;
    padding: 25px 0;
}
`;

const App = styled(({ className }) => {
    const [sticky, setSticky] = useState(false);
    const titleRef = useRef(null);

    const handleScroll = () => {
        setSticky(document.documentElement.scrollTop > titleRef.current.offsetTop + titleRef.current.clientHeight - 70);
    }

    useEffect(() => {
        handleScroll();
        window.addEventListener("scroll", handleScroll);
    }, []);

    return <div className={className}>
        <HeaderAnimate sticky={sticky}>
            <Header action={<div className="sticky-title">{title}</div>} />
        </HeaderAnimate>
        <NewsInfo {...{ id, total, userAction }} />
        <MainContainer w={780}>
            <div className="news-content">
                <h1 ref={titleRef}>{title}</h1>
                <div className="news-info">
                    <User name="youzi" />
                    <Timer timer={createTimer} format="YYYY-MM-DD HH:mm" />
                </div>

                <MD html={contentHTML} />

                <div className="news-tips">
                    最后更新：<Timer timer={updateTimer} format="YYYY-MM-DD HH:mm" />
                </div>
            </div>
        </MainContainer>

        <Footer />
    </div>
})`
.news-content {
    h1 {
        font-size: 28px;
        font-weight: bold;
        color: var(--textNormal);
        margin-bottom: 10px;
    }

    .news-info {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: var(--textSecondary);
        margin-bottom: 25px;

        .youzi-user {
            width: 140px;
        }
    }

    .news-tips {
        font-size: 12px;
        color: #8590a6;
        margin-top: 20px;
    }
}

@media screen and (max-width: 768px) { 
    .news-content {
        padding: 20px 15px;
        background: var(--bgSecondary);

        h1 {
            font-size: 20px;
        }
    }
}
`;

render(<App />, document.getElementById("root"));