var express = require('express');
var app = express();

//var settings = require('./settings');

app.use(express.static('public'));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());

var data = {};

app.post('/api', function (req, res) {
  var key = Math.floor(Math.random()*1000);
  data[key] = req.body.message;
  res.send(key.toString());
});

app.get('/api/:key', function(req, res) {
  var key = req.params.key;
  if (data[key]) {
    res.send(data[key]);
  } else {
    res.send("error");
  }
});

app.listen(1245, function () {
  console.log('Example app listening');
});

module.exports = app;
