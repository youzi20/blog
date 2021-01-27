import React from 'react';
import styled from 'styled-components';

import { Timer } from './index';

const dataSource = [
    {
        date: "2021 1 10",
        title: "上线",
        text: `呕心沥血一周终于上了一个初级版本。 <br/>
        UI也是借（chao）鉴（xi）了各大网站最终确定的风格以及交互，最后效果还是比较满意的，如果你有什么建议可以提交给我。（建议反馈暂未开发完成，只要我没在王者峡谷旅游🤣，就一定是在完善功能👨‍💻）<br/><br/>
        <img src="/public/static/image/timeline1.jpg" alt=""/>
        `
    },
    {
        date: "2021 1 12",
        title: "增加点赞浏览量统计",
        text: "新增了浏览量统计功能，以及赞、踩、喜欢，收藏暂无交互方案，也增加了钉钉机器人提醒。后续准备优化移动端样式以及黑夜模式，敬请期待！"
    },
    {
        date: "2021 1 16",
        title: "增加迭代记录功能",
        text: "新增了时间轴，记录迭代更新内容。"
    },
]


export const UserMessage = styled(({ className }) => {



    return <div className={"youzi-message " + className}>
        {dataSource.map(({ date, title, text }) =>
            <div className="youzi-message-item" key={date}>
                <h2>{title} <Timer timer={date} format="YYYY年M月D日" /></h2>
                <p dangerouslySetInnerHTML={{ __html: text }} />
            </div >
        )}
    </div >
})`
padding: 10px 0;
border-radius: 4px;
box-shadow: 0px 3px 15px 0px #dadada;

.youzi-message-item {
    position: relative;
    padding: 30px 120px 30px 60px;
    background: #fff;
    transition: all .3s ease;

    &:hover {
        background: #efefef;
    }

    &:not(:last-child):after {
        content: "";
        position: absolute;
        bottom: 0;
        width: calc(100% - 180px);
        height: 1px;
        background: #efefef;
    }

    h2 {
        font-size: 18px;
        font-weight: bold;
        color: #121212;
        line-height: 28px;

        .youzi-timer {
            font-size: 14px;
            color: #ccc;
            margin-left: 5px;
        }
    }

    p {
        font-size: 14px;
        color: #666;
        line-height: 24px;
        text-align: justify;
        margin-top: 2px;
    }
}

@media screen and (max-width: 1080px) { 
    .youzi-message-item {
        padding: 20px 10vw 20px 5vw;

        &:not(:last-child):after {
            width: calc(100% - 15vw);
        }
    }
}

@media screen and (max-width: 768px) { 
    .youzi-message-item {
        border-radius: 0;
    }
}
`;