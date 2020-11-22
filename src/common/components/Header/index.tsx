import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';


const Header: React.FC<{ height: number }> = styled(({className, height}) => {
    const [status, setStatus] = useState<'hide' | 'show'>("hide");
    const [scale, setScale] = useState(1);
    const heightRef = useRef(height);

    const scroll = () => {
        const scrollTop = document.documentElement.scrollTop;

        if (heightRef.current > scrollTop + 60) {
            setScale(1 - scrollTop / heightRef.current / 3);
            setStatus("hide");
        } else {
            setScale(1 - 1 / 3);
            setStatus("show");
        }
    }

    useEffect(() => {
        heightRef.current = height;
    }, [height]);

    useEffect(() => {
        window.addEventListener("scroll", scroll)
    }, []);

    return <div className={className + (status === "show" ? " show" : "")}>
        <div className="menu">
            <a className="active" href="/">文章</a>
        </div>
        <div className="nick-name">
            <img
                src={status === "show" ? "/blog/static/images/nickName-000.png" : "/blog/static/images/nickName-fff.png"}
                alt="柚子青年。"
                style={{transform: `scale(${scale})`}}
            />
        </div>
        <div className="menu">
            <a>游记</a>
        </div>
    </div>
})`
position: fixed;
top: 0;
left: 0;
z-index: 999;
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 60px;
transition: all .3s ease;

&.show {
    background: #fff;
    
    .menu {
        opacity: 1;
    }
}

.menu {
    display: flex;
    opacity: 0;
    flex: 1;
    font-size: 18px;
    transition: all .3s ease;
    
    &:first-child {
        justify-content: flex-end;
    }
    
    a {
        font-family: "KangKangTi";
        width: 80px;
        line-height: 60px;
        text-align: center;
        
        &.active {
            background: url(/blog/static/images/icon/menu-star.svg) center 42px / 10px no-repeat;
        }
    }
}

.nick-name {
    margin: 0 50px;
    
    img {
        width: 180px;
    }
}

`;


export default Header;