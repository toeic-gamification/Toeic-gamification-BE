const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Admin } = require("../models"); // Model Admin trong Sequelize

// SECRET_KEY dùng để ký JWT
const SECRET_KEY = process.env.JWT_SECRET;
// API Login cho Admin
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Tìm admin theo email
    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      return res
        .status(401)
        .json({ message: "Email hoặc mật khẩu không đúng!" });
    }

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Email hoặc mật khẩu không đúng!" });
    }

    // Tạo token JWT
    const token = jwt.sign({ id: admin.id, role: "admin" }, SECRET_KEY, {
      expiresIn: "7d",
    });

    return res.json({
      message: "Đăng nhập thành công!",
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
      token,
    });
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    return res.status(500).json({ message: "Lỗi máy chủ!" });
  }
};
