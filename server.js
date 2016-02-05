var express = require('express');
var CONFIG = require('./config');

var app = express();

var server = app.listen(CONFIG.PORT, function () {
  console.log('Server listening on port', server.address().port);
});