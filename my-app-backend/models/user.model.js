const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize");

// Define the User model
const User = sequelize.define(
  "users",
  {
    // Define model attributes
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "user"), // Example role field
      defaultValue: "user",
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    // Other model options
    timestamps: true, // createdAt and updatedAt fields
    freezeTableName: true, // Prevent Sequelize from pluralizing the table name
  }
);

module.exports = User;
