// makeke connection to server
var socket = io.connect('localhost:5500');

//query DOM
var message = document.getElementById('message');
    username = document.getElementById('username');
    output = document.getElementById('output');
    btn = document.getElementById('send');
    feedback = document.getElementById('feedback');
    usercount = document.getElementById('usercount');
    fielderror = document.getElementById('fielderror');
    time = document.getElementById('time');

//emit events on click of button
btn.addEventListener('click', ()=>{

let localTime = new Date();
let stringTime = localTime.toLocaleTimeString(); 

//emit the data to be sent
socket.emit('chat', {
    username: username.value,
    message: message.value,
    time: stringTime
});
});

//add "USER is Typing" on keypress event

message.addEventListener('keypress', ()=>{
    socket.emit('typing', username.value);
})

//display data in empty div on that event
socket.on('chat', (data)=>{
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' +data.username+ ': </strong>' +data.message+ '</p>';
    time.innerHTML += '<p><strong>' +data.time+ '</strong>'; 
});

socket.on('typing', (data)=>{
    feedback.innerHTML = '<p>' +data+ ' is typing a message...</p>';
});

socket.on('userCount', (data)=>{
    usercount.innerHTML = '<p><strong>' +data.userCount+ ' user(s) online now.</strong></p>';
});

socket.on('exception', (data)=>{
    fielderror.innerHTML='<p>'+data.fielderr+'</p>';
});