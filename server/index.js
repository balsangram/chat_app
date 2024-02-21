const express = require('express');
const app = express();
const http = require("http");
const cors = require("cors");
const {Server} = require("socket.io");
require("dotenv").config()

app.use(cors());
// const port = 8000 || process.env.PORT;

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.url,
        methods:["GET", "POST"],
    },
})
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joines room: ${data}`);
    })
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message",data)
    });
    socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
    })
})

server.listen(8000, () =>{
// server.listen(port, () =>{
    console.log("server running...");
})