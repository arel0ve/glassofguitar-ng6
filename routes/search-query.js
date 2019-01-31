const express = require('express');
const router = express.Router();

const Song = require('../models/song').Song;

/* POST search query. */
router.post('/', searchQuery);

async function searchQuery(req, res, next) {
  try {
    let reg = new RegExp(req.body.query, "i");

    let songs = await Song.find({}).or([{artist: reg}, {title: reg}])
        .select('artist title version author likes plays views -_id')
        .sort('-views')
        .limit(10);

    if (songs.length === 0) {
      res.status(203).json({
        status: 'error',
        message: `songs_not_found`,
        query: req.body.query
      });
      return;
    }

    res.status(200).json({
      status: 'ok',
      songs
    });

  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: 'error',
      message: 'server_error'
    });
  }
};

module.exports = router;
