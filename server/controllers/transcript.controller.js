const HTMLToPDF = require("html-pdf-node");
const fs = require("fs");

let options = { format: "A4" };

const generateTranscript = (req, res) => {
  let file = {
    content: `<html><body><pre style='font-size: 1.2rem'>${req.body.text}</pre></body></html>`,
  };

  try {
    HTMLToPDF.generatePdf(file, options).then((pdfBuffer) => {
      // console.log("PDF Buffer:-", pdfBuffer);

      const pdfName = "./data/speech" + Date.now() + ".pdf";

      fs.writeFile(pdfName, pdfBuffer, function (writeError) {
        if (writeError) {
          console.log(writeError);
          return res
            .status(500)
            .json({ message: "Unable to write file. Try again." });
        }

        fs.readFile(pdfName, function (readError, readData) {
          if (!readError && readData) {
            // console.log({ readData });
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", "attachment");
            res.send(readData);
            return;
          }

          return res
            .status(500)
            .json({ message: "Unable to write file. Try again." });
        });
      });
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send(error);
  }
};

module.exports = { generateTranscript };
