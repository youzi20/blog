import React, { useRef } from 'react';
import styled from 'styled-components';

import APNGjs from '@/utils/apng';
import ZIPjs from '@/utils/zip';

const canvas2Bolb = (canvas) => {
    return new Promise((resolve, reject) => {
        canvas.toBlob(function (blob) {
            resolve(blob);
        })
    });
}

const APNG = styled((props) => {
    // const apngDataRef = useRef([]);
    const frameRef = useRef();

    const uploadFiles = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.multiple = true;
        input.accept = "image/png";

        input.onchange = (e: Event) => {
            // @ts-ignore
            frameRef.current.innerHTML = "";

            // @ts-ignore
            const value = e.target.files;
            const files = [];

            for (let i = 0; i < value.length; i++) {
                files.push(value[i]);
            }

            APNGjs(files).then((apngList: any[]) => {
                // apngDataRef.current = [...apngDataRef.current, ...apngList];

                apngList.forEach(apng => {
                    // if (apngDataRef.current.length > 0) {
                    //     const downloadBtn = document.createElement("div");
                    //     downloadBtn.className = "download-all-btn";
                    //     downloadBtn.innerText = "下载全部ZIP";
                    //     if (frameRef.current.childrenNode.length > 0) {
                    //         frameRef.current.insertBefore(downloadBtn, frameRef.current.childrenNode[0]);
                    //     } else {
                    //         frameRef.current.appendChild(downloadBtn);
                    //     }
                    // }

                    Promise.all(apng.frames.map(item => item.createImage(apng.width, apng.height)))
                        .then((canvasList: any[]) => {

                            const frameBox = document.createElement("div");
                            const imageList = document.createElement("div");
                            const downloadBtn = document.createElement("div");
                            frameBox.className = "frame-box";
                            imageList.className = "image-list";
                            downloadBtn.className = "download-btn";
                            downloadBtn.innerText = "下载ZIP";

                            downloadBtn.onclick = () => {
                                const fileName = apng.name.replace(".png", "");

                                Promise.all(canvasList.map(canvas => canvas2Bolb(canvas))).then((bolbList: any[]) => {
                                    ZIPjs.images(fileName, bolbList.map((bolb, i) => ({ name: `${fileName + i}.png`, imgData: bolb })));
                                });
                            };

                            frameBox.appendChild(imageList);
                            frameBox.appendChild(downloadBtn);

                            canvasList.forEach(canvas => {
                                imageList.appendChild(canvas)
                            });

                            // @ts-ignore
                            frameRef.current.appendChild(frameBox);

                            // canvas.toBlob((bolb) => {
                            //     resolve(bolb);
                            // });


                        });
                });
            });
        }

        input.click();
    }

    return <div {...props}>
        <h1>分解APNG图片</h1>
        <p>免费APNG动画分成几帧。该工具使您可以直接在线提取APNG图片的帧。</p>
        <div className="upload" onClick={uploadFiles}>上传文件</div>
        <div className="frame" ref={frameRef}>

        </div>
    </div>
})`
h1 {
    font-size: 20px;
    font-weight: bold;
    color: var(--textNormal);
    margin-bottom: 15px;
}

p {
    font-size: 14px;
    line-height: 26px;
    color: var(--textSecondary);
    margin-bottom: 25px;
}

.upload {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 36px;
    font-size: 14px;
    color: var(--apngUploadText);
    border-radius: 4px;
    background: var(--apngUploadBg);
    cursor: pointer;
}

.frame {
    display: flex;
    flex-direction: column;

    .image-list {
        margin: 20px 0 0 -10px;

        canvas {
            margin: 10px;
        }
    }

    .download-btn {
        font-size: 14px;
        color: var(--textSecondary);
        cursor: pointer;

        &:hover {
            color: var(--textNormal);
            text-decoration: underline;
        }
    }
}

@media screen and (max-width: 768px) { 
    padding: 0 15px;
}
`;

export default APNG;