var express = require('express');
app = express();
port = process.env.PORT || 3000;
mongoose = require('mongoose');

// This is the setup required to ensure that socket.io works
const http = require('http');
const serverSocket = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(serverSocket, {
  cors: {
    origin: "http://localhost:5173"
  }
});

user = require('../backend/models/userListModels');
cors = require('cors')

mongoose.Promise = global.Promise;

// Middleware per il parsing dei dati JSON
app.use(express.json());

// "UserDB" è il nome del database in MongoDB.
mongoose.connect('mongodb://127.0.0.1:27017/UserDB').then(()=> console.log("Connected to localhost MongoDB.")).catch((e)=>console.log(e));

// è essenziale per impostare correttamente l'header fra scambio di messaggi in axios.
app.use(cors());

var route = require('../backend/routerBackend/routerBackend.js')
app.use('/',route);
app.use('/login',route);
app.use('/admin/addCategory',route);
app.use('/showCategories',route);

// Gestione della connessione e disconnessione di un client.
io.on('connection', (socket)=>{
  socket.on("requestRefreshCategories", () => {
    console.log("Request for refreshing categories")
    io.emit("refreshCategories", "")
  });
    // console.log('a user connected');
    // socket.on('disconnect', ()=>{
    //   console.log('user disconnected');
    // });
});



// Faccio partire il server...
// Old commands used to start the server
// const server = app.listen(port);
// console.log('User connected to port: '+ port);

//Now with socket.io, the socket listens on the port that we've chosen, which is the port 3000 
serverSocket.listen(3000, () => {
  console.log('listening on *:3000');
});