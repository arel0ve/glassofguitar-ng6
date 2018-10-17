const express = require('express');
const router = express.Router();

const User = require('../models/user').User;

router.get('/', (req, res, next) => {

  let userLogin = req.params.id || req.session.user;
  User.findOne({ login: userLogin }, function(err, user) {
      if (err) {
        res.statusCode = 501;
        res.send("Error! Server Error!");
        return;
      }

      if (!user) {
        res.statusCode = 403;
        res.send(JSON.stringify({
          tag: "",
          name: userLogin,
          photo: "../../../assets/photos/no-photo.png"
        }));
        return;
      }

      let photo = (!user.photo || user.photo === "") ? "../../../assets/photos/no-photo.png" :
          `../../../assets/photos/users/${user.photo}`;

      if (!req.session.user || req.session.user !== userLogin) {
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
