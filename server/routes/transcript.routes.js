const express = require("express");
const router = express.Router();
const { generateTranscript } = require("../controllers/transcript.controller");

router.route("/").post(generateTranscript);

module.exports = router;
