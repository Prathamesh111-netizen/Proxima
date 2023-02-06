const { Schema, model } = require("mongoose")

const Document = new Schema({
  _id: String,
  Isgenerated: Boolean,
  Isstarted: Boolean,
  Isworking: Boolean,
})

module.exports = model("ReportStatus", Document)
