const socket = io();

socket.on("message", (message) => {
    const messagesDiv = document.getElementById("messages");
    const msgElement = document.createElement("p");
    msgElement.textContent = `${message.user}: ${message.text}`;
    messagesDiv.appendChild(msgElement);
});

function sendMessage() {
    const input = document.getElementById("messageInput");
    socket.emit("sendMessage", { user: "User", text: input.value });
    input.value = "";
}
