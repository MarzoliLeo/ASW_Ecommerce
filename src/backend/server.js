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
mongoose.connect('mongodb://127.0.0.1:27017/EFit').then(()=> console.log("Connected to localhost MongoDB.")).catch((e)=>console.log(e));

// è essenziale per impostare correttamente l'header fra scambio di messaggi in axios.
app.use(cors());

var route = require('../backend/routerBackend/routerBackend.js')

app.use('/',route);
app.use('/login',route);
app.use('/admin/addCategory',route);
app.use('/showCategories',route);
app.use('/user/addCourseToCart', route)

// Gestione della connessione e disconnessione di un client.
// Also socket set up for the server to tell clients to refresh their page
// once a new category and/or course has been added
io.on('connection', (socket)=>{
  // This is the category refresh request
  socket.on("requestRefreshCategories", () => {
    console.log("Request for refreshing categories")
    io.emit("refreshCategories", "")
  });

  // This is the course refresh request
  socket.on("requestRefreshCourses", () => {
    console.log("Request for refreshing courses")
    io.emit("refreshCourses", "")
  });  
});



// Faccio partire il server...
// Old commands used to start the server
// const server = app.listen(port);
// console.log('User connected to port: '+ port);

//Now with socket.io, the socket listens on the port that we've chosen, which is the port 3000 
serverSocket.listen(3000, () => {
  console.log('listening on *:3000');
});