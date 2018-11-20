const express = require('express');
const router = express.Router();

const User = require('../models/user').User;
const Song = require('../models/song').Melody;

/* POST search query. */
router.post('/', searchQuery);

async function searchQuery(req, res, next) {
  try {
    let reg = new RegExp(req.body.query, "i");

    if (req.body.type === "song") {

      let songs = await Song.find({}).or([{artist: reg}, {title: reg}])
          .select('artist title author _id')
          .limit(10);

      if (songs.length === 0) {
        res.status(203).json([{
          type: 'error',
          message: `Songs with '${req.body.query}' not found`
        }]);
        return;
      }

      let rezult = [];

      for (let song of songs) {
        rezult.push({
          type: 'song',
          href: `/user/${song.author}/${song._id}`,
          artist: song.artist,
          title: song.title
        })
      }

      res.status(200).json(rezult);

    } else {

      let users = await User.findByName(req.body.query);

      if (users.length === 0) {
        res.status(203).json([{
          type: 'error',
          message: `Users with '${req.body.query}' not found`
        }]);
        return;
      }

      let rezult = [];

      for (let user of users) {
        let tag = (user.tag && user.tag !== "") ? `${user.tag}.` : "";
        rezult.push({
          type: 'user',
          href: `/user/${user.login}`,
          tag,
          name: user.name
        });
      }

      res.status(200).json(rezult);
    }
  } catch (e) {
    console.log(e);
    res.status(500).json([{
      type: 'error',
      message: 'Server error'
    }]);
  }
};

module.exports = router;
