require("dotenv").config();
const mongoose = require("mongoose")
const Document = require("./models/Document.model")


mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const io = require("socket.io")(process.env.PORT, {
  cors: {
    origin: process.env.FRONTEND_SERVER ,
    methods: ["GET", "POST"],
  },
})

io.on("connection", socket => {
  socket.on("get-document", async documentId => {
    const document = await findOrCreateDocument(documentId)
    socket.join(documentId)
    socket.emit("load-document", document.data)

    socket.on("send-changes", delta => {
      socket.broadcast.to(documentId).emit("receive-changes", delta)
    })

    socket.on("save-document", async data => {
      await Document.findByIdAndUpdate(documentId, { data })
      // find document by id from astra -> get old fileCID -> delete old file from lighthouse storage
      // upload new file to lighthouse -> save new fileCID to astra
    })
  })
})

async function findOrCreateDocument(id) {
  if (id == null) return

  const document = await Document.findById(id)
  if (document) return document
  return await Document.create({ _id: id, data: "" })
}
