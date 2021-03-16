//Prefix Path: /home
const home = require('express')();


home.get('/', (req, res) => {
    res.render('home/index');
});


module.exports = home;