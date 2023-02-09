const express = require("express");
const router = express.Router();

const { getFiles, uploadFile } = require("../controllers/file.controller");

router.route("/uploadcode/:meetingId").post(uploadFile);

router.route("/uploadboard/:meetingId").post(uploadFile);

router.route("/:meetingId").post(uploadFile);

router.route("/:meetingId").get(getFiles);

module.exports = router;
