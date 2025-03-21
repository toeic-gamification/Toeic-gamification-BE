const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Vocabulary = require("./Vocabulary"); // Import Vocabulary model

const Seed = sequelize.define(
  "Seed",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    growthStage: {
      type: DataTypes.ENUM("seeded", "sprout", "growing", "ready"),
      defaultValue: "seeded",
    },
    xpReward: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    coinReward: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  { timestamps: true }
);

Seed.belongsToMany(Vocabulary, { through: "SeedVocabulary" });
Vocabulary.belongsToMany(Seed, { through: "SeedVocabulary" });

module.exports = Seed;
