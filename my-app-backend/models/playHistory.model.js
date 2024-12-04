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
    playAt: {
      type: DataTypes.DATE,
    },
  },
  {
    // Other model options
    timestamps: false, // createdAt and updatedAt fields
    freezeTableName: true, // Prevent Sequelize from pluralizing the table name
  }
);

module.exports = PlayHistory;
