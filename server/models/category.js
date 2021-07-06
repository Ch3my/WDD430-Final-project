const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let documentSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
});

module.exports = mongoose.model('Category', documentSchema);