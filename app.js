var express = require('express');
var app = express();

//var settings = require('./settings');

app.use(express.static('public'));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());

var data = {};
var dataOnce = {};

app.post('/api', function (req, res) {
  var key = Math.floor(Math.random()*1000);
  data[key] = req.body.message;
  res.send(key.toString());
});

app.post('/api/once', function (req, res) {
  var key = Math.floor(Math.random()*1000);
  dataOnce[key] = req.body.message;
  res.send(key.toString());
});

app.get('/api/:key', function(req, res) {
  var key = req.params.key;
  if (data[key]) {
    res.send(data[key]);
  } else if (dataOnce[key]) {
    res.send(dataOnce[key]);
    delete dataOnce[key];
  } else {
    res.send("error");
  }
});

app.listen(1244, function () {
  console.log('Example app listening');
});

module.exports = app;
