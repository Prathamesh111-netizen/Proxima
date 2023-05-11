const mongoose = require("mongoose");
const { MONGO_URL } = require("./config.js");

const connectDB = () => {
    console.log(MONGO_URL);
    mongoose.set("strictQuery", false);
    mongoose
      .connect(MONGO_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then((res) => console.log(`MongoDB Connected: ${res.connection.host}`))
      .catch((err) => {
        console.error(`Error: ${err.message}`);
        process.exit(1);
      });
  };

module.exports = connectDB;