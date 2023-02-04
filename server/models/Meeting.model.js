const { Schema, model } = require("mongoose");

const Document = new Schema({
  _id: String,
  Timings: String,
  HostId: String,
  Title: String,
  Description: String,
});

module.exports = model("Meeting", Document);
