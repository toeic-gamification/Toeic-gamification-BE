const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res
      .status(401)
      .json({ message: "Không có token, truy cập bị từ chối!" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token không hợp lệ!" });
  }
};

module.exports = authMiddleware;
