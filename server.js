const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const connectToMongodb = async function () {
  try {
    await mongoose.connect(process.env.DB_URL);
  } catch (err) {
    console.log(err);
  }
};

connectToMongodb();

const PORT = process.env.PORT || 3000;
app.listen(PORT);
