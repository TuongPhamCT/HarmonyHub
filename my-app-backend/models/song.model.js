const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize");

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
    artist: {
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
    isAccepted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
