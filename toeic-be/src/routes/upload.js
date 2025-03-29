const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");
const { Image } = require("../models"); // Import model Sequelize

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const imageUrl = req.file.path; // Lấy URL ảnh từ Cloudinary

    // Lưu URL vào database bằng Sequelize
    const newImage = await Image.create({ url: imageUrl });

    res.json({
      success: true,
      imageUrl: newImage.url,
      message: "Upload and save success!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
});

module.exports = router;
