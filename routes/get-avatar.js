const express = require('express');
const router = express.Router();

const User = require('../models/user').User;

router.get('/', getAvatar);

async function getAvatar(req, res, next) {
  try {
    let userLogin = req.params.id || req.session.user;
    let user = await User.findOne({ login: userLogin })
        .select('tag name photo -_id');

    if (!user) {
      res.status(403).json({
        tag: "",
        name: userLogin,
        photo: "../../../assets/photos/no-photo.png"
      });
      return;
    }

    let photo = (!user.photo || user.photo === "") ? "../../../assets/photos/no-photo.png" :
        `../../../assets/photos/users/${user.photo}`;

    if (!req.session.user || req.session.user !== userLogin) {
      res.status(203).json({
        tag: user.tag,
        name: user.name,
        photo: photo
      });
      return;
    }

    res.status(200).json({
      tag: user.tag,
      name: user.name,
      photo: photo
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("Server Error!");
  }
}

module.exports = router;
