const express = require('express');
const router = express.Router();

const User = require('../models/user').User;

router.post('/', saveSong);

async function saveSong(req, res, next) {
  if (!req.session.user) {
    res.status(403).send("You have to register and verify to saving song's notes.");
    return;
  }
  if (req.session.user !== req.body.user) {
    res.status(403).send("You can not save songs of another users.");
    return;
  }

  try {
    let user = await User.findOne({ login: req.session.user })
        .populate('songs', 'artist title author size speed notes _id');

    if (!user) {
      res.status(404).send("It's mistake! Your login is not register in our database.");
      return;
    }

    let song = null;
    for (let userSong of user.songs) {
      console.log(userSong);
      if (userSong._id.toString() === req.body.songId) {
        song = userSong;
      }
    }
    if (!song) {
      res.status(403).send('This song has not already created.');
      return;
    }

    song.size = req.body.size ? req.body.size : song.size;
    song.speed = req.body.speed ? req.body.speed : song.speed;
    song.notes = req.body.notes ? req.body.notes : song.notes;

    await song.save();

    res.status(200).send(`Ok!`);
  } catch (e) {
    console.log(e);
    res.status(500).send("Server error");
  }
}

module.exports = router;
