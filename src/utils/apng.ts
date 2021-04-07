// '\x89PNG\x0d\x0a\x1a\x0a'
const PNGSignature = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

const errNotFile = new Error('Not a File');
const errNotPNG = new Error('Not a PNG');
const errNotAPNG = new Error('Not an animated PNG');

const table = new Uint32Array(256)

for (let i = 0; i < 256; i++) {
    let c = i
    for (let k = 0; k < 8; k++) {
        c = ((c & 1) !== 0) ? 0xEDB88320 ^ (c >>> 1) : c >>> 1
    }
    table[i] = c
}

const crc32 = (bytes, start = 0, length = bytes.length - start) => {
    let crc = -1
    for (let i = start, l = start + length; i < l; i++) {
        crc = (crc >>> 8) ^ table[(crc ^ bytes[i]) & 0xFF]
    }
    return crc ^ (-1)
}

const file2BufferPromise = (file: File) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const res = reader.result;
            if (typeof res === "string") return;

            const apng = parseAPNG(res, file.name);

            if (apng instanceof Error) {
                reject({ error: "Parse error" });
            } else {
                // apng.createImages();
                resolve(apng);
            }
        }
        reader.readAsArrayBuffer(file);
    });
}

const file2Buffer = async (files: File | File[]) => {
    if (!files) return errNotFile;

    if (files instanceof Array) {
        return await Promise.all(files.map(item => file2BufferPromise(item)));
    } else {
        return [await file2BufferPromise(files)];

        // const reader = new FileReader();
        // reader.onload = () => {
        //     const res = reader.result;
        //     if (typeof res === "string") return;

        //     const apng = parseAPNG(res);

        //     if (apng instanceof Error) {
        //         return err
        //     }

        //     apngs.push(apng);
        // }
        // reader.readAsArrayBuffer(files);
    }
}

const parseAPNG = (buffer: ArrayBuffer, name: string) => {
    const bytes = new Uint8Array(buffer);
    if (Array.prototype.some.call(PNGSignature, (b, i) => b !== bytes[i])) {
        return errNotPNG;
    }

    let isAnimated = false;
    eachChunk(bytes, type => !(isAnimated = (type === 'acTL')));
    if (!isAnimated) {
        return errNotAPNG;
    }

    const
        preDataParts = [],
        postDataParts = [];
    let
        headerDataBytes = null,
        frame = null,
        frameNumber = 0,
        apng = new APNG();
    apng.name = name;

    eachChunk(bytes, (type, bytes, off, length) => {
        const dv = new DataView(bytes.buffer);
        switch (type) {
            case 'IHDR':
                headerDataBytes = bytes.subarray(off + 8, off + 8 + length);
                apng.width = dv.getUint32(off + 8);
                apng.height = dv.getUint32(off + 12);
                break;
            case 'acTL':
                apng.numPlays = dv.getUint32(off + 8 + 4);
                break;
            case 'fcTL':
                if (frame) {
                    apng.frames.push(frame);
                    frameNumber++;
                }
                frame = new Frame();
                frame.width = dv.getUint32(off + 8 + 4);
                frame.height = dv.getUint32(off + 8 + 8);
                frame.left = dv.getUint32(off + 8 + 12);
                frame.top = dv.getUint32(off + 8 + 16);
                var delayN = dv.getUint16(off + 8 + 20);
                var delayD = dv.getUint16(off + 8 + 22);
                if (delayD === 0) {
                    delayD = 100;
                }
                frame.delay = 1000 * delayN / delayD;
                // https://bugzilla.mozilla.org/show_bug.cgi?id=125137
                // https://bugzilla.mozilla.org/show_bug.cgi?id=139677
                // https://bugzilla.mozilla.org/show_bug.cgi?id=207059
                if (frame.delay <= 10) {
                    frame.delay = 100;
                }
                apng.playTime += frame.delay;
                frame.disposeOp = dv.getUint8(off + 8 + 24);
                frame.blendOp = dv.getUint8(off + 8 + 25);
                frame.dataParts = [];
                if (frameNumber === 0 && frame.disposeOp === 2) {
                    frame.disposeOp = 1;
                }
                break;
            case 'fdAT':
                if (frame) {
                    frame.dataParts.push(bytes.subarray(off + 8 + 4, off + 8 + length));
                }
                break;
            case 'IDAT':
                if (frame) {
                    frame.dataParts.push(bytes.subarray(off + 8, off + 8 + length));
                }
                break;
            case 'IEND':
                postDataParts.push(subBuffer(bytes, off, 12 + length));
                break;
            default:
                preDataParts.push(subBuffer(bytes, off, 12 + length));
        }
    });

    if (frame) {
        apng.frames.push(frame);
    }

    if (apng.frames.length == 0) {
        return errNotAPNG;
    }

    const preBlob = new Blob(preDataParts),
        postBlob = new Blob(postDataParts);

    apng.frames.forEach(frame => {
        var bb = [];
        bb.push(PNGSignature);
        headerDataBytes.set(makeDWordArray(frame.width), 0);
        headerDataBytes.set(makeDWordArray(frame.height), 4);
        bb.push(makeChunkBytes('IHDR', headerDataBytes));
        bb.push(preBlob);
        frame.dataParts.forEach(p => bb.push(makeChunkBytes('IDAT', p)));
        bb.push(postBlob);
        frame.imageData = new Blob(bb, { 'type': 'image/png' });
        delete frame.dataParts;
        bb = null;
    });

    return apng;
}

