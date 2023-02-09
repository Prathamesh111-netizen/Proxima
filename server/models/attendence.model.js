const { Schema, model } = require("mongoose");

const Document = new Schema({
  MeetingId: {type : String , required : true},
  UserId: {type : String, required: true},
  joinTime: { type: Date, default: Date.now },
  leaveTime: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = model("attendence", Document);
