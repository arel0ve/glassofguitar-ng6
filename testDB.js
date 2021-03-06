const mongoose = require('mongoose');
const User = require('./models/user').User;
const Song = require('./models/song').Song;
const Comment = require('./models/comment').Comment;
mongoose.connect('mongodb://localhost:27017/guitar_v2_0_0', {useNewUrlParser: true});

// const MongoStore = require('connect-mongo')(session);
User.find({}, (err, users) => {
  console.log(users);
});

Song.find({}, (err, songs) => {
  console.log(songs);
});

Comment.find({}, (err, comments) => {
  console.log(comments);
});
