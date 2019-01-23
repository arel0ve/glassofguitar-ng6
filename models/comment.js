const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  text: {
    type: String,
    required: true
  },

  created: {
    type: Date,
    default: Date.now
  },

  likes: {
    type: Number,
    required: true,
    default: 0
  },
});

exports.Melody = mongoose.model('Comment', schema);
