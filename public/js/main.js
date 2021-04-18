const socket = io('ws://localhost:8080');

function getInitialName(displayName) {
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
    let initials = [...displayName.matchAll(rgx)] || [];

    initials = (
    (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
    ).toUpperCase();

    return initials;
}

//message = {id, message}
function addMessage(myId, message, chatContainer, privateId) {
    //I send message 
    if (myId === message.senderId) {
        if (message.receiverId) {
            // Send in private chat
            if (message.receiverId === privateId) {
                chatContainer.append(`<div class="my-text">${message.message}</div>`);
            } 
        } else {
            // on Chat Room
            chatContainer.append(`<div class="my-text">${message.message}</div>`);
        }
    } 
    // I receive message
    else {
        if (message.receiverId) {
            // Send in private chat, send for me
            //make sure "I" am in private chat with the sender
            if (message.receiverId === myId && privateId === message.senderId) {
                chatContainer.append(`<div class="their-text-wrapper"><div class="circle">${getInitialName(message.senderDisplayName)}</div><div class="their-text">${message.message}</div></div>`)
            } else if(message.receiverId === myId && privateId !== message.senderId) {
                //display as new message
            }

        } else {
            // on Chat Room
            chatContainer.append(`<div class="their-text-wrapper"><div class="circle">${getInitialName(message.senderDisplayName)}</div><div class="their-text">${message.message}</div></div>`)
        }
        
    }
}

function drawUserList(userList, container, myId) {
    container.empty();
    let hasRow = false;
    container.append('<a class="user" href="/home">Back to the Chat Room</a>')
    userList.forEach((user, idx, self) => {
        if (user._id !== myId) {
            container.append(`<a class="user" href="/home/${user._id}">${user.displayName}</a>`);
            hasRow = true;
        }
        if (idx === self.length -1 && !hasRow) {
            container.append('<div class="no-user-online">No other users are online now</div>');
        }
    })
}

