module.exports = io => {
    io.on('connection', socket => {
        console.log('new user login');
        socket.on('disconnect', reason => {
            console.log(reason);
        });

        socket.on('new message', messageObj => {
            io.emit('new message', messageObj);
        })
    });

}