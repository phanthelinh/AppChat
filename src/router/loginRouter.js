const login = require('express').Router();
const helper = require('../helpers');
const auth = require('../middleware/auth');

var Users = require('../mongodb/schema/user');

//custom middleware
const validateRegisterForm = (req, res, next) => {
    let body = req.body;
    if (body && body.username && body.username.trim().length > 0 &&
        body.password && body.password.trim().length > 0 &&
        body.confirmPassword && body.confirmPassword.trim().length > 0 &&
        body.displayName && body.displayName.trim().length > 0) {
            if (body.password !== body.confirmPassword) {
                res.render('login/register', {error: 'Password does not match'})
            } else {
                next();
            }
    } else {
        res.render('login/register', {error: 'Unable to join'})
    }
}

login.get('/', (req, res) => {
    res.render('login/index');
})

login.post('/', async (req, res) => {
    let body = req.body;
    if (body && body.username && body.username.trim().length > 0 && body.password && body.password.trim().length > 0) {
        let foundExistUser = await Users.findOne({username: body.username});
        if (foundExistUser) {
            //validate password
            if (helper.verifyPassword(body.password, foundExistUser.password)) {
                //init access_token
                auth.setToken(res, foundExistUser);
                //add to online list if it does not exist
                let existLoggedIn = helper.onlineList.find(x => x._id === foundExistUser._id);
                if (!existLoggedIn) {
                    helper.onlineList.push(foundExistUser);
                }
                //valid user
                res.redirect('/home');
            } else {
                res.render('login/index', {error: 'Wrong username or password'})
            }
            
        } else {
            res.render('login/index', {error: 'Wrong username or password'})
        }
    } else {
        res.render('login/index', {error: 'Unable to join'})
    }

});

login.get('/register', (req, res) => {
    res.render('login/register');
});

login.post('/register', validateRegisterForm, async (req, res) => {
    let body = req.body;
    let foundExistUser = await Users.findOne({username: body.username});
        if (foundExistUser) {
            res.render('login/register', {error: 'Username has already existed'})
        } else {
            //valid new user
           let newUser = Users({
               username: body.username, 
               password: helper.hashPassword(body.password),
               displayName: body.displayName
            });
            await newUser.save();
            res.render('login/register', {success: 'Register successfully'})
        }
})

module.exports = login;