const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let User = require("./userModel.js");
const PostSchema = Schema(
  {
    content: String,
    comments: [
      {
        writerID: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        content: String,
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);
module.exports = PostSchema;
