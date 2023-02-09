const { Schema, model } = require("mongoose");

const Document = new Schema({
  meetingId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  Hash: { type: String, required: true },
});

module.exports = model("Files", Document);
