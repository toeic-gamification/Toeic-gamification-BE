"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Xóa cột username khỏi bảng users
    await queryInterface.removeColumn("users", "username");
  },

  async down(queryInterface, Sequelize) {
    // Phục hồi cột username vào bảng users nếu rollback
    await queryInterface.addColumn("users", "username", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },
};
