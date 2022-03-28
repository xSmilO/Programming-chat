require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require("path");
const { measureMemory } = require("vm");
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
    console.log(path.join(__dirname, "/public"));
});

const Messages = [];

io.on("connection", (socket) => {
    console.log("client connected");
    socket.emit("new user", Messages);
    socket.on("disconnect", () => console.log("Client disconnected"));
    socket.on("message send", (message) => {
        Messages.push(message);
        socket.broadcast.emit("message send", message);
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on https://localhost:${PORT}`);
});
