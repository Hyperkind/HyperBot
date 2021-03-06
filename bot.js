var IRC = require('irc');

// Requires in config file
var CONFIG = require('./config');

// Requires in quote JSON file
var QUOTE = require('./quote');
// var pullQuote = JSON.parse(QUOTE);

var bot = new IRC.Client(CONFIG.SERVER, CONFIG.USERNAME,
  {
    username :  CONFIG.USERNAME,
    password :  CONFIG.PASSWORD,
    port     :  CONFIG.PORT,
    debug    :  false,
    channels :  CONFIG.CHANNELS
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

// !quote command pulls from quote.json
bot.addListener('message', function (from, to, message) {
  if (message === '!quote') {
    var quoteMax = Object.keys(QUOTE.QUOTES).length;
    var quoteSelector = Math.floor((Math.random() * quoteMax) + 1);
    console.log(quoteSelector);
    bot.say(CONFIG.CHANNELS[0], QUOTE.QUOTES[quoteSelector]);
  }
});