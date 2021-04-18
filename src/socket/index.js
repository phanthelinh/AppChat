const messageServices = require('../mongodb/services/messageService');

module.exports = io => {
    io.on('connection', socket => {
        socket.on('disconnect', reason => {
            console.log(reason);
        });

        socket.on('new message', async messageObj => {
            // only save private chat
            if (messageObj.receiverId) {
                messageServices.saveMessages(messageObj);
            }
            io.emit('new message', messageObj);
        });

        socket.on('user join', obj => {
            io.emit('user join', obj);
        })
    });

}