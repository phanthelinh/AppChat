const {Schema, model} = require('mongoose');
const uuid = require('uuid');

const userSchema = new Schema({
    _id: {type: String, default: uuid.v4},
    username: {type: String, unique: true, required: true},
    displayName: {type: String},
    password: {type: String, required: true}
})

module.exports = model('users', userSchema);