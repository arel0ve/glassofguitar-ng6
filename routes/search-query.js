const express = require('express');
const router = express.Router();

const User = require('../models/user').User;
const Song = require('../models/song').Song;

/* POST registration. */
router.post('/', (req, res, next) => {

  let reg = new RegExp(req.body.query, "i");

  if (req.body.type === "song") {

    User.findBySong(req.body.query, function(err, users) {
      if (err) {
        res.statusCode = 501;
        res.send([{
          type: 'error',
          message: 'Server error'
        }]);
        return;
      }

      if (users.length === 0) {
        res.statusCode = 203;
        res.send([{
          type: 'error',
          message: `Songs with '${req.body.query}' not found`
        }]);
        return;
      }

      let rezult = [];

      for (let user of users) {
        for (let song of user.songs) {
          let full = song.artist + ' - ' + song.title;
          if (~full.search(reg)) {
            rezult.push({
              type: 'song',
              href: `/user/${user.login}/${song.songId}`,
              artist: song.artist,
              title: song.title
            });
          }
        }
        if (rezult.length > 10) break;
      }

      if (rezult.length === 0) {
        res.statusCode = 202;
        res.send([{
          type: 'error',
          message: `Songs with '${req.body.query}' not found`
        }]);
        return;
      }

      res.statusCode = 200;
      res.send(rezult);

    });

  } else {
    User.findByName(req.body.query, function (err, users) {
      if (err) {
        res.statusCode = 501;
        res.send([{
          type: 'error',
          message: 'Server error'
        }]);
        return;
      }

      if (users.length === 0) {
        res.statusCode = 203;
        res.send([{
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

      res.statusCode = 200;
      res.send(rezult);
    })
  }

});

module.exports = router;
