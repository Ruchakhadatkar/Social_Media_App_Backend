const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const friendsSchema = new Schema({
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
});

const Friends = mongoose.model("Friends", friendsSchema)
module.exports = Friends
