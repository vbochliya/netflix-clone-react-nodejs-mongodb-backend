const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    subscription: {
        plan: { type: String, enum: ['free', 'basic', 'premium'], default: 'free' },
        startDate: { type: Date },
        endDate: { type: Date },
    },
    watchlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    likedMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

userSchema.pre("save", async function (next) {
  console.log("isModified............", this.isModified("password"));
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


module.exports = mongoose.model('User', userSchema);