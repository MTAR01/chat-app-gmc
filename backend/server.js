const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const config = require("./config");
const Message = require("./models/Message");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());

io.on("connection", (socket) => {
    console.log("New user connected");

    socket.on("sendMessage", async (data) => {
        const message = new Message({ user: data.user, text: data.text });
        await message.save();
        io.emit("message", message);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

server.listen(3000, () => console.log("Server running on port 3000"));
