const mongoose = require("mongoose");
const url =
  "mongodb+srv://krishsureka0551:hR9BoZMxj2oBKCng@discussio.855j2tc.mongodb.net/?appName=discussio";
const connectMongoDB = () => {
  try {
    mongoose.connect(url).then(() => {
      console.log("Database Connected");
    });
  } catch (error) {
    console.error("Something went wrong ", error.message);
  }
};
module.exports = connectMongoDB;
