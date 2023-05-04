require("dotenv").config();
// require ('custom-env').env('local')
const morgan = require("morgan");

const Code = require("./models/code.model");
const Canvas = require("./models/canvas.model");
const axios = require("axios");
const compileRoutes = require("./routes/compile.routes");
const meetingRoutes = require("./routes/meeting.routes");
const fileRoutes = require("./routes/file.routes");
const { notFound, errorHandler } = require("./middleware/error.middleware");


// connect to the mongoDB collection
const connectDB = require("./config/db");
connectDB();

// IO server
const io = require("socket.io")(process.env.IO_PORT, {
  cors: {
    credentials: true,
    origin: process.env.OXKID_FRONTEND_SERVER,
    transports: ["websocket", "polling"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join-room", async (meetingId) => {
    socket.join(meetingId);
    console.log(socket.id, "join-room");
    socket.on("get-document", async (documentId) => {
      const document = await findOrCreateDocument(documentId);
      socket.emit("load-document", document.data);

      socket.on("send-changes", (delta) => {
        socket.broadcast.to(meetingId).emit("receive-changes", delta);
      });

      socket.on("save-document", async (data) => {
        await Code.findByIdAndUpdate(documentId, { data });
      });
    });

    socket.on("canvas-data", async (data) => {
      console.log(socket.id, "canvas-data");
      socket.broadcast.to(meetingId).emit("canvas-data", data);
      await Canvas.findOneAndUpdate(
        { _id: meetingId },
        { $set: { data: data } },
        { upsert: true, new: true }
      );
    });

    socket.on("get-canvas", async (meetingId) => {
      console.log(socket.id, "get-canvas");
      const canvas = await findOrCreateCanvas(meetingId);
      socket.emit("load-canvas", canvas.data);
    });

    socket.on("save-canvas", async (data) => {
      console.log(socket.id, "save-canvas");
    });
  });
});




async function findOrCreateDocument(id) {
  if (id == null) return;

  const document = await Code.findById(id);
  if (document) return document;
  return await Code.create({ _id: id, data: "" });
}

async function findOrCreateCanvas(id) {
  if (id == null) return;
  const canvas = await Canvas.findById(id);
  if (canvas) return canvas;
  return await Canvas.create({ _id: id, data: "" });
}

async function findOrCreateFile(id) {
  if (id == null) return;
}

// express server

const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json({ limit: "5mb" }));
app.use(
  cors({
    credentials: true,
    origin: process.env.OXKID_FRONTEND_SERVER,
    transports: ["websocket", "polling"],
    methods: ["GET", "POST"],
    allowEIO3: true,
  })
);

app.use(morgan("dev"));
app.use("/api/compile", compileRoutes);
app.use("/api/meeting", meetingRoutes);
app.use("/api/file", fileRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`listening on *:${process.env.SERVER_PORT}}`);
});


// const convertAudioToText = async (audioUrl) => {
//   var data = JSON.stringify({
//     audio_url: audioUrl,
//   });

//   var config = {
//     method: "post",
//     maxBodyLength: Infinity,
//     url: "https://api.assemblyai.com/v2/transcript",
//     headers: {
//       Authorization: "7a6cc2fea38a4815b24b75b64c1ccaee",
//       "Content-Type": "application/json",
//     },
//     data: data,
//   };

//   axios(config)
//     .then(function (response) {
//       console.log(JSON.stringify(response.data));
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// };
// convertAudioToText("https://bit.ly/3yxKEIY")
