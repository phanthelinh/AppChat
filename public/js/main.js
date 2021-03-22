const socket = io('ws://localhost:8080');

//message = {id, message}
function addMessage(myId, message, chatContainer) {
    if (myId === message.id) {
        chatContainer.append(`<div class="my-text">${message.message}</div>`);
    } else {
        chatContainer.append(`<div class="their-text">${message.message}</div>`)
    }
}