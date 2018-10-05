const express = require('express');
const router = express.Router();

const User = require('../models/user').User;

router.post('/', (req, res, next) => {
  if (!req.session.user) {
    res.statusCode = 203;
    res.send("You have to register and verify to saving song's notes.");
    return;
  }

  if (req.session.user !== req.body.user) {
    res.statusCode = 203;
    res.send("You can not save songs of another users.");
    return;
  }

  User.findOne({ login: req.session.user }, function (err, user) {
    if (err) return next(err);

    if (!user) {
      res.statusCode = 203;
      res.send("It's mistake! Your login is not register in our database.");
      return;
    }

    let song = null;

    for (let userSong of user.songs) {
      if (userSong.songId === req.body.songId) {
        song = userSong;
      }
    }

    if (!song) {
      res.statusCode = 203;
      res.send('This song has not already created.');
      return;
    }

    song.size = req.body.size;
    song.speed = req.body.speed;
    song.notes = req.body.notes;

    user.save(function (err) {
      if (err) {
        res.statusCode = 203;
        res.send("Error in updating data!");
        return;
      }

      res.statusCode = 200;
      res.send(`Ok!`);
    });
  })
});

module.exports = router;