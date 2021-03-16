// Config for all routes
const router = require('express')();
const homeRouter = require('./homeRouter');

router.get('/', (req, res) => {
    res.redirect('/home');
});

router.use('/home', homeRouter);


module.exports = router;