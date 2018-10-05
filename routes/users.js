const express = require('express');
const router = express.Router();

const User = require('../models/user').User;

/* GET users listing. */
router.get(['/:login', '/:login/:song'], function(req, res, next) {

  if (!req.params.login || req.params.login.length < 2) return next();

  User.findOne({ login: req.params.login }, function (err, user) {

    if (!user) {
      res.render('not-found', {
        title: 'GLASSOF-GUITAR: Play guitar online and write tabs free.',
        hatColor: '#51907F',
        isLogin: !!req.session.user ? "true" : "false",
        login: "/",
        tag: "Developer",
        name: "Valerii Psol",
        birthday: new Date(1994, 7, 18),
        place: "Andriivka, Berdiansk region",
        country: "Ukraine",
        biography: "",
        songs: [
          '<a href="#"><b>Ludwig van Beethoven</b> - Für Elise</a>'
        ],
        songArtist: 'Ludwig van Beethoven',
        songTitle: 'Für Elise',
        notes: JSON.stringify({
          size: '3/8',
          speed: '63',
          notes: [
            '------','------','------','------','0-----','-4----',
            '0-----','-4----','0-----','-0----','-3----','-1----',
            '--2---','------','------','----3-','---2--','--2---',
            '-0----','------','------','---2--','--1---','-0----',
            '-1----','------','------','---2--','0-----','-4----',
            '0-----','-4----','0-----','-0----','-3----','-1----',
            '--2---','------','------','----3-','---2--','--2---',
            '-0----','------','------','---2--','-1----','-0----',
            '--2---','------','------','-0----','-1----','-3----',
            '0-----','------','------','--0---','1-----','0-----',
            '-3----','------','------','---3--','0-----','-3----',
            '-1----','------','------','---2--','-3----','-1----',
            '--0---','------','------','---2--','0-----','-4----',
            '0-----','-4----','0-----','-0----','-3----','-1----',
            '--2---','------','------','----3-','---2--','--2---',
            '-0----','------','------','---2--','-1----','-0----',
            '--2---','------','------','------','------','------'
          ]
        }),
        messLogin: req.params.login,
        messType: '404-user'
      });
      return;
    }

    let bio = user.biography;

    if (!bio) bio = "";

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

    if (bio.length > 240) {
      bio = bio.slice(0, 237);
      bio += "...";
    }

    let photo = (!user.photo || user.photo === "") ? "" : `../images/users/${user.photo}`;

    let renderObj = {
      title: `${user.fullName}: Glassof-Guitar`,
      hatColor: user.hatColor,
      isLogin: !!req.session.user ? "true" : "false",
      login: `/${user.login}`,
      tag: user.tag,
      name: user.name,
      photo: photo,
      birthday: user.birthday,
      place: user.place,
      country: user.country,
      biography: bio,
      songs: [],
      songArtist: '',
      songTitle: '',
      notes: JSON.stringify({
        size: '2/2',
        speed: '60',
        notes: []
      })
    };

    for (let userSong of user.songs) {
      renderObj.songs.push(`<a href="/${user.login}/${userSong.songId}"><b>${userSong.artist}</b> - ${userSong.title}</a>`);
    }

    let song = null;

    if (!!req.params.song)  {
      for (let userSong of user.songs) {
        if (userSong.songId === req.params.song) {
          song = userSong;
        }
      }
    }

    if (song !== null) {
      renderObj.title = `${user.fullName} - "${song.artist} - ${song.title}": Glassof-Guitar`;
      renderObj.songArtist = song.artist;
      renderObj.songTitle = song.title;
      renderObj.notes = JSON.stringify({
        size: song.size,
        speed: song.speed,
        notes: song.notes
      });
    }

    res.render('index', renderObj);

  });

});

module.exports = router;
