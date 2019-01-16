const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
  uid: {
    type: String,
    unique: true
  },

  login: {
    type: String,
    lowercase: true
  },

  email: {
    type: String,
    lowercase: true
  },

  phone: {
    type: String,
    lowercase: true
  },

  tag: {
    type: String
  },

  name: {
    type: String,
  },

  photo: {
    type: String
  },

  photoUrl: {
    type: String
  },

  numberPhoto: {
    type: Number
  },

  birthday: {
    type: Date
  },

  place: {
    type: String
  },

  country: {
    type: String
  },

  biography: {
    type: String
  },

  hatColor: {
    type: String,
    default: '#51907f'
  },

  created: {
    type: Date,
    default: Date.now
  },

  songs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Melody'
  }]
});

schema.virtual('fullName')
    .set(function(fullName) {
      if (~fullName.indexOf('.')) {
        this.tag = fullName.slice(0, fullName.indexOf('.'));
        this.name = fullName.slice(fullName.indexOf('.') + 1);
      } else {
        this.name = fullName;
      }
    })
    .get(function() {
      if (this.tag && this.tag.length > 0) {
        return `${this.tag}.${this.name}`;
      }
      return this.name
    });

schema.static('findByName', function (name, callback) {
  return this.find({ $where: `
    let full = this.tag + '.' + this.name;
    if (~full.search(/${name}/i)) return true;
    return false;
  `}, 'login tag name', {limit: 10}, callback);
});

schema.static('findBySong', function (song, callback) {
  return this.find({ $where: `{
      for (let song of this.songs) {
        let full = song.artist + ' - ' + song.title;
        if (~full.search(/${song}/i)) return true;
      }
        return false;
    }`}, 'login songs', {limit: 10}, callback);
});

exports.User = mongoose.model('User', schema);
