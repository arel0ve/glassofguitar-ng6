const express = require('express');
const router = express.Router();

const User = require('../models/user').User;

router.post('/', (req, res, next) => {
  User.findOne({ login: req.body.login }, function(err, user) {
    if (err) {
      res.statusCode = 500;
      res.send('Error! Server error! Please try again later.');
    }

    if (!user) {
      res.statusCode = 403;
      res.send(`Error! User '${req.body.login}' is not founded!`);
      return;
    }

    if (!user.checkPassword(req.body.password)) {
      res.statusCode = 202;
      res.send("Error! Password is wrong!");
      return;
    }

    if (!user.isVerify) {
      res.statusCode = 203;
      res.send(`Warning! Your email (${user.email}) is not verified.<br>
          Please, input verifying code from your email.`);
      return;
    }

    req.session.user = user.login;

    res.statusCode = 200;
    res.send(user.login);
  });
});

module.exports = router;
