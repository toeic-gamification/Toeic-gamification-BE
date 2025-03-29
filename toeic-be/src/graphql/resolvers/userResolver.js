const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserSQL = require("../../models/mysql/User");
const Role = require("../../models/mysql/Role"); // Import Role
const UserProgress = require("../../models/mongo/UserProgress");
const GameProgress = require("../../models/mongo/GameProgress");
const GameLog = require("../../models/mongo/GameLog");
const { isValidEmail } = require("../../utils/validators");
const { OAuth2Client } = require("google-auth-library");
require("dotenv").config();

const userResolver = {
  Query: {
    getUsers: async () => {
      try {
        return await UserSQL.findAll();
      } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Failed to fetch users.");
      }
    },
    getUserProgress: async (_, { userId }) => {
      try {
        return await UserProgress.findOne({ userId });
      } catch (error) {
        console.error("Error fetching user progress:", error);
        throw new Error("Failed to fetch user progress.");
      }
    },
    getUserGameProgress: async (_, { userId }) => {
      try {
        return await GameProgress.findOne({ userId });
      } catch (error) {
        console.error("Error fetching game progress:", error);
        throw new Error("Failed to fetch game progress.");
      }
    },
  },
  Mutation: {
    register: async (_, { input }) => {
      try {
        const { name, email, password } = input;

        if (!name || !email || !password) {
          throw new Error("Vui lòng nhập đầy đủ thông tin.");
        }

        const existingUser = await UserSQL.findOne({ where: { email } });
        if (existingUser) {
          throw new Error("Email đã được sử dụng.");
        }

        // Kiểm tra role mặc định
        const roleUser = await Role.findOne({ where: { name: "student" } });
        if (!roleUser) {
          throw new Error("Role mặc định không tồn tại.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await UserSQL.create({
          name,
          username: email, // Gán email làm username
          email,
          password: hashedPassword,
          roleId: roleUser.id,
        });

        // Khởi tạo tiến trình học trong MongoDB
        await UserProgress.create({
          userId: user.id,
          completedLessons: 0,
          score: 0,
          lastUpdated: new Date(),
        });

        // Tạo token JWT
        const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });

        return { status: true, msg: "Đăng ký thành công!", token, user };
      } catch (error) {
        console.error("Register Error:", error);
        return { status: false, msg: error.message || "Đăng ký thất bại!" };
      }
    },
    login: async (_, { email, password }) => {
      try {
        console.log("Đang xử lý đăng nhập với email:", email);

        // Tìm người dùng trong MySQL
        const user = await UserSQL.findOne({ where: { email } });

        if (!user) {
          console.log("Không tìm thấy email!");
          return {
            status: false,
            msg: "Email không tồn tại!",
            token: null,
            user: null,
          };
        }

        // Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          console.log(" Mật khẩu không chính xác!");
          return {
            status: false,
            msg: "Mật khẩu không đúng!",
            token: null,
            user: null,
          };
        }

        // Tạo JWT token
        const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });

        console.log("Đăng nhập thành công!");

        return { status: true, msg: "Đăng nhập thành công!", token, user };
      } catch (error) {
        console.error("🚨 Lỗi đăng nhập:", error);
        return {
          status: false,
          msg: "Đăng nhập thất bại!",
          token: null,
          user: null,
        };
      }
    },
    updateUserProgress: async (_, { userId, completedLessons, score }) => {
      try {
        const updatedProgress = await UserProgress.findOneAndUpdate(
          { userId },
          { completedLessons, score, lastUpdated: new Date() },
          { new: true }
        );

        if (!updatedProgress) {
          throw new Error("Không tìm thấy tiến trình học của người dùng.");
        }

        return updatedProgress;
      } catch (error) {
        console.error("Update Learning Progress Error:", error);
        throw new Error("Cập nhật tiến trình học thất bại.");
      }
    },

    updateGameProgress: async (_, { userId, game, level, exp, coins }) => {
      try {
        const updatedProgress = await GameProgress.findOneAndUpdate(
          { userId, game },
          { level, exp, coins, lastUpdated: new Date() },
          { new: true, upsert: true }
        );

        if (!updatedProgress) {
          throw new Error("Không tìm thấy tiến trình game của người dùng.");
        }

        // Lưu log vào MongoDB
        await GameLog.create({
          userId,
          action: `Cập nhật tiến trình game: ${game}`,
        });

        return updatedProgress;
      } catch (error) {
        console.error("Update Game Progress Error:", error);
        throw new Error("Cập nhật tiến trình game thất bại.");
      }
    },
  },
};

module.exports = userResolver;
