const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let documentSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  date: {
    type: Date
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }
});

module.exports = mongoose.model('Document', documentSchema);