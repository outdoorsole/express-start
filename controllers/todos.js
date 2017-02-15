var Todo = require('../models/todo.js');

module.exports = function(app) {

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

}