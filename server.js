const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const router = require('./src/router');
// Socket.io
const io = require('socket.io')(server);
require('./src/socket')(io);

//set static path
app.use(express.static(__dirname + '/public'));
//set view engine
app.set('view engine', 'ejs');

app.use('/', router);


server.listen(8080, () => {
    console.log('Server listening on port 8080');
})