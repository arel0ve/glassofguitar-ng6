const express = require('express');
const router = express.Router();

const User = require('../models/user').User;

router.post('/', (req, res, next) => {
  if (req.body.type === "get") {
    User.findOne({ login: req.body.user }, function(err, user) {
      if (err) return next(err);

      if (!user) {
        res.statusCode = 403;
        res.send(JSON.stringify({
          tag: "",
          name: req.body.user,
          biography: `User '${req.body.user}' not found.`
        }));
        return;
      }

      if (!req.session.user ||req.session.user !== req.body.user) {
        res.statusCode = 203;
        let bio = (!user.biography || user.biography === "") ?
            `Biography of '${user.fullName}' has not written yet.` : user.biography;

        for (let i = 0; i < bio.length; i++) {
          if (bio[i] === "<") {
            bio = bio.slice(0, i) + '⪡' + bio.slice(i + 1);
          } else if (bio[i] === ">") {
            bio = bio.slice(0, i) + '⪢' + bio.slice(i + 1);
          }
        }

        for (let i = 0; i < bio.length; i++) {
          if (bio[i] === String.fromCharCode(10) ||
              bio[i] === String.fromCharCode(13) ||
              bio[i] === String.fromCharCode(14)) {
            bio = bio.slice(0, i) + '<br>' + bio.slice(i + 1);
          }
        }

        res.send(JSON.stringify({
          tag: user.tag,
          name: user.name,
          biography: bio
        }));
        return;
      }

      res.statusCode = 200;
      res.send(JSON.stringify({
        tag: user.tag,
        name: user.name,
        biography: user.biography
      }));
    });

  } else if (req.body.type === "post")  {
    User.findOne({ login: req.body.user }, function(err, user) {
      if (err) return next(err);

      if (!user) {
        res.statusCode = 403;
        res.send(`User '${req.body.user} not found.`);
        return;
      }

      if (!req.session.user ||req.session.user !== req.body.user) {
        res.statusCode = 203;
        res.send('You have not rights to do this');
        return;
      }

      user.biography = req.body.bio;

      user.save(function (err) {
        if (err) {
          res.statusCode = 501;
          res.send("Error in updating data! Please press any key again.");
          return;
        }

        res.statusCode = 200;
        res.send("Ok!");
      });
    });
  }

});

module.exports = router;