const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize");

// Define the User model
const Song = sequelize.define(
  "song",
  {
    // Define model attributes
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    duration: {
      type: DataTypes.INTEGER,
    },
    image: {
      type: DataTypes.STRING,
    },
    fileURL: {
      type: DataTypes.STRING,
    },
    lyric: {
      type: DataTypes.STRING,
    },
    playCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    // Other model options
    timestamps: true, // createdAt and updatedAt fields
    freezeTableName: true, // Prevent Sequelize from pluralizing the table name
  }
);

module.exports = Song;
