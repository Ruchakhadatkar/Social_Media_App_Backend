const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const friendRequestSchema = new Schema(
  {
    senderUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    receiverUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "decline"],
      default: "pending",
    },
    requestDate:{
      type: Date,
      default: Date.now
    }
  },
);

const Request = mongoose.model("Request", friendRequestSchema);
module.exports = Request;
