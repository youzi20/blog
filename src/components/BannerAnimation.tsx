import React, {useState} from 'react';
import styled from 'styled-components';

const bgs = [1, 2, 3, 4, 5];

const caleItemPosition = () => {
    const itemStyle = [];

    bgs.forEach((item, ind) => {
        const size = Math.ceil((100 + 50 * Math.random()) / 2) * 2;

        const top = Math.ceil(15 + 50 * Math.random());

        const itemWidth = 80 / bgs.length;
        const itemLeft = itemWidth * ind + 10;
        const left = Math.ceil(itemLeft + itemWidth / 2 * Math.random());

        itemStyle.push({size, top, left, background: `url(../static/images/bg${item}.jpg) center / cover no-repeat`});
    });

    return itemStyle;
};

export const BannerAnimation: React.FC<{ width: number, height: number }> = styled(({className, children, width, height}) => {
    const [index, setIndex] = useState(Math.floor(bgs.length * Math.random()));
    const [styles] = useState(caleItemPosition());

    return <div className={className} style={{height}}>
        <div className="content" style={{width, height}}>
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

                return <div key={item} className={"item " + (ind === index ? "active" : "")}>
                    <div className="item-img" style={itemStyle}/>
                    <div className="item-border" style={itemBorderStyle} onClick={() => setIndex(ind)}/>
                </div>
            })}
        </div>
        {children}
    </div>
})`
position: relative;

.content {
    position: absolute;
    left: 0;
    height: 0;
}

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