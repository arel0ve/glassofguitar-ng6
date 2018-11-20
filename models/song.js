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
    type: String,
    required: true
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
  }
});

schema.virtual('fullTitle')
    .set(function(fullTitle) {
      if (~fullTitle.indexOf(' - ')) {
        this.artist = fullTitle.slice(0, fullTitle.indexOf(' - '));
        this.title = fullTitle.slice(fullTitle.indexOf(' - ') + 3);
      } else {
        this.title = fullTitle;
      }
    })
    .get(function() {
      if (this.artist && this.artist.length > 0) {
        return `${this.artist} - ${this.title}`;
      }
      return this.title;
    });

exports.Melody = mongoose.model('Melody', schema);
