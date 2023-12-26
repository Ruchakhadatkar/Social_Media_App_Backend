const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const friendsSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    friendId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    friendshipDate: {
      type: String,
    },
  },
  { timestamps: true }
);

const Friends = mongoose.model("Friends", friendsSchema);
module.exports = Friends;
