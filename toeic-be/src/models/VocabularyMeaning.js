const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Vocabulary = require("./Vocabulary");

const VocabularyMeaning = sequelize.define("VocabularyMeaning", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  meaning: { type: DataTypes.STRING, allowNull: false },
  example: { type: DataTypes.TEXT }, 
});

Vocabulary.hasMany(VocabularyMeaning, { foreignKey: "vocabularyId", onDelete: "CASCADE" });
VocabularyMeaning.belongsTo(Vocabulary, { foreignKey: "vocabularyId" });

module.exports = VocabularyMeaning;
