const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const QRCode = require('qrcode');
const util = require('util');
const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

const qrcode = 'qrcode.json';

const list = [];

const generateCodes = async () => {
    let count = 1;
    const codes = [];
    while (count <= 1000) {
        const qr = uuidv4();
        codes.push(
            [{ data: qr, mode: 'Byte' }]
        );
        count++;
    }
    await writeFilePromise(path.join(process.cwd(), 'utils', qrcode), JSON.stringify(codes));
};


/* GET home page. */
router.get('/', async (req, res, next) => {
    const file = await readFilePromise(path.join(process.cwd(), 'utils', qrcode), 'utf-8');
    const parse = JSON.parse(file);
    const items = parse.splice(0, 100);
    // await writeFilePromise(path.join(process.cwd(), 'utils', qrcode), JSON.stringify(parse));
    console.log('test');
    for await (let item of items) {
        QRCode.toDataURL(item, function (err, url) {
            list.push(url);
        });
    }

    res.render('index', { title: 'Express', list: list });
});

module.exports = router;
