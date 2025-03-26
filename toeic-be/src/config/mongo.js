const mongoose = require("mongoose");
require("dotenv").config();

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Kết nối mongo thành công!");
  } catch (error) {
    console.error("Kết nối thất bại:", error);
    process.exit(1);
  }
};
module.exports = connectMongoDB;
