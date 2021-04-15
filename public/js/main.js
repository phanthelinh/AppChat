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
function addMessage(myId, message, chatContainer) {
    if (myId === message.senderId) {
        chatContainer.append(`<div class="my-text">${message.message}</div>`);
    } else {
        chatContainer.append(`<div class="their-text-wrapper"><div class="circle">${getInitialName(message.senderDisplayName)}</div><div class="their-text">${message.message}</div></div>`)
    }
}