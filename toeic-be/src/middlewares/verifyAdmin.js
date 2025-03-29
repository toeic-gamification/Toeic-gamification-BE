const authMiddleware = require("./authMiddleware");

const verifyAdmin = (req, res, next) => {
  // Gọi middleware authMiddleware trước
  authMiddleware(req, res, () => {
    // Kiểm tra xem người dùng có phải là admin không
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }
    next(); // Tiếp tục nếu người dùng là admin
  });
};

module.exports = verifyAdmin;
