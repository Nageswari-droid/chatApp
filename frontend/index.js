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
const form = document.querySelector('.form-enable');
const profilePic = document.querySelector('#file-upload-id');
const textArea = document.querySelector('.about-yourself');

const textAreaAnime = document.querySelector('.write-size');
const saveBtn = document.querySelector('.save-btn');

var formData = new FormData();
var appendMsgFlag = 0,
    appendYourMsgFlag = 0;
let yourDp, userDp;
let i = 0,
    j = 0;
let editFlag = 0;
let textAreaFlag = 0;

profilePic.addEventListener('change', function(event) {

    formData.delete('images');
    formData.append('images', event.target.files[0]);

    fetch('http://localhost:3000/uploads/', {
            method: 'POST',
            body: formData
        })
        .then((res) => {
            res.json().then((res) => {
                userDp = res.body;
                socket.emit('user-dp', res.body);
                document.querySelector('.img-avatar').style.backgroundImage =
                    'url(data:image/png;base64,' + res.body + ')';
            });
        })
        .catch((err) => {
            console.log('Error: ' + err);
        });
});

msgNotifications(`You joined`);

nameBtn.addEventListener('click', function() {
    let name = userName.value;
    inputHandler(name);
});

userName.addEventListener('keypress', function(event) {
    if (event.which === 13) {
        let name = userName.value;
        inputHandler(name);
    }
});

textArea.addEventListener('click', () => {
    if (textAreaFlag == 0) {
        textAreaAnime.classList.add('write-move-div');
        saveBtn.classList.add('save-btn-move');
        textAreaFlag = 1;
    } else if (textAreaFlag == 1) {
        textAreaAnime.classList.add('remove-animation');
        saveBtn.classList.add('remove-save-animation');
    }

});

saveBtn.addEventListener('click', () => {

    const textAreaValue = textArea.value.trim();

    if (editFlag === 1) {
        socket.emit('edit-user', userName.value);
    }

    const newSaveElement = document.createElement('div');
    newSaveElement.className = 'saveBtnClass';
    newSaveElement.innerHTML = `
        <div class="save-btn-new">
            ${textAreaValue}
        </div>
        <div class="edit-btn">
            <div>
                ${"Edit"} 
            </div>
            <div class="edit-img">
                
            </div>
        </div>
    `;

    if (textAreaValue.length > 0 && userName.value.trim().length > 0) {
        $('.about-text-box').hide();
        $('.about').append(newSaveElement);

        socket.emit('about-user', { about: textArea.value, name: userName.value });

        mouseEventHandler('.edit-btn', '.edit-img');

        $('.edit-btn').on("click", () => {
            $('.saveBtnClass').remove();
            textArea.value = textArea.value;
            textAreaAnime.classList.remove('write-move-div');
            textAreaAnime.classList.add('remove-animation');
            saveBtn.classList.remove('save-btn-move');
            saveBtn.classList.add('remove-save-animation');
            $('.about-text-box').show();
            editFlag = 1;
        });

    } else if (textAreaValue.length === 0) {
        errorHandler('Write something about yourself.');
    } else if (userName.value.trim().length === 0) {
        errorHandler('Enter your name in the header text box.');
    }
});

socket.on('user-detail', (data) => {
    msgNotifications(`${data.name} - ${data.about}`);
});

socket.on('edited-details', (name) => {
    msgNotifications(`(${name} updated about)`)
})

socket.on('user-connected', function(userName) {
    msgNotifications(`${userName} Connected`);
});

socket.on('chat-message', (data) => {
    appendMessage(data.name, data.message, data.userDp);
    msgNotifications(`Message from ${data.name}`);
});

socket.on('user-disconnected', (name) => {
    if (!name) {
        msgNotifications(`Unknown user disconnected`);
    } else {
        msgNotifications(`${name} disconnected`);
    }
});

submitBtn.addEventListener('click', (e) => {
    submitHandler(e);
});

document
    .querySelector('#msg-sub')
    .addEventListener('keypress', function(event) {
        if (event.which === 13) {
            submitHandler(event);
        }
    });

