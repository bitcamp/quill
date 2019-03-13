const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  firebaseId: {
    type: String,
    required: true,
  },

  numFavorited: {
    type: Number,
    default: 0
  },
});

const model = mongoose.model('FirebaseEvent', schema);
module.exports = model;
