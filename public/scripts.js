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
      $('.todo-list').append("<li>" + data.body + "</li>");
      $('#new-todo')[0].reset();
    })
  });

});