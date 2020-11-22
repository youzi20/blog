import React, {useEffect, useRef} from "react";
import styled from 'styled-components';

import {Swiper as DomSwiper} from '../../js';

const Swiper = styled(({className}) => {
    const swiperRef = useRef(null);

    useEffect(() => {
        if (swiperRef.current) {
            new DomSwiper({
                el: swiperRef.current,
                pagination: true,
                delay: 2000
            });
        }
    }, [swiperRef]);

    return <div className={className}>
        <div className="swiper" ref={swiperRef}>
            <div className="wrapper">
                <div className="slider">1</div>
                <div className="slider">2</div>
                <div className="slider">3</div>
                <div className="slider">4</div>
                <div className="slider">5</div>
            </div>
            <div className="btn">
                <span className="prev">&lt;</span>
                <span className="next">&gt;</span>
            </div>
        </div>
    </div>
})`
.swiper {
    position: relative;
    width: 100%;
    height: 400px;
    background: #efefef;
    overflow: hidden;
}

.wrapper {
    position: relative;
    left: 0;
    display: flex;
    width: 9999999%;
}

.slider {
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    z-index: 1;
    
    span {
        position: absolute;
        top: 0;
        font-size: 25px;
        color: #666;
        height: 70px;
        width: 50px;
        line-height: 70px;
        text-align: center;
        margin-top: -35px;
        cursor: pointer;
        background: rgba(102, 102, 102, .2);
        transition: all .3s ease;
        
        &:hover {
            background: rgba(102, 102, 102, .6);
        }
        
        &.next {
            right: 0;
        }
    }
}

.pagination {
    position: absolute;
    left: 0;
    bottom: 10px;
    display: flex;
    justify-content: center;
    width: 100%;
    
    span {
        width: 8px;
        height: 8px;
        margin: 0 5px;
        border-radius: 50%;
        background: #fff;
        cursor: pointer;
        
        &.active {
            background: #00f;
        }
    }
}
`;

export default Swiper;