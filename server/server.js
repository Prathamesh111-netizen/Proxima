require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const Code = require("./models/Code.model");
// const Document = require("./models/Document.model");
const Canvas = require("./models/Canvas.model");

const compileRoutes = require("./routes/compile.routes");
const meetingRoutes = require("./routes/meeting.routes");
const fs = require("fs");
const lighthouse = require("@lighthouse-web3/sdk");

const uploadFileToLightHouse = async (ogpath) => {
  const path = ogpath; //Give path to the file
  const apiKey = process.env.LIGHTHOUSE_API_KEY; //generate from https://files.lighthouse.storage/ or cli (lighthouse-web3 api-key --new)

  // Both file and folder supported by upload function
  const response = await lighthouse.upload(path, apiKey);

  // Display response
  console.log(response);
  console.log(
    "Visit at: https://gateway.lighthouse.storage/ipfs/" + response.data.Hash
  );
};

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

// connect to the mongoDB collection
const connectDB = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then((res) => console.log(`MongoDB Connected: ${res.connection.host}`))
    .catch((err) => {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    });
};

connectDB();

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
const server = app.listen(3001, () => {
  console.log(`listening on *:3001`);
});

app.use(morgan("dev"));
app.use("/api/compile", compileRoutes);
app.use("/api/meeting", meetingRoutes);

// app.listen(3001, () => {
//   console.log(`listening on *:3001`);
// });
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

app.post("/api/save-code", async (req, res) => {
  try {
    const { code } = req.body;
    fs.writeFile("code.cpp", code, (err) => {
      if (err) {
        console.log("Error writing file", err);
      } else {
        console.log("Successfully wrote file");
      }
    });
    uploadFileToLightHouse("code.cpp").then((response) => {
      console.log(response);
      res.json({ message: "Successfully uploaded files" });
      fs.unlinkSync("code.cpp", (err) => {
        if (err) {
          console.error(err);
          return;
        }
        //file removed
      });
    });
  } catch (error) {
    console.log("error", error);
  }
});

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

/**
 * When Uploaded to lighthouse storage the response is like this
 *  {
  data: {
    Name: 'Assignment-1  DT Signal.pdf',
    Hash: 'QmTAteg3KJdRaDRWM7jfHG4bbf4ZGafL8ZFuDBkVjsjiEk',
    Size: '281685'
  }
}
Visit at: https://gateway.lighthouse.storage/ipfs/QmTAteg3KJdRaDRWM7jfHG4bbf4ZGafL8ZFuDBkVjsjiEk to view the file
 */

app.get("api/get-file-links", (req, res) => {
  console.log(req.query.id);
  //Return array of links based on req.query.id
  //req.query.id is the meeting id
  // const links = [
  //   "https://gateway.lighthouse.storage/ipfs/QmTAteg3KJdRaDRWM7jfHG4bbf4ZGafL8ZFuDBkVjsjiEk",
  //   "https://gateway.lighthouse.storage/ipfs/QmTAteg3KJdRaDRWM7jfHG4bbf4ZGafL8ZFuDBkVjsjiEk",
  //   "https://gateway.lighthouse.storage/ipfs/QmTAteg3KJdRaDRWM7jfHG4bbf4ZGafL8ZFuDBkVjsjiEk",
  // ];
  // res.json({ links:links });
  res.json({ message: "Not implemented yet" });
});

io.on("connection", (socket) => {
  socket.on("join-room", async (meetingId) => {
    socket.join(meetingId);
    console.log(socket.id, "join-room");
    socket.on("get-document", async (documentId) => {
      const document = await findOrCreateDocument(documentId)
        .then((result) => {
          socket.emit("load-document", document.data);
        })
        .catch((err) => {
          console.log(err);
        });
      // socket.emit("load-document", document.data);

      socket.on("send-changes", (delta) => {
        socket.broadcast.to(meetingId).emit("receive-changes", delta);
      });

      socket.on("save-document", async (data) => {
        await Code.findByIdAndUpdate(documentId, { data });
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
  //save file to lighthouse storage
  if (id == null) return;
}
