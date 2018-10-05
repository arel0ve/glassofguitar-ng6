const express = require('express');
const router = express.Router();

const User = require('../models/user').User;
const Song = require('../models/song').Song;

/* POST registration. */
router.post('/', (req, res, next) => {

  let reg = new RegExp(req.body.query, "i");

  if (req.body.type === "song") {

    User.findBySong(req.body.query, function(err, users) {
      if (err) return next(err);

      if (users.length === 0) {
        res.statusCode = 203;
        res.send(`<div>Songs with '${req.body.query}' not found</div>`);
        return;
      }

      let rezult = {
        length: 0,
        html: ""
      };

      for (let user of users) {
        for (let song of user.songs) {
          let full = song.artist + ' - ' + song.title;
          if (~full.search(reg)) {
            rezult.html += `<a href="/${user.login}/${song.songId}"><b>${song.artist}</b> - ${song.title}</a>`;
            rezult.length++;
          }
        }
        if (rezult.length > 10) break;
      }

      if (rezult.length === 0) {
        res.statusCode = 202;
        res.send(`<div>Songs with '${req.body.query}' not found</div>`);
        return;
      }

      res.statusCode = 200;
      res.send(rezult.html);

    });

  } else {
    User.findByName(req.body.query, function (err, users) {
      if (err) return next(err);

      if (users.length === 0) {
        res.statusCode = 203;
        res.send(`<div>Users with '${req.body.query}' not found</div>`);
        return;
      }

      let rezult = {
        length: 0,
        html: ""
      };

      for (let user of users) {
        let tag = (user.tag && user.tag !== "") ? `<b>${user.tag}</b>.` : "";
        rezult.html += `<a href="/${user.login}">${tag}${user.name}</a>`;
        rezult.length++;
      }

      res.statusCode = 200;
      res.send(rezult.html);
    })
  }

});

module.exports = router;