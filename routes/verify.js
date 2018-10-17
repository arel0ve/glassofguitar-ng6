const express = require('express');
const router = express.Router();

const User = require('../models/user').User;

/* POST registration. */
router.post('/', (req, res, next) => {

  User.findOne({ login: req.body.login }, function(err, user) {
    if (err) {
      res.statusCode = 500;
      res.send('Server error! Please try again later.');
      return;
    }

    if (!user) {
      res.statusCode = 403;
      res.send(`User '${req.body.login}' is not founded!`);
      return;
    }

    if (!user.checkPassword(req.body.password)) {
      res.statusCode = 402;
      res.send(`Password is wrong!`);
      return;
    }

    if (req.body.verifyCode !== user.verifyCode) {
      res.statusCode = 403;
      res.send(`Verify code is wrong!`);
      return;
    }

    user.isVerify = true;
    user.save(function (err) {
      if (err) {
        res.statusCode = 501;
        res.send("Error in updating data! Please press 'Verify' again.");
        return;
      }

      req.session.user = user.login;

      res.statusCode = 200;
      res.send(user.login);
    });
  });

});

module.exports = router;
