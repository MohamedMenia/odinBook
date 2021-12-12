const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let User = require("./userModel.js");
const friendsSchema = Schema({
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  receiver: { type: Schema.Types.ObjectId, ref: "User" },
  friendStatus: String,
});
const Friends = mongoose.model("Friends", friendsSchema);
module.exports = Friends;
