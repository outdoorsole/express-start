// NODE MODULES
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');

// INSTANCE
var app = express();

// MIDDLEWARE
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// send static files
app.use(express.static('public'));

// set session options
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'SuperSecretCookie',
  cookie: { maxAge: 600000 }
}));

// connect mongoose to MongoDB
mongoose.connect('mongodb://localhost/express-start');

// CONTROLLERS
require('./controllers/todos')(app);
require('./controllers/users')(app);

// Starts a server and listens on port 3000 for connections.
app.listen(3000, function() {
  console.log('I\'m Alive!');
})