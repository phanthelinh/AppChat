const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cookieParser = require('cookie-parser');
const cors = require('cors');
const moment = require('moment');

const router = require('./src/router');

//body parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(cookieParser());

//set to locals for ejs using
app.locals.moment = moment;

// Socket.io
const io = require('socket.io')(server);
require('./src/socket')(io);

//Mongo
require('./src/mongodb');

//set static path
app.use(express.static(__dirname + '/public'));
//set view engine
app.set('view engine', 'ejs');

app.use('/', router);


server.listen(8080, () => {
    console.log('Server listening on port 8080');
})