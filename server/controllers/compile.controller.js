const axios = require("axios");
const { JDOODLE_BASEURL, JDOODLE_CLIENT_ID, JDOODLE_CLIENT_SECRET } = require('../config');

const compileCode = async (req, res) => {
  try {
    const code = req.body.code;
    const input = req.body.input;
    const language = req.body.language || "cpp17";
    const versionIndex = req.body.versionIndex || "0";
    const body = {
      clientId: JDOODLE_CLIENT_ID,
      clientSecret: JDOODLE_CLIENT_SECRET,
      script: code,
      language: language,
      stdin: input,
      versionIndex: versionIndex,
    };

    axios.post(JDOODLE_BASEURL, body).then((response) => {
      res.send(response.data);
    });
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = { compileCode };
