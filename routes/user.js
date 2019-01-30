const express = require('express');
const router = express.Router();

const User = require('../models/user').User;
const Song = require('../models/song').Song;

const admin = require('firebase-admin');

router.post('/', postUserLogin);
router.put('/:login', putUserName);
router.get('/:login', getUserData);

async function postUserLogin(req, res, next) {
  if (!req.headers.token) {
    res.status(403).json({
      status: 'error',
      message: 'Missing token'
    });
    return;
  }

  if (!req.body.login) {
    res.status(402).json({
      status: 'error',
      message: 'Missing login'
    });
    return;
  }

  const decodedToken = await admin.auth().verifyIdToken(req.headers.token);
  if (!decodedToken || !decodedToken.uid) {
    res.status(403).json({
      status: 'error',
      message: 'Wrong token'
    });
    return;
  }
  const uid = decodedToken.uid;

  let user = await User.findOne({ uid });

  if (!user) {
    res.status(403).json({
      status: 'error',
      message: 'Uid is not registered'
    });
    return;
  }

  let userWithChooseLogin = await User.findOne({ login: req.body.login });

  if (userWithChooseLogin) {
    res.status(402).json({
      status: 'error',
      message: 'Username has already exists'
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
    uToken: req.headers.token
  });
}

async function putUserName(req, res, next) {
  if (!req.headers.token) {
    res.status(403).json({
      status: 'error',
      message: 'Missing token'
    });
    return;
  }

  if (!req.params.login) {
    res.status(403).json({
      status: 'error',
      message: 'Missing login'
    });
    return;
  }

  const decodedToken = await admin.auth().verifyIdToken(req.headers.token);
  if (!decodedToken || !decodedToken.uid) {
    res.status(403).json({
      status: 'error',
      message: 'Wrong token'
    });
    return;
  }
  const uid = decodedToken.uid;

  let user = await User.findOne({ uid });

  if (!user) {
    res.status(403).json({
      status: 'error',
      message: 'Uid is not registered'
    });
    return;
  }

  user.login = req.params.login;
  user.name = req.body.name ? req.body.name : req.params.login;

  user = await user.save();

  res.status(200).json({
    status: 'ok',
    login: user.login,
    name: user.name,
    uToken: req.headers.token
  });
}

async function getUserData(req, res, next) {

  let user = await User.findOne({ login: req.params.login });

  if (!user) {
    res.status(404).json({
      status: 'error',
      message: 'Login is not found'
    });
    return;
  }

  let songs = await Song.find({ author: user._id });

  res.status(200).json({
    status: 'ok',
    user: {
      login: user.login,
      name: user.name,
      created: user.created,
    },
    songs
  });
}



module.exports = router;
