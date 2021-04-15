//Prefix Path: /home
const home = require('express').Router();
const auth = require('../middleware/auth');
const Users = require('../mongodb/schema/user');


home.get('/', auth.verifyToken, async (req, res) => {
    //get param
    let {user} = req;
    if (user) {
        let foundUser = await Users.findById(user._id);
        if (foundUser) {
            res.render('home/index', {user: foundUser});
        } else {
            res.send('User Id not found');
        }
    } else {
        res.send('User Id not found');
    }
});

home.post('/postMessage', auth.verifyToken, async (req, res) => {
    let body = req.body;
    console.log(body);
    res.end();
})


module.exports = home;