const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize");

// Define the User model
const Genre = sequelize.define(
  "genre",
  {
    // Define model attributes
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    // Other model options
    timestamps: false, // createdAt and updatedAt fields
    freezeTableName: true, // Prevent Sequelize from pluralizing the table name
  }
);

module.exports = Genre;
