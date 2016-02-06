var express = require('express');
var CONFIG = require('./config');
var IRC = require('irc');

// var app = express();

var bot = new IRC.Client(CONFIG.SERVER, CONFIG.USERNAME, {
  channels: CONFIG.CHANNELS}, CONFIG.PASSWORD
);

// used to verify everything runs ok
// app.get('/', function (req, res) {
//   res.send('hello world');
// });

// var server = app.listen(CONFIG.PORT, function () {
//   console.log('Server listening on port', server.address().port);
// });

bot.connect();