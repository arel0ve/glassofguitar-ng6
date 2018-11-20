const express = require('express');
const router = express.Router();

const User = require('../models/user').User;

router.post('/', login);

async function login(req, res, next) {
  let user = await User.findOne({ login: req.body.login });

  if (!user) {
    res.status(403).send(`User '${req.body.login}' is not founded!`);
    return;
  }

  if (!user.checkPassword(req.body.password)) {
    res.status(402).send("Password is wrong!");
    return;
  }

  if (!user.isVerify) {
    res.status(403).send(`Your email (${user.email}) is not verified.<br>
          Please, input verifying code from your email.`);
    return;
  }

  req.session.user = user.login;
  res.status(200).send(user.login);
}

module.exports = router;
