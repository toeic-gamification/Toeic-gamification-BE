const jwt = require("jsonwebtoken");

const authMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Chưa đăng nhập" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: "Không có quyền truy cập" });
      }

      next();
    } catch (error) {
      res.status(401).json({ message: "Token không hợp lệ" });
    }
  };
};

module.exports = authMiddleware;
