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

  name: {
    type: String,
  },

  photoUrl: {
    type: String
  },

  hatColor: {
    type: String,
    default: '#51907f'
  },

  created: {
    type: Date,
    default: Date.now
  }
});

exports.User = mongoose.model('User', schema);
