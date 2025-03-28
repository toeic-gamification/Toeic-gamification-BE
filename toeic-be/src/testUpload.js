const cloudinary = require("./config/cloudinary");
const path = require("path");

// Đường dẫn chính xác đến file ảnh trong src/assets
const filePath = path.resolve(__dirname, "assets/image_cleanup.png");
console.log("📂 Uploading file:", filePath);

cloudinary.uploader
  .upload(filePath, { folder: "toeic-gamification" })
  .then((result) => console.log("✅ Uploaded:", result.secure_url))
  .catch((error) => console.error("❌ Error:", error));
