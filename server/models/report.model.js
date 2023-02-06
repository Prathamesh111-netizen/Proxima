const { Schema, model } = require("mongoose");

const Document = new Schema({
  _id: String,
  MeetingId: String,
  UserId: String,
});

module.exports = model("Attendence", Document);
