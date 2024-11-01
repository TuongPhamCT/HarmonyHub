const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize");

// Define the User model
const User = sequelize.define(
  "musics",
  {
    // Define model attributes
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    fileURL: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lyric: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    genre_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users', // Table name in the database
            key: 'id',      // Field in the Users table
        },
        onDelete: 'CASCADE'
    },
    play_count: {
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

module.exports = Music;