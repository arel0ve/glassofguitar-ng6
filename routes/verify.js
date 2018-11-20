const express = require('express');
const router = express.Router();

const User = require('../models/user').User;

/* POST verify. */
router.post('/', verify);

async function verify(req, res, next) {

  try {
    let user = await User.findOne({ login: req.body.login });

    if (!user) {
      res.status(403).send(`User '${req.body.login}' is not founded!`);
      return;
    }

    if (!user.checkPassword(req.body.password)) {
      res.status(402).send(`Password is wrong!`);
      return;
    }

    if (req.body.verifyCode !== user.verifyCode) {
      res.status(403).send(`Verify code is wrong!`);
      return;
    }

    user.isVerify = true;

    await user.save();

    req.session.user = user.login;
    res.status(200).send(user.login);
  } catch (e) {
    console.log(e);
    res.status(500).send("Server Error!.");
    return;
  }
}

module.exports = router;