function appendYourMessage(name, message, dp) {
    const d = new Date();
    var hrs = addZero(d.getHours());
    var minutes = addZero(d.getMinutes());
    let bgImageNew;

    if (!dp) {
        bgImageNew = `url('../image/Picture4.svg')`;
    } else {
        bgImageNew = `url('data:image/png;base64,${dp}')`;
    }

    const newParentElement = document.createElement('div');
    newParentElement.className = 'new-your-parent-messages';
    newParentElement.id = `new-your-parent-message-${i}`;
    newParentElement.innerHTML = `
        <div class="msg-with-avatar" id="msg-with-avatar-${i}" style="background-image:${bgImageNew}"></div>
        <div class="new-your-messages">
            <div class="your-msg-arrow" id="your-msg-arrow-${i}"></div>
            <div class="parent-new-element">
                <div class="name-time">
                    <span class="your-name">${name}</span>
                </div>
                <div class="message-class">
                    ${message}
                </div>
                <div class="time">${hrs}:${minutes}</div>
            </div>
        </div>
    `;

    msgContainer.append(newParentElement);
    $('.msg-with-avatar').css('background-image', `${bgImageNew}`);
    scrollHandler(msgContainer);

    if (appendYourMsgFlag === 0) {
        $(`#msg-with-avatar-${i}`).css("visibility", "visible");
        $(`#your-msg-arrow-${i}`).css("visibility", "visible");
        appendYourMsgFlag = 1;
        appendMsgFlag = 0;
    }
    i++;
}

function appendMessage(name, message, dp) {
    const d = new Date();
    var hrs = addZero(d.getHours());
    var minutes = addZero(d.getMinutes());
    const newElement = document.createElement('div');
    let bgImage;

    if (!name) {
        name = 'Unknown user';
    }
    if (!dp) {
        bgImage = `url('../image/Picture4.svg')`;
    } else {
        bgImage = `url('data:image/png;base64,${dp}')`;
    }

    newElement.className = 'new-parent-messages';
    newElement.id = `new-parent-messages-${j}`
    newElement.innerHTML = `
        <div class="new-messages">
            <div class="msg-arrow" id="msg-arrow-${j}"></div>
            <div class="parent-element">
                <div class="name-time">
                    <div class="name">
                        <span class="user-name">${name}</span>
                    </div>
                </div>
                <div class="message-class">
                    ${message}
                </div>
                <div class="time">${hrs}:${minutes}</div>
            </div>
        </div>
        <div class="msg-with-user-avatar" id="msg-with-user-avatar-${j}" style="background-image:${bgImage}"></div>
    `;
    msgContainer.append(newElement);
    $('.msg-with-user-avatar').css('background-image', `${bgImage}`);
    $('.user-name').text(name);
    scrollHandler(msgContainer);

    if (appendMsgFlag === 0) {
        $(`#msg-with-user-avatar-${j}`).css("visibility", "visible");
        $(`#msg-arrow-${j}`).css("visibility", "visible");
        appendMsgFlag = 1;
        appendYourMsgFlag = 0;
    }
    j++;
}

function msgNotifications(message) {
    const newElement = document.createElement('div');
    newElement.className = 'new-notifications';
    newElement.innerText = message;
    msgNot.append(newElement);
    scrollHandler(msgNot);
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
    let dateStr = (
        dateUpdate[1] +
        ' ' +
        dateUpdate[2] +
        ' ' +
        dateUpdate[3]
    ).trim();
    const newDateEle = document.createElement('div');
    newDateEle.className = 'date-style';
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
    appendYourMessage('You', message, userDp);
    socket.emit('send-chat', message);
    msgInput.value = ' ';
    $('.input-text').attr('placeholder', 'Enter message');
}

function scrollHandler(scrollBar) {
    scrollBar.scrollTop += scrollBar.scrollHeight;
}

function errorHandler(errorMsg) {
    const errorMessage = document.createElement("div");
    errorMessage.className = "error-message";
    errorMessage.innerHTML = `&#x2717; ${errorMsg}`;
    $('.save-parent-btn').append(errorMessage);
    setTimeout(function(data) {
        $(errorMessage).fadeOut('slow')
    }, 1500);
}

function mouseEventHandler(editClass, editImg) {
    $(editClass).on("mouseover", () => {
        $(editImg).css("backgroundImage", "url('../image/Picture10.svg')");
    });

    $(editClass).on("mouseleave", () => {
        $(editImg).css("backgroundImage", "url('../image/Picture9.svg')");
    });
}

dateHandler();