const express = require("express");
const Meeting = require("../models/Meeting.model");
const Attendence = require("../models/Attendence.model");
const Code = require("../models/Code.model");
const Canvas = require("../models/Canvas.model");
const { v4: uuidv4 } = require("uuid");
const app = express.Router();

app.get("/myMeetings/:UserId", async (req, res) => {
  const attendence = await Attendence.find({ UserId: req.params.UserId });
  const meetings = await Meeting.find({ _id: attendence.map((a) => a.MeetingId) });
  res.send(meetings);
});

app.post("/create", async (req, res) => {
  const { HostId, Title, Description, Timings } = req.body;
  const meeting = await Meeting.create({
    _id: uuidv4(),
    HostId,
    Title,
    Description,
    Timings,
  });
  console.log(meeting);
  res.send(meeting._id);
});

app.post("/join/:meetingId", async (req, res) => {
  const { UserId } = req.body;
  Attendence.create({
    _id: uuidv4(),
    UserId,
    MeetingId: req.params.meetingId,
  });
  const meeting = await Meeting.findById(req.params.meetingId);
  res.send(meeting);
});

// dashboard Page
app.get("/report/:meetingid", async (req, res) => {
  const meeting = await Meeting.find({});
  // query files
  // query attendence
  // query recordings
  // query transcripts
  res.send(meeting);
});

app.post("/save-code/:meetingId", async (req, res) => {});

app.post("/save-whiteboard/:meetingId", async (req, res) => {});

app.get("/:meetingId", async (req, res) => {
  const meeting = await Meeting.findById(req.params.meetingId);
  res.send(meeting);
});

module.exports = app;
