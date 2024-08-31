var express = require('express');
var app = express();
var http = require('http').Server(app);
app.use(express.static(__dirname));

let server = http.listen(3000, function () {
    console.log(__dirname + '/src/app/home/home.component.html');
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/src/app/home/home.component.html');
})

app.get('/login', function (req, res) {
    res.sendFile(__dirname + '/src/app/login/login.component.html');
})

app.get('/account', function (req, res) {
    res.sendFile(__dirname + '/src/app/account/account.component.html');
})

app.get('/chat', function (req, res) {
    res.sendFile(__dirname + '/src/app/chat/chat.component.html');
})