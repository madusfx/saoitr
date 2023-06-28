const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  }
});

UserSchema.pre("save", async function (next) {
  const hash = await bcryptjs.hash(this.password, 10);
  this.password = hash;
})

const User = mongoose.model("User", UserSchema);

module.exports = User;