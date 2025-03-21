const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const bcrypt = require("bcrypt");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
    set(value) {
      this.setDataValue("email", value.toLowerCase().trim()); // Chuyển email về chữ thường
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isStrongPassword(value) {
        if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            value
          )
        ) {
          throw new Error(
            "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt!"
          );
        }
      },
    },
  },
  phone: {
    type: DataTypes.STRING,
    validate: {
      isNumeric: true, // Chỉ cho phép số
      len: [10, 15], // Độ dài từ 10 - 15 số
    },
  },
  avatar: DataTypes.STRING,
  xp: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  level: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  coins: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  clanId: {
    type: DataTypes.UUID, // Đảm bảo `clanId` khớp với `UUID` trong model `Clan`
    references: {
      model: "Clans",
      key: "id",
    },
  },
  address: DataTypes.STRING,
  role: {
    type: DataTypes.ENUM("admin", "teacher", "student"),
    defaultValue: "student",
  },
});

// Hash mật khẩu trước khi tạo mới user
User.beforeCreate(async (user) => {
  if (user.role !== "admin") {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

// Hash mật khẩu nếu được cập nhật
User.beforeUpdate(async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

module.exports = User;
