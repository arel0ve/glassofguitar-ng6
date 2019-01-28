const express = require('express');
const router = express.Router();

const admin = require('firebase-admin');

const serviceAccount = require('../bin/serviceAccountKey');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://glass-of-guitar.firebaseio.com"
});

const User = require('../models/user').User;

router.post('/', login);

async function login(req, res, next) {

  if (!req.body.token) {
    res.status(400).json({
      status: 'error',
      message: 'You have not token'
    });
    return;
  }

  const decodedToken = await admin.auth().verifyIdToken(req.body.token);
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
    let newUser = new User({
      uid: uid,
      email: req.body.email,
      phone: req.body.phone,
      name: req.body.name,
      photoUrl: req.body.photoUrl
    });

    await newUser.save();
    res.status(200).json({
      status: 'ok',
      login: '',
      name: '',
      uToken: req.body.token
    });
    return;
  }

  res.status(200).json({
    status: 'ok',
    login: user.login,
    name: user.name ? user.name : user.login,
    uToken: req.body.token
  });
}

module.exports = router;
