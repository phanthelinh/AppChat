const jwt = require('jsonwebtoken');
const SECRET_KEY = 'mysecretKey';

exports.generateToken = userModel => jwt.sign({
    data: userModel,
    exp: Math.floor(Date.now() / 1000) + (60 * 60)
}, SECRET_KEY);

exports.verifyToken = (req, res, next) => {
    let token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                res.redirect('/login');
            } else {
                req.user = decoded.data;
                next();
            }
        })
    } else {
        res.redirect('/login');
    } 
}

exports.setToken = (res, userModel) => {
    res.cookie('jwt', exports.generateToken(userModel), {httpOnly: true, secure: false});
}