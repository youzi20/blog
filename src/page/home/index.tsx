import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { Common, Container, ContentList, UserMessage, Footer } from '../../components';

import { Request } from "../../utils/fetch";
import { MenuTypes } from '../../types';


const App = styled(({ className }) => {
    const [dataSource, setDataSource] = useState(null);
    const [menu, setMenu] = useState(MenuTypes.NEWS);

    const queryNewsList = async () => {
        const data = await Request("/api/news/queryNewsList.json", {
            body: {
                menuType: menu
            }
        });

        setDataSource(data);
    }

    useEffect(() => {
        queryNewsList();
    }, [menu]);

    return <div className={className}>
        <Common menu={menu} onChangeMenu={setMenu} />

        <Container w={780}>

            {MenuTypes.MESSAGE === menu ?
                <UserMessage /> :
                <ContentList dataSource={dataSource} />
            }


            {/* <div>
                <div className="news">
                    <div className="tag">
                        <span>JavaScript</span>
                        <span>JavaScript</span>
                    </div>
                    <div className="content">
                        <h2>如何手撸一个最轻量的轮播图</h2>
                        <div className="content-info">
                            <User name="youzi" />
                            <Timer timer={1609257681145} format="YYYY-MM-DD HH:mm" />
                        </div>
                        <p>有时候只是想要一个简单的轮播图效果，一些开源库总是很大，如何手撸一个最轻量的轮子。<a href="#">详情>></a></p>
                        <Swiper />
                    </div>
                    <div className="footer">
                        <div className="actions">
                            <Icon name="youzi_github" link="https://github.com/youzi20/page/blob/master/swiper.html" blank={true} />
                            <Icon name="youzi_codesandbox" link="https://codesandbox.io/s/swiper-fk986" blank={true} />
                        </div>
                    </div>
                </div>
            </div> */}
        </Container>


        <Footer />
    </div>
})`
&:after {
    content:"";
    background: linear-gradient(90deg, #ffbe0b, #fb5607, #ff006e, #8338ec, #3a86ff);
}

.news {
    position: relative;
    border-radius: 4px;
    box-shadow: 0px 3px 15px 0px #dadada;
    background: #fff;
    
    .content {
        position: relative;
        padding: 30px 20px 50px;
        z-index: 1;
        
        h2 {
            font-size: 20px;
            font-weight: bold;
            color: #121212;
            margin-bottom: 10px;
        }
        
        p {
            font-size: 14px;
            color: #121212;
            margin-bottom: 10px;
            
            a {
                color: #8590a6;

                &:hover {
                    text-decoration: underline;
                }
            }
        }

        .content-info {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            
            .youzi-user {
                width: 140px;
            }
        }
    }
    
    .tag {
        position: absolute;
        bottom: 10px;
        right: 20px;
        display: flex;
        flex-direction: column;
        font-size: 80px;
        font-weight: bold;
        line-height: 90px;
        user-select: none;
        
        span:first-child {
            color: #fff;
            clip-path: polygon(0 100%,100% 100%,100% 55px,0 55px);
        }
        
        span:last-child {
            position: absolute;
            color: #efefef;
            clip-path: polygon(0 0,100% 0,100% 55px,0 55px);
        }
    }
    
    .footer {
        display: flex;
        align-items: center;
        height: 45px;
        padding: 0 20px;
        background: #efefef;
        
        .actions {
            display: flex;
            font-size: 22px;
            text-align: center;

            > a {
                width: 32px;
                color: #666;
                margin-right: 8px;
                transition: all .3s ease;
                
                &:hover {
                    color: #000;
                }
                
                img {
                    display: block;
                    width: 100%;
                }
            } 
        }
    }
}
`;

ReactDOM.render(<App />, document.getElementById("root"));