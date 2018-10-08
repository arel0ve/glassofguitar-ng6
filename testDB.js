const mongoose = require('mongoose');
const User = require('./models/user').User;
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

// const MongoStore = require('connect-mongo')(session);
User.find({}, (err, users) => {
  console.log(users);
});
