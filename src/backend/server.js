const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const route = require("../backend/routerBackend/routerBackend.js");
const app = express();


// Create an HTTP server instance using the Express app
const server = http.createServer(app);

// Create a new instance of the socket.io server and attach it to the HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

// Set the port number for the server
const port = 3000;

// Set the MongoDB connection URI
const mongoURI = "mongodb://127.0.0.1:27017/EFit";

// Connect to the MongoDB database using Mongoose
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

// Set up middleware for parsing JSON data and enabling CORS
app.use(express.json());
app.use(cors());

// Set up routes for the Express app
app.use("/", route);
app.use("/login", route);
app.use("/admin/addCategory", route);
app.use("/showCategories", route);
app.use("/addCourseToCart", route);
app.use("/getCartItems", route);

// Set up socket.io event listeners
io.on("connection", (socket) => {
  socket.on("requestRefreshCategories", () => {
    console.log("Request for refreshing categories");
    io.emit("refreshCategories", "");
  });

  socket.on("requestRefreshCourses", () => {
    console.log("Request for refreshing courses");
    io.emit("refreshCourses", "");
  });
});

// Start the server and listen for incoming requests
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
