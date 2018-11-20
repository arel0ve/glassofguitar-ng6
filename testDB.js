const mongoose = require('mongoose');
const User = require('./models/user').User;
const Song = require('./models/song').Song;
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

// const MongoStore = require('connect-mongo')(session);
User.find({}, (err, users) => {
  console.log(users);
});

Song.find({}, (err, songs) => {
  console.log(songs);
});

// Song.findOneAndDelete({songId: '0'}, (err, songs) => {
//   console.log(songs);
//   // let song = songs[0];
//   //
//   // song.save(err => {
//   //   console.log(err);
//   // })
// });