const eachChunk = (bytes, callback) => {
    const dv = new DataView(bytes.buffer);
    let off = 8, type, length, res;
    do {
        length = dv.getUint32(off);
        type = readString(bytes, off + 4, 4);
        res = callback(type, bytes, off, length);
        off += 12 + length;
    } while (res !== false && type != 'IEND' && off < bytes.length);
}

const readString = (bytes, off, length) => {
    const chars = Array.prototype.slice.call(bytes.subarray(off, off + length));
    return String.fromCharCode.apply(String, chars);
}

const subBuffer = (bytes, start, length) => {
    const a = new Uint8Array(length);
    a.set(bytes.subarray(start, start + length));
    return a;
}

const makeStringArray = (x) => {
    const res = new Uint8Array(x.length);
    for (let i = 0; i < x.length; i++) {
        res[i] = x.charCodeAt(i);
    }
    return res;
}

const makeChunkBytes = (type, dataBytes) => {
    const crcLen = type.length + dataBytes.length;
    const bytes = new Uint8Array(crcLen + 8);
    const dv = new DataView(bytes.buffer);

    dv.setUint32(0, dataBytes.length);
    bytes.set(makeStringArray(type), 4);
    bytes.set(dataBytes, 8);
    var crc = crc32(bytes, 4, crcLen);
    dv.setUint32(crcLen + 4, crc);
    return bytes;
};

const makeDWordArray = (x) => {
    return new Uint8Array([(x >>> 24) & 0xff, (x >>> 16) & 0xff, (x >>> 8) & 0xff, x & 0xff]);
};

export class APNG {
    /** @type {string} */
    name = "";
    /** @type {number} */
    width = 0;
    /** @type {number} */
    height = 0;
    /** @type {number} */
    numPlays = 0;
    /** @type {number} */
    playTime = 0;
    /** @type {Frame[]} */
    frames = [];

    /**
     *
     * @return {Promise.<*>}
     */
    createImages() {
        return Promise.all(this.frames.map(f => f.createImage()));
    }

    // /**
    //  *
    //  * @param {CanvasRenderingContext2D} context
    //  * @param {boolean} autoPlay
    //  * @return {Promise.<Player>}
    //  */
    // getPlayer(context, autoPlay = false) {
    //     return this.createImages().then(() => new Player(this, context, autoPlay));
    // }
}

export class Frame {
    /** @type {number} */
    left = 0;
    /** @type {number} */
    top = 0;
    /** @type {number} */
    width = 0;
    /** @type {number} */
    height = 0;
    /** @type {number} */
    delay = 0;
    /** @type {number} */
    disposeOp = 0;
    /** @type {number} */
    blendOp = 0;
    /** @type {Blob} */
    imageData = null;
    /** @type {HTMLCanvaceElement} */
    canvas = null;

    getScreenResolution(ctx) {
        let backingStore = ctx.backingStorePixelRatio ||
            ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1;

        return (window.devicePixelRatio || 1) / backingStore;
    }

    createImage(width, height) {
        return new Promise((resolve, reject) => {
            const url = URL.createObjectURL(this.imageData);
            const img = document.createElement('img');
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext("2d");

            let resolution = this.getScreenResolution(ctx);

            canvas.width = width * resolution;
            canvas.height = height * resolution;
            canvas.style.width = width + "px";
            canvas.style.height = height + "px";

            ctx.scale(resolution, resolution);

            img.onload = () => {
                URL.revokeObjectURL(url);
                ctx.drawImage(img, this.left, this.top);
                this.canvas = canvas;
                resolve(canvas);
            };
            img.onerror = () => {
                URL.revokeObjectURL(url);
                reject(new Error("Image creation error"));
            };
            img.src = url;
        });
    }
}

export default function APNGjs(files: File | File[]) {

    return file2Buffer(files);

    // const bytes = new Uint8Array(files);
}