const express = require("express");
const app = express();
const session = require('express-session');
const server = app.listen(4567);
const io = require('socket.io')(server);

app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(session({
  secret: 'bigsecret',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))
app.get('/', (req, res) => {
    res.render('chatroom');
});
io.on('connection', function (socket) {
    socket.on('username', function(username) {
        socket.username = username;
        io.emit('is_online', '<i> OH DANG ' + socket.username + ' open this pit up!</i>');
    });
        socket.on('chat_message', function(message) {
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });
    });