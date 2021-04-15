module.exports = io => {
    io.on('connection', socket => {
        socket.on('disconnect', reason => {
            console.log(reason);
        });

        socket.on('new message', messageObj => {
            io.emit('new message', messageObj);
        })
    });

}