const { Schema, model } = require("mongoose");

const Document = new Schema({
  meetingId: { type: String, required: true },
  hostWalletAddress: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  status : { type: String, default : "scheduled" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = model("meeting", Document);
