const roomName = JSON.parse(document.getElementById("room_name").textContent);

const chatSocket = new WebSocket (
    'ws://'
    + window.location.host
    + '/ws/chat/' 
    + roomName
    + '/'
);

chatSocket.onmessage = (e) => {
    const data = JSON.parse(e.data);
    document.getElementById("chat-log").value += (data.message + '\n');
}

chatSocket.onclose = (e) => {
    console.error("Chat socket closed unexpectedly");
}

document.getElementById('chat-message-input').focus();
document.getElementById('chat-message-input').onkeyup = (e) => {
    if(e.key == "Enter"){
        document.getElementById('chat-message-submit').click();
    }
}

document.getElementById('chat-message-submit').onclick = () =>{
    const messageInputDom = document.getElementById('chat-message-input');
    const message = messageInputDom.value;
    chatSocket.send(JSON.stringify({
        'message' : message
    }))
    messageInputDom.value = '';

}