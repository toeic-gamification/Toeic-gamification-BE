const multer = require("multer");

// Cấu hình lưu trữ tạm thời
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;
