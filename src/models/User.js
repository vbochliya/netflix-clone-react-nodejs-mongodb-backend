const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true},
  gender: { type: String, required: true},
  dob: { type: String, required: true},
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", userSchema);

// http://localhost:8000/api/auth/signup
// {
//   "name":"vikash",
//   "username":"vbo",
//   "dob":"07-10-2000",
//   "gender":"male",
//   "email":"vbochliya1@gmail.com",
//   "password":"123"
// }