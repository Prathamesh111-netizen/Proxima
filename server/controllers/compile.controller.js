const compileCode = async (req, res) => {
  try {
    const code = req.body.code;
    const input = req.body.input;
    const language = req.body.language || "cpp17";
    const versionIndex = req.body.versionIndex || "0";
    const body = {
      clientId: process.env.JDOODLE_CLIENT_ID,
      clientSecret: process.env.JDOODLE_CLIENT_SECRET,
      script: code,
      language: language,
      stdin: input,
      versionIndex: versionIndex,
    };

    axios.post(process.env.JDOODLE_BASEURL, body).then((response) => {
      res.send(response.data);
    });
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = { compileCode}