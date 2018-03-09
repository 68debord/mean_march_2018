
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


 res.render('index');
})



var server = app.listen(8000, function() {
 console.log("listening on port 8000");
});
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
  socket.on( "button_clicked", function (data){
    io.emit( 'button_response', {response:  "sockets are the best!"});
  })
  socket.on( "reset_clicked", function (data){

    io.emit( 'reset_response', {response:  "sockets are the best!"});
  })
})
