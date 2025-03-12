const app = require("./app");
const { sequelize } = require("./models");

const PORT = process.env.PORT || 5000;

sequelize.authenticate().then(() => {
  console.log("MySQL Database connected");
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
