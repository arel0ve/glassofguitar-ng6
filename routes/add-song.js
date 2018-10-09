const express = require('express');
const router = express.Router();

const User = require('../models/user').User;
const Song = require('../models/song').Song;

router.post('/', (req, res, next) => {
  if (!req.session.user) {
    res.statusCode = 403;
    res.send("Error! You have to register and verify to create new song.");
    return;
  }

  User.findOne({ login: req.session.user }, function (err, user) {
    if (err) {
      res.statusCode = 500;
      res.send('Error! Server error! Please try again later.');
      return;
    }

    if (!user) {
      res.statusCode = 404;
      res.send("Error! Your login is not register in our database.");
      return;
    }

    for (let song of user.songs) {
      if (song.artist === req.body.artist && song.title === req.body.title) {
        res.statusCode = 203;
        res.send(`Warning! Song "${req.body.artist} - ${req.body.title}" has already created.`);
        return;
      }
    }

    let song = new Song({
      songId: "" + user.songs.length,
      artist: req.body.artist,
      title: req.body.title,
      author: user.login
    });

    user.songs.push(song);

    user.save(function (err) {
      if (err) {
        res.statusCode = 501;
        res.send("Error! Error in updating data! Please press 'Create Song' again.");
        return;
      }

      res.statusCode = 200;
      res.send(`${user.login}/${"" + (user.songs.length - 1)}`);
    });
  })
});

module.exports = router;
