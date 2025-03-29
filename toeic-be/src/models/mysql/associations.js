//Khai báo quan hệ giữa các bảng MySQL
const { User } = require("./User");
const { Role } = require("./Role");
const { CoinTransaction } = require("./CoinTransaction");
const { ExpHistory } = require("./ExpHistory");

User.belongsTo(Role, { foreignKey: "roleId" });
User.hasMany(CoinTransaction, { foreignKey: "userId" });
User.hasMany(ExpHistory, { foreignKey: "userId" });

module.exports = { User, Role, CoinTransaction, ExpHistory };
