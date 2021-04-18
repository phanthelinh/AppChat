//Prefix Path: /home
const home = require('express').Router();
const auth = require('../middleware/auth');
const Users = require('../mongodb/schema/user');
const helper = require('../helpers');
const messageServices = require('../mongodb/services/messageService');


home.get('/', auth.verifyToken, async (req, res) => {
    //get param
    let {user} = req;
    if (user) {
        let foundUser = await Users.findById(user._id);
        if (foundUser) {
            res.render('home/index', {title: 'Chat room', user: foundUser, onlineList: helper.onlineList});
        } else {
            res.send('User Id not found');
        }
    } else {
        res.send('User Id not found');
    }
});

home.post('/postMessage', auth.verifyToken, async (req, res) => {
    let body = req.body;
    res.end();
});

home.get('/:id', auth.verifyToken, async (req, res) => {
    let receiverId = req.params.id;
    if (receiverId) {
        //find in online list
        let onlineUser = helper.onlineList.find(x => x._id === receiverId);
        if (onlineUser) {
            let {user} = req;
            if (user) {
                let foundUser = await Users.findById(user._id);
                if (foundUser) {
                    //load old message
                    let oldMessages = await messageServices.getMessagesById(foundUser._id, onlineUser._id);
                    res.render('home/index', {
                        title: onlineUser.displayName, 
                        user: foundUser, 
                        receiverUser: onlineUser, 
                        onlineList: helper.onlineList,
                        oldMessages: JSON.stringify(oldMessages)
                    });
                } else {
                    res.render('home/index', {error: 'User Id not found'});
                }
            } else {
                res.render('home/index', {error: 'User Id not found'});
            }
        } else {
            res.render('home/index', {error: 'User does not exist or online'});
        }
    } else {
        res.render('home/index', {error: 'User does not exist or online'});
    }
})


module.exports = home;