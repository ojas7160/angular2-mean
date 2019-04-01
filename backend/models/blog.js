const mongoose = require('mongoose');

const blog = mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true}
});

module.exports = mongoose.model('Blog', blog);