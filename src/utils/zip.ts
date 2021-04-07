interface imagesZipProps {
    name: string
    imgData: String | ArrayBuffer | Uint8Array | Buffer | Blob

}


ZIPjs.images = (fileName, dataSource: imagesZipProps[]) => {
    var zip = new window.JSZip();
    var img = zip.folder(fileName);

    dataSource.forEach(({ name, imgData }) => {
        img.file(name, imgData, { base64: true });
    });

    // 生成zip文件并下载
    zip.generateAsync({
        type: 'blob'
    }).then(function (content) {
        // 创建隐藏的可下载链接
        var eleLink = document.createElement('a');
        eleLink.download = fileName + '.zip';
        eleLink.style.display = 'none';
        // 下载内容转变成blob地址
        eleLink.href = URL.createObjectURL(content);
        // 触发点击
        document.body.appendChild(eleLink);
        eleLink.click();
        // 然后移除
        document.body.removeChild(eleLink);
    });
}


export default function ZIPjs() {




    // 
    // img.file("smile.gif", imgData, { base64: true });

    // zip.generateAsync({ type: "blob" }).then(function (content) {
    //     // see FileSaver.js
    //     saveAs(content, "example.zip");
    // });
}

