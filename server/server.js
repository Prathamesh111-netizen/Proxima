require("dotenv").config();
const mongoose = require("mongoose");
const axios = require("axios");
const morgan = require("morgan");
const Code = require("./models/Code.model");
const Canvas = require("./models/Canvas.model");

const compileRoutes = require("./routes/compile.routes");
const meetingRoutes =   require("./routes/meeting.routes");

// connect to the mongoDB collection
const connectDB = () => {
  mongoose.set("strictQuery", false);
	mongoose
		.connect(process.env.MONGO_URL, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		})
		.then((res) =>
			console.log(
				`MongoDB Connected: ${res.connection.host}`)
		)
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

app.use(morgan("dev"));
app.use("/api/compile", compileRoutes);
app.use("/api/meeting", meetingRoutes);

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
