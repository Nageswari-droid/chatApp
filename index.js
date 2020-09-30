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
const date = document.querySelector('.each-date');

msgNotifications(`You joined`);

nameBtn.addEventListener('click', function() {
    let name = userName.value;
    inputHandler(name);
});

socket.on('user-connected', function(userName) {
    console.log(userName);
    msgNotifications(`${userName} Connected`);
});

socket.on('chat-message', (data) => {
    appendMessage(data.name, data.message);
    msgNotifications(`Message from ${data.name}`);
});

socket.on('user-disconnected', (name) => {
    msgNotifications(`${name} disconnected`);
});

submitBtn.addEventListener('click', (e) => {
    submitHandler(e);
});

document.querySelector('#msg-sub').addEventListener('keypress', function(event) {
    if (event.which === 13) {
        submitHandler(event);
    }
})


function appendYourMessage(name, message) {
    const d = new Date();
    var hrs = addZero(d.getHours());
    var minutes = addZero(d.getMinutes());
    const newParentElement = document.createElement('div');
    newParentElement.className = 'new-your-messages';
    newParentElement.innerHTML = `
        <div class="parent-new-element">
            <div class="name-time">
                <div class="name">${name}</div>
            </div>
            <div class="message-class">
                ${message}
            </div>
            <div class="time">${hrs}:${minutes}</div>
        </div>
    `;
    msgContainer.append(newParentElement);
    scrollHandler();
}

function appendMessage(name, message) {
    const d = new Date();
    var hrs = addZero(d.getHours());
    var minutes = addZero(d.getMinutes());
    const newElement = document.createElement('div');
    newElement.className = 'new-messages';
    newElement.innerHTML = `
        <div class="parent-element">
            <div class="name-time">
                <div class="name">${name}</div>
            </div>
            <div class="message-class">
                ${message}
            </div>
            <div class="time">${hrs}:${minutes}</div>
        </div>
    `;
    msgContainer.append(newElement);
    scrollHandler();
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

function addZero(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}


function dateHandler() {
    const dateUpdate = new Date().toString().split(' ');
    let dateStr = (dateUpdate[1] + " " + dateUpdate[2] + " " + dateUpdate[3]).trim();
    const newDateEle = document.createElement('div');
    newDateEle.className = "date-style";
    newDateEle.innerHTML = `
        ${dateStr}
    `;

    date.append(newDateEle);
}

function inputHandler(name) {

    nameDiv.style.display = 'none';
    const nameDisplay = document.createElement('div');
    nameDisplay.className = 'name-display';
    nameDisplay.innerHTML = `Welcome, ${name}`;
    nameParent.append(nameDisplay);

    sendHandler(name);
}

function submitHandler(e) {
    e.preventDefault();
    const message = msgInput.value.trim();
    appendYourMessage('You', message);
    socket.emit('send-chat', message);
    msgInput.value = ' ';
}

function scrollHandler() {
    msgContainer.scrollTop += msgContainer.scrollHeight;
}

dateHandler();