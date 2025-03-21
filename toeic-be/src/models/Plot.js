const Plot = sequelize.define("Plot", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: { type: DataTypes.UUID, allowNull: false },
  status: {
    type: DataTypes.ENUM("empty", "planted", "growing", "harvestable"),
    defaultValue: "empty",
  },
});

Plot.belongsTo(Seed, { foreignKey: "seedId" });
Plot.belongsTo(User, { foreignKey: "userId" });

module.exports = Plot;
