const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  name: { type: String },
  email: { type: String },
  avatar: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
