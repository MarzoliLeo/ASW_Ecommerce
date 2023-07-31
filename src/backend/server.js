var express = require('express');
app = express();
port = process.env.PORT || 3000;
mongoose = require('mongoose');
user = require('../backend/models/userListModels');
bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Userdb');

app.use(bodyParser.urlencoded({ extended : true}))
app.use(bodyParser.json());

var route = require('../backend/routerBackend/routerBackend')
app.use('/users',route);

app.listen(port);

console.log('User conntected to port: '+port);


