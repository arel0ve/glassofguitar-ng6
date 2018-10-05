const express = require('express');
const router = express.Router();

const User = require('../models/user').User;

router.post('/', (req, res, next) => {

    User.findOne({ login: req.body.user }, function(err, user) {
      if (err) return next(err);

      if (!user) {
        res.statusCode = 403;
        res.send(JSON.stringify({
          tag: "",
          name: req.body.user,
          photo: "../images/no-photo.png"
        }));
        return;
      }

      let photo = (!user.photo || user.photo === "") ? "../images/no-photo.png" :
          `../images/users/${user.photo}`;


      if (!req.session.user ||req.session.user !== req.body.user) {
        res.statusCode = 203;

        res.send(JSON.stringify({
          tag: user.tag,
          name: user.name,
          photo: photo
        }));
        return;
      }

      res.statusCode = 200;
      res.send(JSON.stringify({
        tag: user.tag,
        name: user.name,
        photo: photo
      }));
    });

});

module.exports = router;