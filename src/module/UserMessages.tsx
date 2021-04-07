import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Form, Input, Textarea, Submit, Message } from '@/components';
import { Timer } from '@/module';
import { Request } from '@/utils/fetch';

export const UserMessages = styled(({ className }) => {
    const [dataSource, setDataSource] = useState(null);

    const queryMessageList = async () => {
        const data = await Request("/api/message/queryList.json");

        setDataSource(data);
    }

    useEffect(() => {
        queryMessageList();
    }, []);

    const { dataList } = dataSource || {};

    return <div className={"youzi-message " + className}>
        <div className="youzi-message-box message">
            <div className="avatar"><img src="/public/static/image/user/youzi.jpeg" alt="柚子青年。" /></div>
            <div className="text">
                <p>“ 雷锋做好事不留名&nbsp;&nbsp;但是他写日记啊”&nbsp;&nbsp;🤪</p>
                <p>调侃一下&nbsp;&nbsp;😜</p>
                <p>本博客主要记录工作中遇到的难点&nbsp;&nbsp;分享我的思考和经验</p>
                <p>如果你有什么想对我说的&nbsp;&nbsp;可以点击右下角留言按钮</p>
                <p>留言在经过筛选之后会显示在留言板上(支持emoji哦~)&nbsp;&nbsp;😝</p>
            </div>
        </div>
        <div className="youzi-message-box message-form">
            <Form
                onSubmit={async (values, errors) => {
                    if (errors) return;
                    const data = await Request("/api/message/create.json", {
                        method: "POST",
                        rawJson: {
                            ...values
                        }
                    });

                    if (data) {
                        Message.success("提交成功，审核后可在留言板查看~");
                    }
                }}
            >
                <Form.Item required name="userName" message="请填写昵称~">
                    <Input placeholder="昵称" />
                </Form.Item>
                <Form.Item required name="message" message="请填写您的留言和反馈哦~">
                    <Textarea placeholder="留言或反馈" />
                </Form.Item>
                <Form.Item>
                    <Submit>提交</Submit>
                </Form.Item>
            </Form>
        </div>
        <div className="youzi-message-box">
            {dataList && dataList.map(({ userName, message, uuid, createTimer }) =>
                <div className="youzi-message-item" key={createTimer}>
                    <h2>{userName} <Timer timer={createTimer} format="YYYY年M月D日 HH:mm" /></h2>
                    <div>{message}</div>
                    <p>UUID：{uuid}</p>
                </div >
            )}
        </div>
    </div >
})`
.youzi-message-box {
    padding: 10px 0;
    margin-bottom: 20px;
    border-radius: 4px;
    background: var(--bgSecondary);
    box-shadow: var(--boxShadow);
}

.message {
    padding: 20px 0;

    .avatar {
        width: 100px;
        margin: 10px auto;
        border-radius: 50%;
        transition: all .3s ease;
        overflow: hidden;

        img {
            width: 100%;
        }

        &:hover {
            box-shadow: 0 0 10px #e4e4e4;
        }
    }

    .text {
        font-size: 14px;
        color: var(--textNormal);
        padding-left: 60px;

        p {
            line-height: 22px;
            margin-bottom: 10px;
        }
    }
}

.message-form {
    padding: 30px 50px;
}

.youzi-message-item {
    position: relative;
    padding: 30px 120px 30px 60px;
    transition: all .3s ease;

    &:not(:last-child):after {
        content: "";
        position: absolute;
        bottom: 0;
        width: calc(100% - 180px);
        height: 1px;
        background: var(--borderColor);
    }

    h2 {
        font-size: 18px;
        font-weight: bold;
        color: var(--textNormal);
        line-height: 28px;
        margin-bottom: 10px;

        .youzi-timer {
            font-size: 14px;
            color: var(--textSecondary);
            margin-left: 5px;
        }
    }

    div {
        font-size: 14px;
        color: var(--textSecondary);
        line-height: 24px;
        text-align: justify;
        margin-bottom: 4px;
    }

    p {
        font-size: 12px;
        color: var(--textTips);
        line-height: 20px;
    }
}

@media screen and (max-width: 1080px) { 
    .message {
        // .avatar {
        //     display: none;
        // }

        .text {
            padding: 0 5vw;
        }
    }

    .message-form {
        padding: 5vw;
    }

    .youzi-message-item {
        padding: 20px 10vw 20px 5vw;

        &:not(:last-child):after {
            width: calc(100% - 15vw);
        }
    }
}

@media screen and (max-width: 768px) { 
    .message {
        // .avatar {
        //     display: none;
        // }

        .text {
            font-size: 13px;
        }
    }

    .message-form {
        padding: 5vw;
    }

    .youzi-message-item {
        border-radius: 0;
    }
}
`;