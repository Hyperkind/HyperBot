var express = require('express');
var CONFIG = require('./config');
var IRC = require('irc');

// var app = express();

var bot = new IRC.Client(CONFIG.SERVER, CONFIG.USERNAME,
  {
    channels : [CONFIG.CHANNELS],
    debug : false,
    password : CONFIG.PASSWORD,
    username : CONFIG.USERNAME
  });

bot.addListener('join', function (channel, who) {
  if(who == CONFIG.USERNAME){
    console.log(who + ' recognized as joined.');
  } else {
    console.log(who + ' joined the chat!');
    var joinMes = 'Welcome to the channel, ' + who + '!';
    bot.say(CONFIG.CHANNELS[0], joinMes);
  }
});

bot.addListener('part', function (channel, who) {
  console.log(who + ' left the chat!');
  var leaveMes = 'Take it easy, ' + who + '!';
  bot.say(CONFIG.CHANNELS[0], leaveMes);
});

// listens for messages to the channel and displays in terminal
bot.addListener('message', function (from, to, message) {
    console.log(from + ' => ' + to + ': ' + message);
});

bot.connect();