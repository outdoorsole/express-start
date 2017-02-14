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

// MODELS
var Todo = require('./models/todo.js');
var User = require('./models/user.js');

app.get('/signup', function (req, res) {
  res.render('signup');
});

app.get('/login', function (req, res) {
  res.render('login');
});

app.get('/logout', function (req, res) {
  req.session.userId = null;
  req.session.user = null;

  res.json({ msg: "User logged out successfully!" });
});

app.post('/users', function (req, res) {
  var user = req.body;
  User.createSecure(user.email, user.password, function (err, user) {
    req.session.userId = user._id;
    req.session.user = user;
    res.json({ user: user, msg: "User created successfully!" });
  });
});

app.get('/current-user', function (req, res) {
  res.json({ user: req.session.user });
});

// CORE ROUTES
// 1) TODOS INDEX: Requests to root URL (/) or route.
app.get('/', function (req, res) {
  Todo.find().exec(function (err, todos) {
    res.render('home', { todos: todos });
  });
});

// 2) TODOS SHOW
app.get('/todos/:id', function(req, res) {
  Todo.findById(req.params.id).exec(function (err, todo) {
    res.render('todo-show', { todo: todo });
  });
});

// 3) TODOS CREATE
app.post('/todos', function(req, res) {
  var todo = req.body;
  Todo.create(todo, function(err, todo) {
    res.status(200).json(todo);
  })
});

// TODOS DELETE
app.delete('/todos/:id', function (req, res) {
  Todo.findById(req.params.id).exec(function (err, todo) {
    todo.remove();
    res.status(200).json({});
  });
});

// TODOS UPDATE
// TODOS EDIT
// TODOS NEW

// Starts a server and listens on port 3000 for connections.
app.listen(3000, function() {
  console.log('I\'m Alive!');
})