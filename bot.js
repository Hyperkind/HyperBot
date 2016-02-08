// var express = require('express');
var CONFIG = require('./config');
var IRC = require('irc');

// var app = express();

var bot = new IRC.Client(CONFIG.SERVER, CONFIG.USERNAME,
  {
    channels : CONFIG.CHANNELS,
    debug : false,
    password : CONFIG.PASSWORD,
    username : CONFIG.USERNAME
  });

// Confirms that the bot has connected to the channel
bot.addListener('join', function (channel, who) {
  if (who === CONFIG.USERNAME) {
    console.log(who + ' has joined on channel ' + channel);
  } else {
    console.log(who + ' has joined on channel ' + channel);
    var greetMsg = 'Welcome to the channel ';
    bot.say(CONFIG.CHANNELS[0], greetMsg + who);
  }
});

bot.addListener('part', function (channel, message, who) {
  console.log(who + ' left the chat!');
  var leaveMsg = 'Take it easy, ' + who + '!';
  bot.say(CONFIG.CHANNELS, leaveMsg);
});

// listens for messages to the channel and displays in terminal
bot.addListener('message', function (from, to, message) {
    console.log(from + ' => ' + to + ': ' + message);
});

// !hello command
bot.addListener('message', function (from, to, message) {
  if (message === '!hello') {
    var helloMsg = "Is it me you're looking for?";
    bot.say(CONFIG.CHANNELS[0], helloMsg);
  }
});