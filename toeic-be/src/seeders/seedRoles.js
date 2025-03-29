const { sequelize } = require("../config/mysql");
const Role = require("../models/mysql/Role");

const seedRoles = async () => {
  await sequelize.sync(); // Đảm bảo bảng tồn tại

  const roles = ["admin", "teacher", "student"];

  for (let roleName of roles) {
    const [role, created] = await Role.findOrCreate({
      where: { name: roleName },
    });
    if (created) console.log(`Created role: ${roleName}`);
  }

  process.exit();
};

seedRoles();
