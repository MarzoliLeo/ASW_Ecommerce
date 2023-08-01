var express = require('express');
app = express();
port = process.env.PORT || 3000;
mongoose = require('mongoose');
user = require('../backend/models/userListModels');
cors = require('cors') //è essenziale per impostare correttamente l'header fra scambio di messaggi.

mongoose.Promise = global.Promise;
//"UserDB" è il nome del database in MongoDB.
mongoose.connect('mongodb://127.0.0.1:27017/UserDB').then(()=> console.log("Connected to localhost MongoDB.")).catch((e)=>console.log(e));

app.use(cors());

var route = require('../backend/routerBackend/routerBackend')
app.use('/',route);

app.listen(port);

console.log('User connected to port: '+port);


