import React, { useEffect, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';

import { User, Timer, Icon, MD } from './index';
import { Request } from "../utils/fetch";

interface ContentListProps {
    item: any
}

interface HandleActionProps {
    position: "absolute" | "fixed"
    width?: number
    left?: number
    bottom?: number
}


export const News: React.FC<ContentListProps> = styled(({ className, item }) => {
    const [show, setShow] = useState(false);
    const [actionStyle, setActionStyle] = useState({});
    const [data, setData] = useState({ zan: 0, cai: 0, likes: 0, collects: 0, views: 0 });
    const [userData, setUserData] = useState({ zan: false, cai: false, likes: false, });
    const eventListener = useCallback(() => handleScrool(), []);
    const newsRef = useRef();

    const queryNewsDataById = async () => {
        const { total, userAction } = await Request("/api/news/queryNewsDataById.json", {
            body: {
                id: item.id
            }
        });

        if (total) setData(total);
        if (userAction) setUserData(userAction);
    };

    const newsDataStatistics = (type, status?: boolean) => {
        Request("/api/news/newsDataStatistics.json", {
            method: "POST",
            rawJson: {
                id: item.id,
                type,
                status
            }
        });
    }

    const handleUseAction = (type) => {
        const total = { ...data }
        const action = { ...userData };

        action[type] = !action[type];

        total[type] += action[type] ? 1 : -1;

        if (action.zan && action.cai) {
            action[type === "cai" ? "zan" : "cai"] = false;
            total[type === "cai" ? "zan" : "cai"] -= 1;
        }

        setData(total);
        setUserData(action);

        newsDataStatistics(type, action[type]);
    }

    const handleView = (val) => {
        setShow(val);
        if (val) {
            queryNewsDataById();
            newsDataStatistics("views");
        }
    }

    const handleClose = () => {
        document.removeEventListener("scroll", eventListener);

        setShow(false);
    }

    const handleAction = ({ position, width, left, bottom }: HandleActionProps) => {
        if (position === "fixed") {
            setActionStyle({ position, width, left, bottom, boxShadow: "0 -1px 3px rgba(18,18,18,.1)" })
        } else if (position === "absolute") {
            setActionStyle({ bottom })
        }
    }

    const handleScrool = () => {
        const news = newsRef.current;
        const bodyW = news.clientWidth;
        const bodyH = news.clientHeight;
        const bodyT = news.offsetTop;
        const bodyL = news.offsetLeft;
        const scrollH = document.documentElement.scrollTop + window.innerHeight;

        if (scrollH - bodyT <= 50 - 18) {
            handleAction({ position: "fixed", width: bodyW, left: bodyL, bottom: -(50 - 18 - (scrollH - bodyT)) });
        } else if (scrollH >= bodyH + bodyT) {
            handleAction({ position: "absolute" });
        } else {
            handleAction({ position: "fixed", width: bodyW, left: bodyL });
        }
    }

    useEffect(() => {
        if (show) {
            handleScrool();

            document.addEventListener("scroll", eventListener);
        }
    }, [show]);

    return item ? <div className={"youzi-news " + className} ref={newsRef}>
        <h2>{item.title}</h2>
        <div className="news-info">
            <User name="youzi" />
            <Timer timer={item.createTimer} format="YYYY-MM-DD HH:mm" />
        </div>
        <p className="news-desc">{item.description}</p>

        <MD
            html={item.contentHTML}
            maxHeight={330}
            show={show}
            tips={<>最后更新：<Timer timer={item.updateTimer} format="YYYY-MM-DD HH:mm" /> {data.views ? `· 阅读数 ${data.views}` : ""}</>}
            onChange={handleView}
        />

        {show &&
            <div className="news-action" style={actionStyle}>
                <span
                    className={userData.zan ? "active" : ""}
                    onClick={() => handleUseAction("zan")}
                >
                    <Icon name="youzi_zan" />{data.zan || '赞'}
                </span>
                <span
                    className={userData.cai ? "active" : ""}
                    onClick={() => handleUseAction("cai")}
                >
                    <Icon name="youzi_cai" />{data.cai || '踩'}
                </span>
                <span
                    className={userData.likes ? "active" : ""}
                    onClick={() => handleUseAction("likes")}
                >
                    <Icon name="youzi_xihuan" />{data.likes || '喜欢'}
                </span>
                <span><Icon name="youzi_shoucang" />{data.collects || '收藏'}</span>
                <span className="news-action-close" onClick={handleClose}>收起<Icon name="youzi_up" /></span>
            </div>}
    </div > : "";
})`
position: relative;
padding: 30px 20px 0;
border-radius: 4px;
box-shadow: 0px 3px 15px 0px #dadada;
background: #fff;

h2 {
    font-size: 20px;
    font-weight: bold;
    color: #121212;
    margin-bottom: 10px;
}

.news-info {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #666;
    margin-bottom: 15px;

    .youzi-user {
        width: 140px;
    }
}

.news-desc {
    font-size: 14px;
    color: #121212;
    margin-bottom: 10px;
    padding: 10px 15px;
    background: #f8f8f8;
    border: 1px solid #eae9e9;
    border-radius: 4px;
}

.news-action {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: center;
    height: 50px;
    color: #666;
    padding: 0 20px;
    background: #fff;

    span {
        display: flex;
        align-items: center;
        min-width: 100px;
        font-size: 13px;
        transition: all .3s ease;
        cursor: pointer;

        &.active,
        &:hover {
            color: #121212;
        }

        &.news-action-close {
            position: absolute;
            right: 20px;
            min-width: 80px;
            height: 30px;
            justify-content: center;
            color: #ff502c;
            border-radius: 2px;
            background: #fff5f5;

            &:hover {
                background: #f7e8e8;
            }

            .youzi-icon {
                font-size: 14px;
                margin-right: 0;
            }
        }
    }

    .youzi-icon {
        font-size: 22px;
        margin: 0 10px;
    }
}

@media screen and (max-width: 1080px) { 
    padding: 20px 15px 0;

    .news-action {
        .youzi-icon {
            font-size: 18px;
            margin: 0 5px 0 0;
        }

        span {
            min-width: 50px;
        }
    }
}

@media screen and (max-width: 768px) { 
    border-radius: 0;
}
`;
