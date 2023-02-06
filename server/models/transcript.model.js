const { Schema, model } = require("mongoose");

const Document = new Schema({
  _id: String, //meetingId
  transcript: String,
});

module.exports = model("Transcripts", Document);
