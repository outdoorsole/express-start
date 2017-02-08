// NODE MODULE
var express = require('express');

// INSTANCE
var app = express();

// Requests to the root URL (/) or route.
app.get('/', function(req, res) {
  res.send('Hello World!');
});

// Starts a server and listens on port 3000 for connections.
app.listen(3000, function() {
  console.log('Example app listening on port 3000');
})