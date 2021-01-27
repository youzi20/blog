import React, { useEffect } from 'react';
import styled from 'styled-components';

import { Icon, Form, Input, Textarea, Submit, Dialog } from './index';
import { Request } from "../utils/fetch";

export const Sidebar = styled(({ className }) => {

    const showMeaasge = () => {
        const dialog = Dialog.show({
            title: "留言",
            content: <div>
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
                            dialog.close();
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
        });
    }

    useEffect(() => {
        showMeaasge();
    }, []);

    return <div className={"youzi-sidebar " + className}>
        <ul>
            <li onClick={showMeaasge}><Icon name="youzi_message" /> <span>留言</span></li>
            <li><Icon name="youzi_top" /> <span>回到顶部</span></li>
        </ul>
    </div>
})`
position: fixed;
left: 50%;
bottom: 20px;
font-size: 13px;
color: #505050;
margin-left: 410px;
z-index: 9;

li {
    width: 40px;
    height: 40px;
    margin-top: 10px;
    border-radius: 20px;
    border: 1px solid #e7e7e7;
    box-shadow: 0 0 5px rgba(0,0,0,.05);
    background: #fff;
    cursor: pointer;
    white-space: nowrap;
    transition: all .3s ease;
    overflow: hidden;

    .youzi-icon {
        font-size: 18px;
        margin: 10px;
    }

    &:hover {
        display: flex;
        align-items: center;
        width: auto;
        color: #fff;
        padding-right: 15px;
        background: #101010;
    }
}

@media screen and (max-width: 1080px) { 
    left: 100%;
    margin-left: -60px;

    li {
        &:hover {
            padding: 0;
        }

        span {
            display: none;
        }
    }
}
`;