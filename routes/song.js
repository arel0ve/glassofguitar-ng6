const express = require('express');
const router = express.Router();

const User = require('../models/user').User;
const Song = require('../models/song').Song;

router.get(['/:artist/:song', '/:artist/:song/:version'] , getSong);
router.post('/', addSong);
router.put('/', saveSong);

async function getSong(req, res, next) {
  try{
    let version = !!req.params.version ? req.params.version : 0;
    let song = await Song.findOne({artist: req.params.artist, song: req.params.song, version})
        .populate('author', 'login name photoUrl hatColor -_id');

    if (!song) {
      res.status(203).json(
          {
            artist: 'Ludwig van Beethoven',
            title: 'Für Elise',
            version: 0,
            views: -1,
            plays: -1,
            likes: -1,
            size: '3/8',
            speed: '63',
            notes: [
              '------','------','------','------','-----0','----4-',
              '-----0','----4-','-----0','----0-','----3-','----1-',
              '---2--','------','------','-3----','--2---','---2--',
              '----0-','------','------','--2---','---1--','----0-',
              '----1-','------','------','--2---','-----0','----4-',
              '-----0','----4-','-----0','----0-','----3-','----1-',
              '---2--','------','------','-3----','--2---','---2--',
              '----0-','------','------','--2---','----1-','----0-',
              '---2--','------','------','----0-','----1-','----3-',
              '-----0','------','------','---0--','-----1','-----0',
              '----3-','------','------','--3---','-----0','----3-',
              '----1-','------','------','--2---','----3-','----1-',
              '---0--','------','------','--2---','-----0','----4-',
              '-----0','----4-','-----0','----0-','----3-','----1-',
              '---2--','------','------','-3----','--2---','---2--',
              '----0-','------','------','--2---','----1-','----0-',
              '---2--','------','------','------','------','------'
            ],
            author: {
              hatColor: '#51907F',
              name: "Valerii Psol",
              date: Date.now()
            }
          }
      );
      return;
    }

    res.status(200).json(song);
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: "Server error"
    });
  }
}

async function addSong(req, res, next) {
  if (!req.session.user) {
    res.status(403).send("You have to register and verify to create new song.");
    return;
  }

  try {
    let user = await User.findById(req.session.user);

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
