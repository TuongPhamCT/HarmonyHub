// sync.js
const sequelize = require("./configs/sequelize");
require("./models/association");

// Test DB connection and sync models
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    return sequelize.sync({ alter: false }); // force: true will drop the table if it already exists (use cautiously)
  })
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((err) => {
    console.error("Unable to connect to the database or sync tables:", err);
  });
