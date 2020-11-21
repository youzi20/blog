import React, {useState} from "react";
import styled from "styled-components";

import {useWindowZoom} from '../../hooks';

const bgs = [1, 2, 3, 4, 5];

const caleItemPosition = () => {
    const itemStyle = [];

    bgs.forEach((item, ind) => {
        const size = Math.ceil((100 + 50 * Math.random()) / 2) * 2;

        const top = Math.ceil(15 + 50 * Math.random());

        const itemWidth = 80 / bgs.length;
        const itemLeft = itemWidth * ind + 10;
        const left = Math.ceil(itemLeft + itemWidth / 2 * Math.random());

        itemStyle.push({size, top, left, background: `url(/blog/static/images/bg${item}.jpg) center / cover no-repeat`});
    });

    return itemStyle;
};

const BannerAnimation: React.FC<any> = styled(({className, children}) => {
    const {width: windowWidth, height: windowHeight} = useWindowZoom();
    const [index, setIndex] = useState(Math.floor(bgs.length * Math.random()));
    const [styles] = useState(caleItemPosition());

    return <div className={className} style={{width: windowWidth, height: windowHeight}}>
        {bgs.map((item, ind) => {
            const {size, top, left, background} = styles[ind];


            const itemStyle = {
                background,
                clipPath: `circle(${size / 2}px at ${left}% ${top}%)`,
            };

            const borderSize = size + 16;

            const itemBorderStyle = {
                top: `calc(${top}% - ${borderSize / 2}px)`,
                left: `calc(${left}% - ${borderSize / 2}px)`,
                width: borderSize,
                height: borderSize,
            };

            return <div
                className={"item " + (ind === index ? "active" : "")}
            >
                <div className="item-img" style={itemStyle}/>
                <div className="item-border" style={itemBorderStyle} onClick={() => setIndex(ind)}/>

                {/*<div>*/}
                {/*    <img key={item} src={``} alt=""/>*/}
                {/*</div>*/}

                {/*<div style={{display: "none"}}>*/}
                {/*    <img key={item} src={`/blog/static/images/bg${item}.jpg`} alt=""/>*/}
                {/*</div>*/}
            </div>
        })}
        {children}
    </div>
})`
position: absolute;
left: 0;
height: 0;

.item {
    .item-img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }    
    
    &.active {
        .item-img {
            clip-path: circle(100%) !important;
            transition: all .3s ease;
        }
        
        .item-border {
            display: none;
        }
    }
    
    &:not(.active) {
        .item-img {
            z-index: 1;    
        }
        
        .item-border {
            position: absolute;
            border: 8px solid #fff;
            border-radius: 50%;
            cursor: pointer;
            z-index: 2;
            
            &:hover {
                animation: itemAnimate infinite 1.5s linear;
            }
        }
    }
}


@keyframes itemAnimate {
    0% {
        box-shadow: 0 0 0 0 rgba(255, 255, 255, .6);
    }

    50% {
        box-shadow: 0 0 10px 2px rgba(255, 255, 255, 1);
    }

    100% {
        box-shadow: 0 0 0 0 rgba(255, 255, 255, .6);
    }
}
`;

export default BannerAnimation;

// ${() => {
//   let style = '';
//   itemStyle.forEach((item, ind) => {
//       const {size, top, left, background} = item;
// const borderSize = size + 16;
//
// console.log("style");
//
// style += `
//             &:nth-child(${ind + 1}) {
//                 .item-img {
//                     background: ${background};
//                     clip-path: circle(${size / 2}px at ${left}% ${top}%);
//                 }
//
//                 .item-border {
//                     top: calc(${top}% - ${borderSize / 2}px);
//                     left: calc(${left}% - ${borderSize / 2}px);
//                     width: ${borderSize}px;
//                     height: ${borderSize}px;
//                 }
//             }
//             `
// });
//
// return style;
// }}