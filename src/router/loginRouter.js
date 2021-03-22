const login = require('express').Router();

var usersList = require('../data/users');

login.get('/', (req, res) => {
    res.render('login/index');
})

login.post('/', (req, res) => {
    let body = req.body;
    if (body && body.username !== undefined && body.username.trim().length > 0) {
        let foundExistUser = usersList.find(user => user.username === body.username);
        if (foundExistUser) {
            res.render('login/index', {error: 'Already exist a user with your name. Please create another one'})
        } else {
            //valid user
            let newUser = {id: new Date().getTime(), username: body.username};
            usersList.push(newUser);
            res.redirect('/home?id=' + newUser.id);
        }
    } else {
        res.render('login/index', {error: 'Unable to join'})
    }

});

module.exports = login;