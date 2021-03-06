
var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.use(session({secret: 'himitsu'}));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {

 res.render("index");
})

app.post('/users', function(req, res) {
 console.log("POST DATA", req.body);

 res.redirect('/');
})

var server = app.listen(8000, function() {
 console.log("listening on port 8000");
});
var io = require('socket.io').listen(server);

var messages = [];
io.sockets.on('connection', function (socket) {
  socket.on('message_post', function(data){
      var post = data;
      console.log(post, "this is server");
      console.log(post.name);
      console.log(post.message);
      messages.push(`${post.name} ~ ${post.message}`);
      io.emit('message_response', messages);
  })

  socket.on('new_connection', function(data){
    io.emit('message_response', messages);
  })



})
