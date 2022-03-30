const socket = io();
const chat_text = document.querySelector(".chat-text");
const chat_button = document.querySelector(".chat-button");
const chat_input = document.querySelector(".chat-input");
const users_count = document.querySelector(".user-count");
let messages_arr = [];

socket.on("new user", (Messages) => {
    messages_arr = [];
    for (let message of Messages) {
        let message_box = document.createElement("div");
        message_box.classList.add("guest-message");
        message_box.innerText = message;
        chat_text.appendChild(message_box);

        messages_arr.push(message_box);
    }
    chat_text.scrollTop = chat_text.scrollHeight;

    update();
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

    messages_arr.push(message_box);

    update();
});

socket.on("message send", (message) => {
    let message_box = document.createElement("div");
    message_box.classList.add("guest-message");
    message_box.innerText = message;
    chat_text.appendChild(message_box);
    chat_text.scrollTop = chat_text.scrollHeight;

    messages_arr.push(message_box);
    update();
});

socket.on("update_count", (count) => {
    users_count.innerText = count;
});

function update() {
    messages_arr.forEach((elem) =>
        elem.addEventListener("click", copyToClipBoard)
    );
}

async function copyToClipBoard(e) {
    try {
        const toCopy = e.target.innerText || location.href;
        await navigator.clipboard.writeText(toCopy);
        console.log("Text or Page URL copied");
    } catch (err) {
        console.error("Failed to copy: ", err);
    }
}
