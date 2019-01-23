const express = require('express');
const router = express.Router();
const fs = require('fs-extra');
const path = require('path');

const User = require('../models/user').User;

router.post('/', postAvatar);

async function postAvatar(req, res, next) {
  if (!req.session.user) {
    res.status(403).send("To changing picture you should be registered.");
    return;
  }

  let user = await User.findOne({ login: req.session.user });

  if (!user) {
    res.status(403).send("It's mistake! Your login is not register in our database.");
    return;
  }

  req.busboy.on('file', function (fieldname, file, filename) {
    console.log("Uploading: " + filename);

    let numberPhoto;

    if (!user.photo || user.photo === "") {
      numberPhoto = 0;
    } else {
      numberPhoto = user.numberPhoto;
    }

    filename = user.login + numberPhoto + ".png";

    let filePath = path.join(__dirname, "../front-ng/dist/assets/photos/users/");
    let fstream = fs.createWriteStream(filePath + filename);
    file.pipe(fstream);

    fstream.on('error', function () {
      res.status(501).send("Error in saving file");
    });

    fstream.on('close', function () {

      if (numberPhoto !== 0) {
        let oldFilename = user.login + (numberPhoto - 1) + ".png";
        let filePath = path.join(__dirname, "../front-ng/dist/assets/photos/users/");
        fs.remove(filePath + oldFilename, err => {
          if (err) return next(err);

          user.numberPhoto++;
          user.photo = filename;
          user.save(function (err) {
            if (err) {
              res.status(501).send("Error in updating data! Please, upload avatar again.");
              return;
            }

            res.status(200).send("Ok!");
          });

        });
      } else {
        user.numberPhoto = 1;
        user.photo = filename;
        user.save(function (err) {
          if (err) {
            res.status(501).send("Error in updating data! Please upload avatar again.");
            return;
          }

          res.status(200).send("Ok!");
        });

      }

    });
  });

  return req.pipe(req.busboy);
}

module.exports = router;
