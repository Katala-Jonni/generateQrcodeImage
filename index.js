const fs = require('fs');
const path = require('path');
const util = require('util');
const QRCode = require('qrcode');
const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);
const qrcode = 'qrcode.json';

(async () => {
    const file = await readFilePromise(path.join(process.cwd(), 'utils', qrcode), 'utf-8');
    const parse = JSON.parse(file);
    const items = parse.splice(0, 100);
    await writeFilePromise(path.join(process.cwd(), 'utils', qrcode), JSON.stringify(parse));
    let startNumber = 101;
    const listMap = items.map((el, idx) => {
        return new Promise((resolve, reject) => {
            QRCode.toDataURL(el, {
                // color: {
                //     dark: '#00F',  // Blue dots
                //     light: '#0000' // Transparent background
                // }
                margin: 1
            }, function (err, url) {
                const base64Data = url.replace(/^data:image\/png;base64,/, '');
                const binaryData = Buffer.from(base64Data, 'base64').toString('binary');
                resolve(
                    fs.writeFile(path.join('./qrcodes', `qr${startNumber++}.png`), binaryData, 'binary', function (err) {
                        // console.log(err); // writes out file without error, but it's not a valid image
                    })
                );
            });
        });
    });

    // Promise.all(listMap).then(_ => {
    //     // do what you want
    //     console.log('done');
    // }).catch(err => {
    //     // handle I/O error
    //     console.error(err);
    // });
})();
