const express = require('express');
const router = express.Router();

const User = require('../models/user').User;
const Melody = require('../models/song').Melody;

router.post('/', addSong);

async function addSong(req, res, next) {
  if (!req.session.user) {
    res.status(403).send("You have to register and verify to create new song.");
    return;
  }

  try {
    let user = await User.findOne({ login: req.session.user });

    if (!user) {
      res.status(404).send("Your login is not register in our database.");
      return;
    }

    for (let song of user.songs) {
      if (song.artist === req.body.artist && song.title === req.body.title) {
        res.status(402).send(`Song "${req.body.artist} - ${req.body.title}" has already been created.`);
        return;
      }
    }

    let song = new Melody({
      artist: req.body.artist,
      title: req.body.title,
      author: user.login
    });

    song = await song.save();

    user.songs.push(song._id);

    await user.save();

    res.status(200).send(`${user.login}/${song._id}`);
  } catch(e) {
    console.log(e);
    res.status(500).send(`Error in updating data! Please try press 'Create Song' again later.`)
  }
}

module.exports = router;
