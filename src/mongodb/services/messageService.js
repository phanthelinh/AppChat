const {} = require('mongoose');
const Messages = require('../schema/message');
const moment = require('moment');

exports.getMessagesById = async (senderId, receiverId) => {
    let messages = await Messages.find({
        $or: [ 
            {senderId, receiverId}, 
            {senderId: receiverId, receiverId: senderId}
        ]
    }).sort([['datetime', 1]]);
    // return messages.map(it => {
    //     return {
    //         _id: it._id,
    //         senderId: it.senderId,
    //         receiverId: it.receiverId,
    //         message: it.message, 
    //         datetime: moment(it.datetime).format('yyyy-MM-dd HH:mm:ss')
    //     };
    // });
    return messages;
}

exports.saveMessages = async messageObj => {
    let newMessage = Messages({
        senderId: messageObj.senderId,
        receiverId: messageObj.receiverId,
        senderAttach: messageObj.senderAttach,
        attachType: messageObj.attachType,
        message: messageObj.message
    });

    await newMessage.save();
}