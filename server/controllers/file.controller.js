const File = require("../models/file.model");
const multer = require("multer");
const lighthouse = require("@lighthouse-web3/sdk");
const fs = require("fs");

const getFiles = async (req, res, next) => {
  try {
    const { meetingId } = req.params;
    const files = await File.find({ meetingId: meetingId });
    res.status(200).json({
      success: true,
      files: files,
    });
  } catch (err) {
    next(err);
  }
};

const uploadFile = async (req, res, next) => {
  try {
    const { meetingId } = req.params;
    const { type } = req.body;

    if (type === "code") {
      const { code } = req.body;
      const response = await lighthouse.uploadText(
        code,
        process.env.LIGHTHOUSE_KEY
      );

      File.create({
        meetingId: meetingId,
        title: `Code-${Date.now()}`,
        description: req.body.description || "",
        Hash: response.data.Hash,
      });

      return res.status(200).send({
        success: true,
        message: "Code File uploaded successfully",
      });
    }

    if (type === "whiteboard") {
      const { whiteboard } = req.body;
      const file = `whiteboard-${Date.now()}`;
      const filepath = `uploads/${file}.png`;

      var base64Data, binaryData;

      base64Data = whiteboard.replace(/^data:image\/png;base64,/, "");
      base64Data += base64Data.replace("+", " ");
      binaryData = new Buffer(base64Data, "base64").toString("binary");

      fs.writeFile(filepath, binaryData, "binary", function (err) {
        console.log(err); // writes out file without error, but it's not a valid image
      });

      const response = await lighthouse.upload(
        filepath,
        process.env.LIGHTHOUSE_KEY
      );

      File.create({
        meetingId: meetingId,
        title: `${file}.png`,
        description: req.body.description || "",
        Hash: response.data.Hash,
      });

      return res.status(200).send({
        success: true,
        message: "Whiteboard File uploaded successfully",
      });
    }
    if (type==="meetingRecording"){
      return res.status(200).send({
        success: true,
        message: "Meeting Recording File uploaded successfully",
      });
    }
    
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "uploads");
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
      },
    });

    var upload = multer({ storage: storage }).single("file");

    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({
          success: false,
          message: "Multer error",
          err: err,
        });
      } else if (err) {
        return res.status(500).json({
          success: false,
          message: "Error",
          err: err,
        });
      } else {
        console.log();
        const path = `uploads/${req.file.filename}`; //Give path to the file
        const apiKey = process.env.LIGHTHOUSE_KEY; //generate from https://files.lighthouse.storage/ or cli (lighthouse-web3 api-key --new)

        // Both file and folder supported by upload function
        const response = await lighthouse.upload(path, apiKey);

        // Display response
        console.log(response);
        console.log(
          "Visit at: https://gateway.lighthouse.storage/ipfs/" + response.Hash
        );

        File.create({
          meetingId: meetingId,
          title: req.file.filename,
          description: req.body.description || "",
          Hash: response.data.Hash,
        });

        return res.status(200).send({
          success: true,
          message: "File uploaded successfully",
        });
      }
    });
  } catch (err) {
    next(err);
  }
};

const downloadFile = async (req, res) => {};

module.exports = {
  getFiles,
  downloadFile,
  uploadFile,
};
