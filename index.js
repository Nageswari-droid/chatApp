const socket = io('http://localhost:3000');
const msgForm = document.querySelector('.input-form');
const msgInput = document.querySelector('.input-text');
const msgContainer = document.querySelector('.message-container');
const userName = document.querySelector('.input-name');
const nameBtn = document.querySelector('.name-btn');
const submitBtn = document.querySelector('.send-btn');

appendMessage(`You connected`);

nameBtn.addEventListener('click', () => {
    let name = userName.value;
    socket.on('user-connected', (name) => {
        appendMessage(`${name} Connected`);
    });
    socket.emit('new-user', name);
});

socket.on('chat-message', (data) => {
    appendMessage(`${data.name} : ${data.message}`);
});

socket.on('user-disconnected', (name) => {
    appendMessage(`${name} disconnected`);
});

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const message = msgInput.value;
    appendMessage(`You: ${message}`);
    socket.emit('send-chat', message);
    msgInput.value = ' ';
});

function appendMessage(message) {
    const newElement = document.createElement('div');
    newElement.innerText = message;
    msgContainer.append(newElement);
}