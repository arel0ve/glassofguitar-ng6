const express = require('express');
const router = express.Router();
const fs = require('fs-extra');
const path = require('path');

const admin = require('firebase-admin');

const multer = require('multer');
const multerS3 = require('multer-s3');

const AWS = require('aws-sdk');

AWS.config.update({
  secretAccessKey: 'Mr1JDAx/ql+wObd1ifhqLn89ZtEqenjLJZC8bPxc',
  accessKeyId: 'AKIAJO2XWUY4J5CVIPPQ',
  region: 'us-east-1'
});

const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'glassof-guitar',
    acl: 'public-read-write',
    key: async function (req, file, cb) {

      // if (!req.body.token) {
      //   return 403;
      // }
      //
      // if (!req.body.login) {
      //   return 402;
      // }
      //
      // const decodedToken = await admin.auth().verifyIdToken(req.body.token);
      // if (!decodedToken || !decodedToken.uid) {
      //   return 403;
      // }
      // const uid = decodedToken.uid;
      //
      // let user = await User.findOne({ uid });
      //
      // if (!user) {
      //   return 404;
      // }

      let name = Date.now().toString();

      // user.photoUrl = `https://s3.amazonaws.com/glassof-guitar/${name}`;
      // await user.save();

      cb(null, name);
    }
  })
});

const User = require('../models/user').User;

router.post('/:login', upload.array('fileUploaded', 1), postAvatar);
router.get('/:login', getAvatar);

function postAvatar(req, res, next) {
  res.status(200).json({
    status: 'ok',
    message: 'Saving successful'
  });
}

async function getAvatar(req, res, next) {
  try {
    if (!req.params.login) {
      res.status(402).json({
        status: 'error',
        message: 'Missing login'
      });
      return;
    }

    const user = await User.findOne({ login: req.params.login });

    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
      return;
    }

    if (!req.headers.token) {
      res.status(203).json({
        photoUrl: user.photoUrl,
        login: user.login,
        status: 'warning',
        message: 'Not authenticated'
      });
      return;
    }

    const decodedToken = await admin.auth().verifyIdToken(req.headers.token);
    if (!decodedToken || !decodedToken.uid) {
      res.status(203).json({
        photoUrl: user.photoUrl,
        login: user.login,
        status: 'warning',
        message: 'Wrong token'
      });
      return;
    }

    if (decodedToken.uid !== user.uid) {
      res.status(203).json({
        photoUrl: user.photoUrl,
        login: user.login,
        status: 'warning',
        message: 'Another user'
      });
      return;
    }

    res.status(200).json({
      photoUrl: user.photoUrl,
      login: user.login,
      status: 'ok',
      message: 'Current user'
    });

  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: "error",
      message: "Server error"
    });
  }
}

module.exports = router;
