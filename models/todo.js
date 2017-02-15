var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  body: String,
  completed: Boolean
});

var Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;