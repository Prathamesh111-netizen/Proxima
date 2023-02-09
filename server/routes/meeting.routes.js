const express = require("express");
const {
  getMyMeetings,
  createMeeting,
  getMeetingReport,
  joinMeeting,
} = require("../controllers/meeting.controller");

const router = express.Router();

router.route("/").post(createMeeting);

router.route("/join/:meetingID").post(joinMeeting);

router.route("/report/:meetingID").get(getMeetingReport);

router.route("/:userWalletAddress").get(getMyMeetings);

module.exports = router;
