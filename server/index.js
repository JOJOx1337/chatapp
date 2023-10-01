const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const { addUser, getUser, removeUser } = require("./users.js");

const PORT = process.env.PORT || 5000;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
});

app.use(router);
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

io.on("connection", (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name: name, room: room });
   
    if(error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {

    const user = getUser(socket.id);
    console.log(`room: ${user}, id: ${socket.id}, message: ${message}`)
    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });


  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log(`${socket.id} just left.`);
  });
});
