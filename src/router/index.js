// Config for all routes
const router = require('express').Router();
const homeRouter = require('./homeRouter');
const loginRouter = require('./loginRouter');

router.get('/', (req, res) => {
    res.redirect('/login');
});

router.use('/home', homeRouter);
router.use('/login', loginRouter);


module.exports = router;