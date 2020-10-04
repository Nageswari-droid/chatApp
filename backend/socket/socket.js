let users = [];
let dp = [];

exports.socketHandler = (io) => {
    io.on('connection', (socket) => {
        socket.on('new-user', (name) => {
            users[socket.id] = name;
            socket.broadcast.emit('user-connected', name);
        });
        socket.on('user-dp', (userDp) => {
            dp[socket.id] = userDp;
        });
        socket.on('about-user', (data) => {
            console.log(data.about + "," + data.name);
            socket.broadcast.emit('user-detail', { about: data.about, name: data.name });
        });
        socket.on('send-chat', (message) => {
            socket.broadcast.emit('chat-message', {
                message: message,
                name: users[socket.id],
                userDp: dp[socket.id]
            });
        });
        socket.on('disconnect', () => {
            socket.broadcast.emit('user-disconnected', users[socket.id]);
            delete users[socket.id];
        });
    });
}