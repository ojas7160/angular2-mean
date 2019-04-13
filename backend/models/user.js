const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: {type: String, required: true, unique: true},   // unique true doesnt really works and throws error immediately
  password: {type: String, required: true}
});

userSchema.plugin(uniqueValidator); // mongoose inbuilt validator used as plugin

module.exports = mongoose.model('User', userSchema);