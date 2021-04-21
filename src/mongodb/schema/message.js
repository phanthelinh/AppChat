const {Schema, model} = require('mongoose');
const uuid = require('uuid');

const messageSchema = new Schema({
    _id: {type: String, default: uuid.v4},
    senderId: {type: String, required: true},
    senderAttach: {type: Buffer},
    attachType: {type: String},
    receiverId: {type: String, required: true},
    message: {type: String, required: true},
    datetime: {type: Date, required: true, default: new Date()}
});

module.exports = model('messages', messageSchema);