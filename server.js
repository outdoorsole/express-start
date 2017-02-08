// NODE MODULE
var express = require('express');
var exphbs = require('express-handlebars');

// INSTANCE
var app = express();

// MIDDLEWARE
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Requests to the root URL (/) or route.
app.get('/', function (req, res) {
  res.render('home');
});

app.get('/todos', function(req, res) {
  var todos = [
    { body: "take out the trash", completed: false },
    { body: "do the laundry", completed: true }
  ]
  res.json(todos);
});

// Starts a server and listens on port 3000 for connections.
app.listen(3000, function() {
  console.log('Example app listening on port 3000');
})