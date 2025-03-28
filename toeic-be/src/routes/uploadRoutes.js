const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");
const cloudinary = require("../config/cloudinary");

// API Upload
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    // Upload ảnh lên Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      { folder: "toeic-images" },
      (error, result) => {
        if (error) {
          return res
            .status(500)
            .json({
              success: false,
              message: "Upload to Cloudinary failed",
              error,
            });
        }
        res.json({ success: true, imageUrl: result.secure_url });
      }
    );

    result.end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ success: false, message: "Upload failed", error });
  }
});

module.exports = router;
