import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import {Header, Footer, User, BannerAnimation, Swiper} from '../common/components';
import {useWindowZoom} from '../common/hooks';

const App = styled(({className}) => {
    const {width, height} = useWindowZoom();

    return <div className={className}>
        <Header height={height}/>
        <BannerAnimation  {...{width, height}}/>
        <div style={{height: 1000}}>
            <div className="news">
                <div className="tag">
                    <span>JavaScript</span>
                    <span>JavaScript</span>
                </div>
                <div className="content">
                    <h2>如何手撸一个最轻量的轮播图</h2>
                    <p>有时候只是想要一个简单的轮播图效果，一些开源库总是很大，如何手撸一个最轻量的轮子。<a href="#">详情>></a></p>
                    <Swiper/>
                </div>
                <div className="footer">
                    <a className="github" href="https://github.com/youzi20/page/blob/master/swiper.html" target="_blank">
                        <img src="/blog/static/images/icon/github.svg" alt=""/>
                    </a>
                    <User name="youzi"/>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
})`
.news {
    position: relative;
    width: 1000px;
    margin: 20px auto;
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
            color: #333;
            margin-bottom: 10px;
        }
        
        p {
            font-size: 14px;
            color: #666;
            margin-bottom: 10px;
            
            a:hover {
                text-decoration: underline;
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
        
        .github {
            width: 24px;
            margin-right: 8px;

            img {
                width: 100%;
                border-radius: 50%;
                border: 2px solid #fff;
            }
        }
    }
}
`;

ReactDOM.render(<App/>, document.getElementById("root"));