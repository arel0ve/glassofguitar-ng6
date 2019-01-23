const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
  artist: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  size: {
    type: String,
    required: true,
    default: '2/2'
  },

  speed: {
    type: String,
    required: true,
    default: '60'
  },

  notes: {
    type: [String],
    required: true,
    default: ["------"]
  },

  created: {
    type: Date,
    default: Date.now
  },

  views: {
    type: Number,
    required: true,
    default: 0
  },

  plays: {
    type: Number,
    required: true,
    default: 0
  },

  likes: {
    type: Number,
    required: true,
    default: 0
  },

  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

exports.Melody = mongoose.model('Melody', schema);
