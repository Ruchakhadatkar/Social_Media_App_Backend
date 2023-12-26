const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const friendsSchema = new Schema(
  {
    userId1: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    userId2: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    frindshipDate:{
      type: Date,
      default: Date.now
    }
  },
 
);

const Friends = mongoose.model("Friends", friendsSchema);
module.exports = Friends;
