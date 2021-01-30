import React, { useEffect, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';

import { Timer, Icon, MD } from '../components/index';
import { User } from './index';

import { Request } from "../utils/fetch";

interface ContentListProps {
    item: any
}

interface HandleActionProps {
    position: "absolute" | "fixed"
    width?: number
    marginLeft?: number
    bottom?: number
}


export const News: React.FC<ContentListProps> = styled(({ className, item }) => {
    const [show, setShow] = useState(false);
    const [actionStyle, setActionStyle] = useState({});
    const [data, setData] = useState({ zan: 0, cai: 0, likes: 0, collects: 0, views: 0 });
    const [userData, setUserData] = useState({ zan: false, cai: false, likes: false, });
    const eventListener = useCallback(() => handleScrool(), []);
    const newsRef = useRef();

    const queryDataById = async () => {
        const { total, userAction } = await Request("/api/news/queryDataById.json", {
            body: {
                id: item.id
            }
        });

        if (total) setData(total);
        if (userAction) setUserData(userAction);
    };

    const dataStatistics = (type, status?: boolean) => {
        Request("/api/news/dataStatistics.json", {
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

        dataStatistics(type, action[type]);
    }

    const handleView = (val) => {
        setShow(val);
        if (val) {
            queryDataById();
            dataStatistics("views");
        }
    }

    const handleClose = () => {
        document.removeEventListener("scroll", eventListener);
        document.removeEventListener("resize", eventListener);

        setShow(false);
    }

    const handleAction = ({ position, width, marginLeft, bottom }: HandleActionProps) => {
        if (position === "fixed") {
            setActionStyle({ position, width, left: "50%", bottom, marginLeft, boxShadow: "var(--boxShadow-action)" })
        } else if (position === "absolute") {
            setActionStyle({ bottom })
        }
    }

    const handleScrool = () => {
        const news = newsRef.current;
        const bodyW = news.clientWidth;
        const bodyH = news.clientHeight;
        const bodyT = news.offsetTop;
        const scrollH = document.documentElement.scrollTop + window.innerHeight;

        if (scrollH - bodyT <= 50 - 18) {
            handleAction({ position: "fixed", width: bodyW, marginLeft: -bodyW / 2, bottom: -(50 - 18 - (scrollH - bodyT)) });
        } else if (scrollH >= bodyH + bodyT) {
            handleAction({ position: "absolute" });
        } else {
            handleAction({ position: "fixed", width: bodyW, marginLeft: -bodyW / 2 });
        }
    }

    useEffect(() => {
        if (show) {
            handleScrool();

            document.addEventListener("scroll", eventListener);
            document.addEventListener("resize", eventListener);
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
box-shadow: var(--boxShadow);
background: var(--bgSecondary);

h2 {
    font-size: 20px;
    font-weight: bold;
    color: var(--textNormal);
    margin-bottom: 10px;
}

.news-info {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: var(--textSecondary);
    margin-bottom: 15px;

    .youzi-user {
        width: 140px;
    }
}

.news-desc {
    font-size: 14px;
    color: var(--textNormal);
    margin-bottom: 10px;
    padding: 10px 15px;
    background: var(--blockBg);
    border: 1px solid var(--borderColor);
    border-radius: 4px;
}

.news-action {
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    color: var(--textSecondary);
    padding: 0 20px;
    background: var(--bgSecondary);

    span {
        display: flex;
        align-items: center;
        min-width: 100px;
        font-size: 13px;
        transition: all .3s ease;
        cursor: pointer;

        &.active,
        &:hover {
            color: var(--textNormal);
        }

        &.news-action-close {
            position: absolute;
            right: 20px;
            min-width: 80px;
            height: 30px;
            justify-content: center;
            color: var(--highLightText);
            border-radius: 2px;
            background: var(--highLightBg);

            &:hover {
                background:var(--highLightBg-hover); 
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

@media screen and (max-width: 768px) { 
    border-radius: 0;
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
`;
