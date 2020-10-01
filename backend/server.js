const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const multer = require('multer');

const socket = require('./socket/socket');

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
    );
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));

const storage = multer.diskStorage({
    destination: '../../uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
});

// const fileFilter = (req, file, cb) => {
//     // console.log(req.file);
//     if (file.mimetype == 'images/jpeg' || file.mimetype == 'images/png') {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// }

const upload = multer({
    storage: storage
        // fileFilter: fileFilter
}).single('images')

app.post('/uploads', upload, (req, res) => {
    // console.log(req.file);
    res.json({
        body: fs
            .readFileSync('../../uploads/' + req.file.filename)
            .toString('base64'),
    });
})

const server = app.listen(3000);
const io = require('socket.io')(server);

socket.socketHandler(io);