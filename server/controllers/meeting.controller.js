const Meeting = require("../models/meeting.model");
const Attendence = require("../models/attendence.model");
const shortid = require("shortid");

const getMyMeetings = async (req, res, next) => {
  try {
    const { userWalletAddress } = req.params;
    const meetings = await Meeting.find({
      hostWalletAddress: userWalletAddress,
      status : "scheduled"
    });
    res.status(200).json({
      success: true,
      meetings: meetings,
    });
  } catch (err) {
    next(err);
  }
};

const createMeeting = async (req, res, next) => {
  try {
    const { hostWalletAddress, title, description, startTime, endTime } =
      req.body;
    const meeting = await Meeting.create({
      meetingId: shortid.generate(),
      hostWalletAddress,
      title,
      description,
      startTime,
      endTime,
    });

    res.status(201).json({
      success: true,
      meeting: meeting,
    });
  } catch (err) {
    next(err);
  }
};

const joinMeeting = async (req, res, next) => {
  const { meetingId, userId } = req.body;
  const meeting = await Meeting.findById(meetingId);
  if (!meeting) {
    return res.status(404).json({
      success: false,
      message: "Meeting not found",
    });
  }

  if (meeting.status === "ended") {
    return res.status(400).json({
      success: false,
      message: "Meeting has ended",
    });
  }

  if (meeting.status === "active") {
    const attendence = await Attendence.create({
      meetingId,
      userId,
      joinTime: Date.now(),
    });
    return res.status(201).json({
      success: true,
      attendence: attendence,
    });
  }

  if (meeting.status === "scheduled" && meeting.hostId !== userId) {
    res.status(400).json({
      success: false,
      message: "Meeting has not started yet",
    });
  }

  if (meeting.status === "scheduled" && meeting.hostId === userId) {
    Meeting.findByIdAndUpdate(meetingId, { status: "active" }, (err, doc) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Something went wrong",
        });
      }
      if (!doc) {
        return res.status(404).json({
          success: false,
          message: "Meeting not found",
        });
      }
      const attendence = Attendence.create({
        meetingId,
        userId,
        joinTime: Date.now(),
      });
      return res.status(201).json({
        success: true,
        attendence: attendence,
      });
    });
  }
};

const getMeetingReport = async (req, res) => {};

module.exports = {
  getMyMeetings,
  createMeeting,
  joinMeeting,
  getMeetingReport,
};
