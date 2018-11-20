const express = require('express');
const router = express.Router();

const User = require('../models/user').User;

/* GET users listing. */
router.get(['/:login', '/:login/:song'], getUserByLogin);

async function getUserByLogin(req, res, next) {
  try {
    let user = await User.findOne({ login: req.params.login })
        .populate('songs', 'artist title author size speed notes _id');

    if (!user) {
      res.status(203).json(
          {
            title: 'GLASSOF-GUITAR: Play guitar online and write tabs free.',
            hatColor: '#51907F',
            isLogin: !!req.session.user ? "true" : "false",
            currentLogin: req.session.user,
            login: "/",
            tag: "Developer",
            name: "Valerii Psol",
            birthday: new Date(1994, 7, 18),
            place: "Andriivka, Berdiansk region",
            country: "Ukraine",
            biography: "",
            songs: [{
              artist: 'Ludwig van Beethoven',
              title: 'Für Elise',
              author: '0',
              id: '0'
            }],
            currentSong: {
              artist: 'Ludwig van Beethoven',
              title: 'Für Elise',
              notes: {
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
              }
            }
          }
      );
      return;
    }

    let bio = user.biography;

    if (!bio) bio = "";

    if (bio.length > 240) {
      bio = bio.slice(0, 237);
      bio += "...";
    }

    let photo = (!user.photo || user.photo === "") ? "" : `../photos/users/${user.photo}`;

    let sendObj = {
      title: `${user.fullName}: Glassof-Guitar`,
      hatColor: user.hatColor,
      isLogin: !!req.session.user ? "true" : "false",
      currentLogin: req.session.user,
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
      currentSong: {
        artist: '',
        title: '',
        notes: {
          size: '2/2',
          speed: '60',
          notes: []
        }
      }
    };

    for (let userSong of user.songs) {
      sendObj.songs.push({
        artist: userSong.artist,
        title: userSong.title,
        author: user.login,
        id: userSong._id
      });
    }

    let song = null;

    if (!!req.params.song)  {
      for (let userSong of user.songs) {
        if (userSong._id.toString() === req.params.song) {
          song = userSong;
        }
      }
    }

    if (song !== null) {
      sendObj.title = `${user.fullName} - "${song.artist} - ${song.title}": Glassof-Guitar`;
      sendObj.currentSong.artist = song.artist;
      sendObj.currentSong.title = song.title;
      sendObj.currentSong.notes = {
        size: song.size,
        speed: song.speed,
        notes: song.notes
      };
    }

    res.status(200).json(sendObj);
  } catch(e) {
    console.log(e);
    res.status(500).send({
      message: "Server error"
    })
  }
}

module.exports = router;
