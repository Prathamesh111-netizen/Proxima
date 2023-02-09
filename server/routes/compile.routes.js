const express = require("express");
const router = express.Router();
const {compileCode} = require("../controllers/compile.controller");

router.route("/").post(compileCode);

module.exports = router;
