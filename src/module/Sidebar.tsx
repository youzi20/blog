import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Icon, Form, Input, Textarea, Submit, Dialog, Message } from '../components/index';
import { Request } from "../utils/fetch";

export const Sidebar = styled(({ className }) => {
    const [theme, setTheme] = useState("light");

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
                            Message.success("提交成功，审核后可在留言板查看~");
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

    const handleTheme = () => {
        const name = theme === "dark" ? "light" : "dark";
        localStorage.theme = name;
        setTheme(name);
        document.body.className = name;
    }

    useEffect(() => {
        const windowTheme = window.matchMedia('(prefers-color-scheme: dark)').matches && "dark";
        const theme = localStorage.theme || windowTheme || "light";

        setTheme(theme);
        document.body.className = theme;

        if (windowTheme) {
            document.querySelector("link[rel=icon]").setAttribute("href", `/public/static/favicons/favicon-${theme}.ico`);
        }
    }, []);

    return <div className={"youzi-sidebar " + className}>
        <ul>
            <li onClick={handleTheme}><Icon name={theme === "dark" ? "youzi_light" : "youzi_dark"} /> <span>{theme === "dark" ? "浅色" : "深色"}</span></li>
            <li onClick={showMeaasge}><Icon name="youzi_message" /> <span>留言</span></li>
            {/* <li><Icon name="youzi_top" /> <span>回到顶部</span></li> */}
        </ul>
    </div>
})`
position: fixed;
left: 50%;
bottom: 20px;
font-size: 13px;
margin-left: 410px;
z-index: 9;

li {
    width: 40px;
    height: 40px;
    color: var(--textNormal);
    border-radius: 20px;
    border: 1px solid var(--borderColor);
    box-shadow: 0 0 5px rgba(0,0,0,.05);
    background: var(--bgSecondary);
    cursor: pointer;
    white-space: nowrap;
    transition: all .3s ease;
    overflow: hidden;


    &:not(:first-child) {
        margin-top: 10px;
    }

    .youzi-icon {
        font-size: 18px;
        margin: 10px;
    }

    &:hover {
        display: flex;
        align-items: center;
        width: auto;
        color: var(--textNormal-hover);
        padding-right: 15px;
        background: var(--bgSecondary-hover);
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

@media screen and (max-width: 768px) {
    li {
        &:hover {
            color: var(--textNormal);
            background: var(--bgSecondary);
        }
    }
}
`;