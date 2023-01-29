require("dotenv").config();
const mongoose = require("mongoose");
const Document = require("./models/Document.model");

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const io = require("socket.io")(process.env.PORT, {
  cors: {
    credentials:true,
    origin: process.env.FRONTEND_SERVER,
    transports: ['websocket', 'polling'],
    methods: ["GET", "POST"],
  },
  allowEIO3: true
});

io.on("connection", (socket) => {
  console.log("User Online");
  socket.on("canvas-data", (data) => {
    socket.broadcast.emit("canvas-data", data);
  });

  socket.on("get-document", async (documentId) => {
    const document = await findOrCreateDocument(documentId);
    socket.join(documentId);
    socket.emit("load-document", document.data);

    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async (data) => {
      await Document.findByIdAndUpdate(documentId, { data });
      // find document by id from astra -> get old fileCID -> delete old file from lighthouse storage
      // upload new file to lighthouse -> save new fileCID to astra
    });

    socket.on("drawing", (data) => {
      console.log("reached here", data);
      socket.broadcast.emit("drawing", data);
    });
  });
});

async function findOrCreateDocument(id) {
  if (id == null) return;

  const document = await Document.findById(id);
  if (document) return document;
  return await Document.create({ _id: id, data: "" });
}
