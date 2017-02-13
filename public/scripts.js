console.log("I live to serve");

// waiting for the DOM to load
$(document).ready(function() {

  // select the form by the id
  $('#new-todo').submit(function (e) {
    // do not do a page refresh
    e.preventDefault();

    // serialize (takes name & value of input) for new todo form
    var todo = $(this).serialize();

    // use serialized object from above to pass to post method
    $.post('/todos', todo, function (data) {
      console.log(data)
      $('#todo-list').append(
        "<li class='list-group-item'>" + 
        "<a href='/todos/" + data._id + "'>" + data.body + "</a>" +
        "<div class='remove-todo pull-right' data-id'" + data._id + "'><i class='icon ion-ios-trash-outline'></i></div>" + 
        "</li>");
      $('#new-todo')[0].reset();
    })
  });

  $('#todo-list').on('click', '.remove-todo', function (e) {
    e.preventDefault();

    var todo = $(this);
    var todoId = $(this).data('id');

    console.log(todoId);

    $.ajax({
      url: '/todos/' + todoId,
      type: 'DELETE',
      success: function(data) {
        todo.parent().remove();
      }
    })
  });
});