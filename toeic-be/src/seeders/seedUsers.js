const { sequelize } = require("../config/mysql");
const Role = require("../models/mysql/Role");
const User = require("../models/mysql/User");

const seedUsers = async () => {
  await sequelize.sync({ force: true }); // Xóa và tạo lại bảng

  // ✅ Seed Roles trước
  const roles = ["admin", "teacher", "student"];
  const roleInstances = {};
  for (let roleName of roles) {
    roleInstances[roleName] = await Role.findOrCreate({
      where: { name: roleName },
    });
  }

  // ✅ Seed Users
  const users = [
    {
      name: "Lê Trang",
      email: "lt25121999@gmail.com",
      phone: "0777478157",
      username: "trang99",
      password: "123456",
      roleId: roleInstances["admin"][0].id,
    },
    {
      name: "Lê Trang",
      email: "TrangTeacher@gmail.com",
      phone: "0987654321",
      username: "trang123",
      password: "123456",
      roleId: roleInstances["teacher"][0].id,
    },
    {
      name: "Lê Trang",
      email: "letrang@gmail.com",
      phone: "0912345678",
      username: "trang1234",
      password: "123456",
      roleId: roleInstances["student"][0].id,
    },
  ];

  for (let user of users) {
    await User.create(user);
    console.log(`✅ Created user: ${user.email}`);
  }

  process.exit();
};

seedUsers();
