const express = require("express");
const Message = require("../models/Message");

const router = express.Router();

// Get all messages
router.get("/messages", async (req, res) => {
    const messages = await Message.find();
    res.json(messages);
});

// Send a message
router.post("/send", async (req, res) => {
    const { user, text } = req.body;
    const message = new Message({ user, text });
    await message.save();
    res.json(message);
});

module.exports = router;
