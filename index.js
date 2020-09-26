const socket = io('http://localhost:3000');

const nameDiv = document.querySelector('.name-div');
const nameParent = document.querySelector('.name-style');
const msgInput = document.querySelector('.input-text');
const msgContainer = document.querySelector('.messages');
const userName = document.querySelector('.input-name');
const nameBtn = document.querySelector('.name-btn');
const submitBtn = document.querySelector('.send-btn');
const nodeTwo = document.querySelector('.node-two');
const msgNot = document.querySelector('.msg-notification');

msgNotifications(`You connected`);

nameBtn.addEventListener('click', function() {

    let name = userName.value;

    nameDiv.style.display = 'none';
    const nameDisplay = document.createElement('div');
    nameDisplay.className = 'name-display';
    nameDisplay.innerHTML = `Welcome, ${name}`;
    nameParent.append(nameDisplay);

    sendHandler(name);
});

socket.on('user-connected', function(userName) {
    console.log(userName);
    msgNotifications(`${userName} Connected`);
});

socket.on('chat-message', (data) => {
    appendMessage(`${data.name} : ${data.message}`);
});

socket.on('user-disconnected', (name) => {
    msgNotifications(`${name} disconnected`);
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
    newElement.className = 'new-messages';
    newElement.innerText = message;
    msgContainer.append(newElement);
}

function msgNotifications(message) {
    const newElement = document.createElement('div');
    newElement.className = 'new-notifications';
    newElement.innerText = message;
    msgNot.append(newElement);
}

function sendHandler(name) {
    socket.emit('new-user', name);
}