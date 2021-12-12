const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let User = require("./userModel.js");
const PostSchema = Schema(
  {
    auther: { type: Schema.Types.ObjectId, ref: "User" },
    content: String,
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        content: String,
      },
    ],likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);
const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
