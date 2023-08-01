var express = require('express');
app = express();
port = process.env.PORT || 3000;
mongoose = require('mongoose');
user = require('../backend/models/userListModels');
cors = require('cors')

mongoose.Promise = global.Promise;

// Middleware per il parsing dei dati JSON
app.use(express.json());

//"UserDB" è il nome del database in MongoDB.
mongoose.connect('mongodb://127.0.0.1:27017/UserDB').then(()=> console.log("Connected to localhost MongoDB.")).catch((e)=>console.log(e));

//è essenziale per impostare correttamente l'header fra scambio di messaggi in axios.
app.use(cors());


var route = require('../backend/routerBackend/routerBackend')
app.use('/',route);
app.use('/login',route);

app.listen(port);

console.log('User connected to port: '+port);


