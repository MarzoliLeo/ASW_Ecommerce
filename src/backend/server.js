var express = require('express');
app = express();
port = process.env.PORT || 3000;
mongoose = require('mongoose');
user = require('../backend/models/userListModels');
bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
//"UserDB" è il nome del database in MongoDB.
mongoose.connect('mongodb://127.0.0.1:27017/UserDB').then(()=> console.log("Connected to localhost MongoDB.")).catch((e)=>console.log(e));
//mongoose.connect('mongodb://127.0.0.1/UserDB');

app.use(bodyParser.urlencoded({ extended : true}))
app.use(bodyParser.json());

var route = require('../backend/routerBackend/routerBackend')
app.use('/users',route);

app.listen(port);

console.log('User connected to port: '+port);


