const { Schema, model } = require("mongoose")

const Document = new Schema({
  _id: String,
  meetingid: String,
  type:String,
  URL: String,
})

module.exports = model("Files", Document)
