const express = require('express');
const router = express.Router();

const admin = require('firebase-admin');

const User = require('../models/user').User;
const Song = require('../models/song').Song;

router.get(['/:artist/:song', '/:artist/:title/:version'] , getSong);
router.post('/', addSong);
router.put('/', saveSong);

async function getSong(req, res, next) {
  try{
    let version = !!req.params.version ? req.params.version : 0;
    let song = await Song.findOne({artist: req.params.artist, title: req.params.title, version})
        .populate('author', 'login name photoUrl hatColor -_id');

    if (!song) {
      res.status(203).json(
          {
            status: 'default',
            song: {
              artist: 'Ludwig van Beethoven',
              title: 'Für Elise',
              version: 0,
              views: null,
              plays: null,
              likes: null,
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
                date: Date.now(),
                photoUrl: null
              }
            }
          }
      );
      return;
    }

    song.views += 1;
    await song.save();

    res.status(200).json({
      status: "ok",
      song
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: "error",
      message: "server_error"
    });
  }
}

async function addSong(req, res, next) {
  if (!req.headers.token) {
    res.status(403).json({
      status: 'error',
      message: 'have_not_token'
    });
    return;
  }

  const decodedToken = await admin.auth().verifyIdToken(req.headers.token);
  if (!decodedToken || !decodedToken.uid) {
    res.status(403).json({
      status: 'error',
      message: 'wrong_token'
    });
    return;
  }

  try {
    const uid = decodedToken.uid;

    let user = await User.findOne({ uid }).populate('_id');

    let sameSongs = await Song.find({ artist: req.body.artist, title: req.body.title }).populate('_id');

    let song = new Song({
      artist: req.body.artist,
      title: req.body.title,
      version: sameSongs.length,
      author: user._id
    });

    song = await song.save();

    res.status(200).json({
      status: 'ok',
      url: `${song.artist}/${song.title}/${song.version}`
    })
  } catch(e) {
    console.log(e);
    res.status(500).json({
      status: "error",
      message: "server_error"
    });
  }
}

async function saveSong(req, res, next) {
  if (!req.headers.token) {
    res.status(403).json({
      status: 'error',
      message: 'have_not_token'
    });
    return;
  }

  const decodedToken = await admin.auth().verifyIdToken(req.headers.token);
  if (!decodedToken || !decodedToken.uid) {
    res.status(403).json({
      status: 'error',
      message: 'wrong_token'
    });
    return;
  }

  try {
    const uid = decodedToken.uid;
    let song = await Song.findById(req.body.songId)
        .populate('author', 'uid');

    if (!song) {
      res.status(404).json({
        status: 'error',
        message: 'song_has_not_already_created'
      });
      return;
    }

    if (!song.author.uid !== uid) {
      res.status(403).json({
        status: 'error',
        message: 'wrong_rights'
      });
      return;
    }

    song.size = req.body.size ? req.body.size : song.size;
    song.speed = req.body.speed ? req.body.speed : song.speed;
    song.notes = req.body.notes ? req.body.notes : song.notes;

    song.author = song.author._id;

    await song.save();

    res.status(200).json({
      status: "ok",
      message: "saving_successful"
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: "error",
      message: "server_error"
    });
  }
}

module.exports = router;
