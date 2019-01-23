const express = require('express');
const router = express.Router();

const admin = require('firebase-admin');

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
  if (!req.body.token) {
    res.status(403).send("You do not have a token.");
    return;
  }

  const decodedToken = await admin.auth().verifyIdToken(req.body.token);
  if (!decodedToken || !decodedToken.uid) {
    res.status(403).json({
      status: 'err',
      reason: 'Wrong token'
    });
    return;
  }

  try {
    const uid = decodedToken.uid;

    let user = await User.findOne({ uid }).populate('_id');

    let sameSongs = await Song.find({ artist: req.body.artist, title: req.body.song }).populate('_id');

    let song = new Song({
      artist: req.body.artist,
      title: req.body.song,
      version: sameSongs.length,
      author: user._id
    });

    song = await song.save();

    res.status(200).send(`${song.artist}/${song.title}/${song.version}`);
  } catch(e) {
    console.log(e);
    res.status(500).send(`Error in updating data! Please try press 'Create Song' again later.`)
  }
}

async function saveSong(req, res, next) {
  if (!req.body.token) {
    res.status(403).send("You do not have a token.");
    return;
  }

  const decodedToken = await admin.auth().verifyIdToken(req.body.token);
  if (!decodedToken || !decodedToken.uid) {
    res.status(403).json({
      status: 'err',
      reason: 'Wrong token'
    });
    return;
  }

  try {
    const uid = decodedToken.uid;
    let user = await Song.findById(req.body.songId)
        .populate('author', 'uid');

    if (!user) {
      res.status(404).send("This song has not already created.");
      return;
    }

    if (!user.author.uid !== uid) {
      res.status(404).send("You can not edit songs which have created by another user.");
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
