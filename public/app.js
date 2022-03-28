const socket = io();
const chat_text = document.querySelector(".chat-text");
const chat_button = document.querySelector(".chat-button");
const chat_input = document.querySelector(".chat-input");

socket.on("new user", (Messages) => {
    for (let message of Messages) {
        let message_box = document.createElement("div");
        message_box.classList.add("guest-message");
        message_box.innerText = message;
        chat_text.appendChild(message_box);
    }
    chat_text.scrollTop = chat_text.scrollHeight;
});

chat_button.addEventListener("click", (e) => {
    e.preventDefault();
    if (chat_input.value == "") return;
    let message_box = document.createElement("div");
    message_box.classList.add("own-message");
    message_box.innerText = chat_input.value;
    chat_text.appendChild(message_box);

    socket.emit("message send", chat_input.value);
    chat_input.value = "";
    chat_text.scrollTop = chat_text.scrollHeight;
});

socket.on("message send", (message) => {
    let message_box = document.createElement("div");
    message_box.classList.add("guest-message");
    message_box.innerText = message;
    chat_text.appendChild(message_box);
    chat_text.scrollTop = chat_text.scrollHeight;
});
