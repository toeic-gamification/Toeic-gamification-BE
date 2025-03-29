const { sequelize, connectMySQL } = require("../config/mysql");
const connectMongoDB = require("../config/mongo");
const Role = require("../models/mysql/Role");
const User = require("../models/mysql/User");
const Vocabulary = require("../models/mongo/Vocabulary");
const bcrypt = require("bcrypt");

const seedRoles = async () => {
  const roles = ["admin", "teacher", "student"];
  for (const roleName of roles) {
    await Role.findOrCreate({ where: { name: roleName } });
  }
  console.log("Seeded Roles successfully!");
};

const seedUsers = async () => {
  const adminRole = await Role.findOne({ where: { name: "admin" } });
  if (!adminRole) {
    console.error("No admin role found!");
    return;
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);
  await User.findOrCreate({
    where: { email: "admin@example.com" },
    defaults: {
      name: "Admin User",
      username: "admin",
      password: hashedPassword,
      roleId: adminRole.id,
    },
  });

  console.log("Seeded Users successfully!");
};

const seedVocabulary = async () => {
  const words = [
    { word: "apple", meaning: "Quả táo", category: "fruit" },
    { word: "car", meaning: "Xe hơi", category: "transport" },
    { word: "house", meaning: "Ngôi nhà", category: "building" },
  ];

  for (const word of words) {
    await Vocabulary.findOneAndUpdate({ word: word.word }, word, {
      upsert: true,
      new: true,
    });
  }

  console.log("Seeded Vocabulary successfully!");
};

const runSeed = async () => {
  await connectMySQL();
  await connectMongoDB();
  await seedRoles();
  await seedUsers();
  await seedVocabulary();
  console.log("🎉 Database seeding completed!");
  process.exit();
};

runSeed().catch((err) => {
  console.error("Seeding error:", err);
  process.exit(1);
});
