module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define("Image", {
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  return Image;
};
