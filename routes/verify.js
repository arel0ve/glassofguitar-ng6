const express = require('express');
const router = express.Router();

const User = require('../models/user').User;

/* POST registration. */
router.post('/', (req, res, next) => {

  User.findOne({ login: req.body.login }, function(err, user) {
    if (err) return next(err);

    if (!user) {
      res.statusCode = 403;
      res.send(`Error! User '${req.body.login}' is not founded!`);
      return;
    }

    if (!user.checkPassword(req.body.password)) {
      res.statusCode = 202;
      res.send(`Error! Password is wrong!`);
      return;
    }

    if (req.body.verifyCode !== user.verifyCode) {
      res.statusCode = 203;
      res.send(`Error! Verify code is wrong!`);
      return;
    }

    user.isVerify = true;
    user.save(function (err) {
      if (err) {
        res.statusCode = 501;
        res.send("Error! Error in updating data! Please press 'Verify' again.");
        return;
      }

      req.session.user = user.login;

      res.statusCode = 200;
      res.send(user.login);
    });
  });

});

module.exports = router;
