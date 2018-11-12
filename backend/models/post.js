const mongoose = require('mongoose');

const postSchema = mongoose.schema({
  title: {type: string, required: true},
  description: {type: string, required: false},

  creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('Post', postSchema)