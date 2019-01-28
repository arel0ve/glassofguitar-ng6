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

router.post('/', upload.array('fileUploaded', 1), postAvatar);

function postAvatar(req, res, next) {
  res.status(200).json({
    status: 'ok',
    message: 'Saving successful'
  });
}

module.exports = router;
