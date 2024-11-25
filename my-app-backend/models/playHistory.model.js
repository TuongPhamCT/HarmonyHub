const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize");

// Define the
const PlayHistory = sequelize.define(
  "play_history",
  {
    // Define model attributes
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    songId: {
      type: DataTypes.INTEGER,
    },
    playTime: {
      type: DataTypes.INTEGER,
    },
    playAt: {
      type: DataTypes.DATE,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    // Other model options
    timestamps: false, // createdAt and updatedAt fields
    freezeTableName: true, // Prevent Sequelize from pluralizing the table name
  }
);

module.exports = PlayHistory;
