const express = require('express');
const router = express.Router();
const fs = require('fs-extra');
const path = require('path');

const User = require('../models/user').User;

router.post('/', (req, res, next) => {

  if (!req.session.user) {
    res.statusCode = 403;
    res.send("To changing picture you should be registered.");
    return;
  }

  User.findOne({ login: req.session.user }, function(err, user) {
    if (err) return next(err);

    if (!user) {
      res.statusCode = 403;
      res.send("It's mistake! Your login is not register in our database.");
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

      let filePath = path.join(__dirname, "../front-ng/dist/angular-prj/assets/photos/users/");
      let fstream = fs.createWriteStream(filePath + filename);
      file.pipe(fstream);

      fstream.on('error', function () {
        res.statusCode = 501;
        res.send("Error in saving file");
      });

      fstream.on('close', function () {

        if (numberPhoto !== 0) {
          let oldFilename = user.login + (numberPhoto - 1) + ".png";
          let filePath = path.join(__dirname, "../front-ng/dist/angular-prj/assets/photos/users/");
          fs.remove(filePath + oldFilename, err => {
            if (err) return next(err);

            user.numberPhoto++;
            user.photo = filename;
            user.save(function (err) {
              if (err) {
                res.statusCode = 501;
                res.send("Error in updating data! Please upload avatar again.");
                return;
              }

              res.statusCode = 200;
              res.send("Ok!");
            });

          });
        } else {
          user.numberPhoto = 1;
          user.photo = filename;
          user.save(function (err) {
            if (err) {
              res.statusCode = 501;
              res.send("Error in updating data! Please upload avatar again.");
              return;
            }

            res.statusCode = 200;
            res.send("Ok!");
          });

        }

      });
    });

    return req.pipe(req.busboy);

  });

});

module.exports = router;
