const crypto = require('crypto');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Song = require('./song').Song;

let schema = new Schema({
  login: {
    type: String,
    lowercase: true,
    required: true,
    unique: true
  },

  isVerify: {
    type: Boolean,
    default: false
  },

  verifyCode: {
    type: String
  },

  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true
  },

  hashedPassword: {
    type: String,
    required: true
  },

  salt: {
    type: String,
    required: true
  },

  tag: {
    type: String
  },

  name: {
    type: String,
    required: true
  },

  photo: {
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

  songs: {
    type: [Song.schema]
  }
});

schema.method('encryptPassword', function (password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
});

schema.virtual('password')
    .set(function(password) {
      this.__plainPassword = password;
      this.salt = Math.random() + '';
      this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() {
      return this.__plainPassword;
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

schema.methods.checkPassword = function(password) {
  return this.encryptPassword(password) === this.hashedPassword;
};

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