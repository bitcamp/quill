const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: String,
  description: String,
  startEpoch: {
    type: Number,
    default: Date.now()
  },
  endEpoch: {
    type: Number,
    default: Date.now()
  },
  location: String,
  img: String,
  beginnerFriendly: Boolean,

  numFavorited: {
    type: Number,
    default: 0
  }
});

schema.set('toJSON', { virtuals: true });
schema.set('toObject', { virtuals: true });

schema.virtual('startTime').get(function() {
  return new Date(this.startEpoch);
});

schema.virtual('endTime').get(function() {
  return new Date(this.endEpoch);
});

const model = mongoose.model('Event', schema);
module.exports = model;
