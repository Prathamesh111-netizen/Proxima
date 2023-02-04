require("dotenv").config();
const mongoose = require("mongoose");
const Document = require("./models/Document.model");
const Canvas = require("./models/Canvas.model");
const axios = require("axios");
const fs = require("fs");
const lighthouse = require("@lighthouse-web3/sdk");

const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage, preservePath: true });

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const io = require("socket.io")(process.env.PORT, {
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_SERVER,
    transports: ["websocket", "polling"],
    methods: ["GET", "POST"],
  },
});

const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json({ limit: "5mb" }));
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_SERVER,
    transports: ["websocket", "polling"],
    methods: ["GET", "POST"],
    allowEIO3: true,
  })
);

app.post("/api/exe", async (req, res) => {
  try {
    const { code, input } = req.body;
    const body = {
      clientId: process.env.JDOODLE_CLIENT_ID,
      clientSecret: process.env.JDOODLE_CLIENT_SECRET,
      script: code,
      language: "cpp17",
      stdin: input,
      versionIndex: "0",
    };

    axios.post(process.env.JDOODLE_BASEURL, body).then((response) => {
      res.send(response.data);
    });
  } catch (error) {
    console.log("error", error);
  }
});

const uploadFileToLightHouse = async (ogpath) => {
  const path = ogpath; //Give path to the file
  const apiKey = process.env.LIGHTHOUSE_API_KEY; //generate from https://files.lighthouse.storage/ or cli (lighthouse-web3 api-key --new)

  // Both file and folder supported by upload function
  const response = await lighthouse.upload(path, apiKey);

  // Display response
  console.log(response);
  console.log(
    "Visit at: https://gateway.lighthouse.storage/ipfs/" + response.Hash
  );
};

app.post("/api/upload-file", upload.single("file"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  uploadFileToLightHouse(req.file.path)
    .then((response) => {
      console.log(response);
      res.json({ message: "Successfully uploaded files" });
      fs.unlinkSync(req.file.path, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        //file removed
      });
    })
    .catch((error) => {
      console.log(error);
      res.json({ message: "Error uploading files" });
    });
});

app.listen(3001, () => {
  console.log(`listening on *:3001`);
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
        await Document.findByIdAndUpdate(documentId, { data });
        // find document by id from astra -> get old fileCID -> delete old file from lighthouse storage
        // upload new file to lighthouse -> save new fileCID to astra
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
      //save Canvas to lighthouse storage
      console.log(socket.id, "save-canvas");
    });
  });
});

async function findOrCreateDocument(id) {
  if (id == null) return;

  const document = await Document.findById(id);
  if (document) return document;
  return await Document.create({ _id: id, data: "" });
}

async function findOrCreateCanvas(id) {
  if (id == null) return;
  const canvas = await Canvas.findById(id);
  if (canvas) return canvas;
  return await Canvas.create({ _id: id, data: "" });
}

async function findOrCreateFile(id) {
  //save file to lighthouse storage
  if (id == null) return;
}
