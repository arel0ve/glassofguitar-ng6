const express = require('express');
const router = express.Router();

const User = require('../models/user').User;

// router.get('/:login', getUserByLogin);
router.post('/', postUserLogin);

async function postUserLogin(req, res, next) {
  if (!req.body.token) {
    res.status(400).json({
      status: 'err',
      reason: 'You have not token'
    });
    return;
  }

  if (!req.body.login) {
    res.status(402).json({
      status: 'err',
      reason: 'You have not login'
    });
    return;
  }

  const decodedToken = await admin.auth().verifyIdToken(req.body.token);
  if (!decodedToken || !decodedToken.uid) {
    res.status(403).json({
      status: 'err',
      reason: 'Wrong token'
    });
    return;
  }
  const uid = decodedToken.uid;

  let user = await User.findOne({ uid });

  if (!user) {
    res.status(403).json({
      status: 'Your uid is not registered',
    });
    return;
  }

  let userWithChooseLogin = await User.findOne({ login: req.body.login });

  if (userWithChooseLogin) {
    res.status(402).json({
      status: 'This username has already exists',
    });
    return;
  }

  user.login = req.body.login;
  user.name = req.body.name ? req.body.name : req.body.login;

  user = await user.save();

  res.status(200).json({
    status: 'ok',
    login: user.login,
    name: user.name,
    uToken: req.body.token
  });
}

module.exports = router;
