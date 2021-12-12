const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  firstname: { type: String },
  surename: { type: String },
  email: { type: String, index: true, unique: [true, "email already exists"] },
  password: { type: String },
  twitterURL: { type: String },
  instgramURL: { type: String },
  facebookURL: { type: String },
  bio: { type: String },
  img: { data: Buffer, contentType: String },
});
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
userSchema.index({ "$**": "text" }, { match: "partial" });
const User = mongoose.model("User", userSchema);
module.exports = User;
