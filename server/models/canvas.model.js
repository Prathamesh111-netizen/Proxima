const { Schema, model } = require("mongoose")

const Canvas = new Schema({
  _id: String,
  data: Object,
})

module.exports = model("Canvas", Canvas)
