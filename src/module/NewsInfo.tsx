import React, { useState } from 'react';
import styled from 'styled-components';

import { Icon } from '@/components';

import { Request } from "@/utils/fetch";

export const NewsInfo = styled(({ className, id, total, userAction, ...other }) => {
    const [data, setData] = useState(total || { zan: 0, cai: 0, likes: 0, collects: 0, views: 0 });
    const [userData, setUserData] = useState(userAction || { zan: false, cai: false, likes: false, });

    const dataStatistics = (type, status?: boolean) => {
        Request("/api/news/dataStatistics.json", {
            method: "POST",
            rawJson: {
                id,
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



    return <div className={"youzi-news-info " + className} {...other}>
        <ul>
            <li>
                <Icon name="youzi_views" /> {data.views ? <span>{data.views}</span> : null}
            </li>
            <li
                className={userData.zan ? "active" : ""}
                onClick={() => handleUseAction("zan")}
            >
                <Icon name="youzi_zan" /> {data.zan ? <span>{data.zan}</span> : null}
            </li>
            <li
                className={userData.cai ? "active" : ""}
                onClick={() => handleUseAction("cai")}
            >
                <Icon name="youzi_cai" /> {data.cai ? <span>{data.cai}</span> : null}
            </li>
            <li
                className={userData.likes ? "active" : ""}
                onClick={() => handleUseAction("likes")}
            >
                <Icon name="youzi_xihuan" /> {data.likes ? <span>{data.likes}</span> : null}
            </li>
            {/* <span><Icon name="youzi_shoucang" />{data.collects || '收藏'}</span> */}
        </ul>
    </div>
})`

position: fixed;
top: 189px;
left: 50%;
font-size: 13px;
margin-left: -480px;
z-index: 9;

li {
    position: relative;
    width: 40px;
    height: 40px;
    color: var(--textSecondary);
    border-radius: 20px;
    border: 1px solid var(--borderColor);
    box-shadow: 0 0 5px rgba(0,0,0,.05);
    background: var(--bgSecondary);
    white-space: nowrap;
    transition: all .3s ease;

    &:not(:first-child) {
        margin-top: 10px;
        cursor: pointer;

        &:hover {
            color: var(--textNormal);
            
            span {
                background-color: var(--textNormal);
            }
        }
    
        &.active {
            color: var(--highLightIcon);
    
            span {
                background-color: var(--highLightIcon);
            }
        }
    }

    .youzi-icon {
        font-size: 18px;
        margin: 10px;
    }

    span {
        position: absolute;
        top: 2px;
        left: 28px;
        padding: 1px 4px;
        font-size: 12px;
        line-height: 12px;
        text-align: center;
        color: var(--textActive);
        background-color: var(--textSecondary);
        border-radius: 7px;
        transform-origin: left top;
        transform: scale(0.8);
    }
}

@media screen and (max-width: 1080px) { 
    left: 0;
    margin-left: 20px;
}

@media screen and (max-width: 768px) {
    display: none;
}




`;
