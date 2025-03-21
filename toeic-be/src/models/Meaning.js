const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Vocabulary = require("./Vocabulary"); // Import Vocabulary model

const Meaning = sequelize.define("Meaning", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  definition: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true, // Không cho phép nghĩa rỗng
    },
  },
  example: {
    type: DataTypes.TEXT,
    validate: {
      len: [0, 500], // Giới hạn tối đa 500 ký tự
    },
  },
});

// Thiết lập quan hệ 1 - N (Một từ có nhiều nghĩa)
Vocabulary.hasMany(Meaning, {
  foreignKey: "vocabularyId",
  onDelete: "CASCADE",
});
Meaning.belongsTo(Vocabulary, { foreignKey: "vocabularyId" });

module.exports = Meaning;
