// NODE MODULES
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

// INSTANCE
var app = express();

// MIDDLEWARE
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// DATA
var todos = [
  { body: "take out the trash", completed: false },
  { body: "do the laundry", completed: true },
  { body: "make a screencast", completed: false }
];

// CORE ROUTES
// 1) TODOS INDEX: Requests to root URL (/) or route.
app.get('/', function (req, res) {
  res.render('home', { todos: todos });
});

// TODOS SHOW
app.get('/todos/:id', function(req, res) {
  var todo = todos[req.params.id]
  res.render('todo-show', { todo: todo });
});

// TODOS CREATE
app.post('/todos', function(req, res) {
  console.log('This is req.body: ', req.body);
  var todo = req.body;
  todos.push(todo);
  res.status(200).json(todo);
});

// TODOS DELETE
// TODOS UPDATE
// TODOS EDIT
// TODOS NEW

// Starts a server and listens on port 3000 for connections.
app.listen(3000, function() {
  console.log('I\'m Alive!');
})