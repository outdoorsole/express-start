// MODEL
var User = require('../models/user.js');

module.exports = function(app) {

  // 1) SIGNUP ROUTE
  app.get('/signup', function (req, res) {
    res.render('signup');
  });

  // 2) LOGIN/LOGOUT ROUTES
  app.get('/login', function (req, res) {
    res.render('login');
  });

  app.post('/login', function (req, res) {
    var user = req.body;
    User.authenticate(user.email, user.password, function (err, user) {
      if (err) { console.log("there was an err: ", err )}
      // if logged in, set session user
      req.session.user = user;
      res.json(user);
    })
  });

  app.get('/logout', function (req, res) {
    req.session.user = null;

    res.json({ msg: "User logged out successfully!" });
  });

  // 3) USER ROUTES
  app.post('/users', function (req, res) {
    var user = req.body;
    User.createSecure(user.email, user.password, function (err, user) {
      req.session.user = user;
      res.json({ user: user, msg: "User created successfully!" });
    });
  });

  app.get('/current-user', function (req, res) {
    res.json({ user: req.session.user });
  });
}