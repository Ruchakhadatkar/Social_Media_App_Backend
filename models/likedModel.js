const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const likedSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
    date: {
      type: String,
    },
  },
  { timestamps: true }
);

const Like = mongoose.model("Like", likedSchema);

module.exports = Like;
