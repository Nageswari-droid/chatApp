const express = require('express');
const path = require('path');
const multer = require('multer');
const app = express();
const bodyParser = require('body-parser');

const users = [];

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/upload', express.static(path.join(__dirname, '/upload')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    console.log(req.file);
    if (file.mimetype == 'images/jpeg' || file.mimetype == 'images/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

// const upload = multer({
//     storage: storage,
//     fileFilter: fileFilter
// })

app.post('/uploads', multer({ storage: storage, fileFilter: fileFilter }).single('images'), (req, res, next) => {
    try {
        res.status(201).json({
            message: 'Success!'
        })
        console.log(req.url);
    } catch (err) {
        console.log('Error: ' + err);
    }
})

const server = app.listen(3000);
const io = require('socket.io')(server);

io.on('connection', socket => {
    socket.on('new-user', (name) => {
        users[socket.id] = name;
        socket.broadcast.emit('user-connected', name);
    });
    socket.on('send-chat', message => {
        socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] });
    });
    socket.on('disconnect', () => {

        socket.broadcast.emit('user-disconnected', users[socket.id]);
        delete users[socket.id];

    })
});