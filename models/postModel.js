const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    caption: {
      type: String,
    },
    image: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    postDate:{
      type: Date,
      default: Date.now
    }
  },
 
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
