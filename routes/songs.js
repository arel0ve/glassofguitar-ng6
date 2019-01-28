const express = require('express');
const router = express.Router();

const Song = require('../models/song').Song;

router.get('/artist/:artist', getSongsByArtist);
router.get('/title/:artist/:title', getSongsByTitle);
router.get('/most-popularity', getMostPopularitySongs);

async function getSongsByArtist(req, res, next) {
  try {
    if (!req.params.artist) {
      res.status(402).json({
        status: "error",
        message: "There are not artist in request"
      });
      return;
    }

    let songs = await Song.find({ artist: req.params.artist })
        .sort('-views');

    res.status(200).json({
      status: 'ok',
      songs
    });

  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: "error",
      message: "Server error"
    });
  }
}

async function getSongsByTitle(req, res, next) {
  try {
    if (!req.params.artist || !req.params.title) {
      res.status(402).json({
        status: "error",
        message: "There are not artist or title in request"
      });
      return;
    }

    let songs = await Song.find({ artist: req.params.artist, title: req.params.title })
        .sort('-views');

    res.status(200).json({
      status: 'ok',
      songs
    });

  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: "error",
      message: "Server error"
    });
  }
}

async function getMostPopularitySongs(req, res, next) {
  try {
    let songs = await Song.find({})
        .sort('-views').limit(50);

    res.status(200).json({
      status: 'ok',
      songs
    });

  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: "error",
      message: "Server error"
    });
  }
}


module.exports = router;
