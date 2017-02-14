$(document).ready(function() {

  function checkAuth() {
    $.get('/current-user', function (data) {
      if (data.user) {
        $('.not-logged-in').hide();
        $('.logged-in').show();        
      } else {
        $('.not-logged-in').show();
        $('.logged-in').hide();        
      }
    })
  }

  checkAuth();

  $('#signup-form').submit(function(e) {
    e.preventDefault();
    var user = $(this).serialize();

    $.post('/users', user, function (data) {
      $('.not-logged-in').hide();
      console.log(data);
      $('.logged-in').show();
    });
  });

  $('#logout').click(function(e) {
    e.preventDefault();
    $.get('/logout', function(data) {
      console.log(data.msg);
      $('.not-logged-in').show();
      $('.logged-in').hide();
    })
  });
});