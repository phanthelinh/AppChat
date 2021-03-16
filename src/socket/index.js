module.exports = io => {
    io.on('connection', socket => {
        console.log('new user loggin');
        socket.on('disconnect', reason => {
            console.log(reason);
        });

        socket.on('new message', arg => {
            io.emit('new message', arg);
        })
    });

}