require("dotenv").config();
const pswd = "akotwica1";
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require("path");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/views/index.html"));
});

app.post("/chat", (req, res) => {
    const { password, id } = req.body;
    if (password === pswd) {
        Users[id] = true;
        res.redirect("/chat?id=" + id);
    } else {
        res.redirect("/");
    }
});

app.get("/chat", (req, res) => {
    const { id } = req.query;
    if (!Users[id]) {
        res.redirect("/");
    }
    res.sendFile(path.join(__dirname, "/public/views/chat.html"));
});

app.use((request, response, next) => {
    response.redirect("/");
    next();
});

const Messages = [];
const Users = new Map();

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
