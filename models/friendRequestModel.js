const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const friendRequestSchema = new Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
})

const Request = mongoose.model("Request", friendRequestSchema);
module.exports = Request;
