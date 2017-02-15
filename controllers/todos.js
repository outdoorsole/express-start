var Todo = require('../models/todo.js');

module.exports = function(app) {

  // CORE ROUTES
// 1) TODOS INDEX: Requests to root URL (/) or route.
app.get('/', function (req, res) {
  if (req.session.user) {
      Todo.find({ user: req.session.user._id }).exec(function (err, todos) {
        if (err) { console.log("there was an err: ", err )}
        res.render('home', { todos: todos });
    })
  } else {
    res.render('splash');
  }
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
  // save the todo for the logged in user
  todo.user = req.session.user._id;

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