const mongoose = require('mongoose');

const connectionString = "mongodb://localhost:27017/AppChat"

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('DB is connected'))
    .catch(e => console.log(e))