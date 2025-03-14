const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Badge = sequelize.define("Badge", {
  id: { 
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true 
  },
  name: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    unique: true,
    set(value) {
      this.setDataValue("name", value.trim()); 
    }
  },
  description: { 
    type: DataTypes.TEXT, 
    allowNull: false 
  },
  icon: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    defaultValue: "default_badge.png"
  },
  level: { 
    type: DataTypes.ENUM("Bronze", "Silver", "Gold"), 
    allowNull: false, 
    defaultValue: "Bronze" 
  },
  xp_reward: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    defaultValue: 0 
  }
}, { 
  timestamps: true 
});

module.exports = Badge;
